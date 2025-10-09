import { z } from "zod";
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { Resend } from "resend";

// Zod schema for request validation
const BodySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Invalid email format'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000, 'Message must be less than 5000 characters'),
});

interface ApiResponse {
  ok: boolean;
  message?: string;
  error?: string;
  code?: string;
}

// Simple in-memory rate limiter for serverless environments
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const clientData = rateLimitMap.get(ip);

  if (!clientData) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (now > clientData.resetTime) {
    // Reset the window
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (clientData.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  clientData.count++;
  return true;
}

function getClientIP(req: NextApiRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  const ip = forwarded ? (Array.isArray(forwarded) ? forwarded[0] : forwarded.split(',')[0]) : req.connection.remoteAddress;
  return ip || 'unknown';
}

// Structured logging helper
function logError(scope: string, error: any, additionalData?: any) {
  console.log(JSON.stringify({
    scope,
    error: error.message || error,
    timestamp: new Date().toISOString(),
    ...additionalData
  }));
}

// Send email via Resend
async function sendEmailWithResend(name: string, email: string, message: string): Promise<void> {
  const resend = new Resend(process.env.RESEND_API_KEY!);
  
  await resend.emails.send({
    from: process.env.RESEND_FROM || "noreply@mtvtechsolutions.net",
    to: process.env.CONTACT_TO || "support@mtvtechsolutions.net",
    subject: `New Contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });
}

// Send email via Gmail SMTP
async function sendEmailWithGmail(name: string, email: string, message: string): Promise<void> {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"MTV Tech Solutions" <${process.env.EMAIL_USER}>`,
    to: process.env.CONTACT_TO || "support@mtvtechsolutions.net",
    subject: `New Contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      ok: false,
      error: 'Method not allowed. Only POST requests are accepted.'
    });
  }

  try {
    // Rate limiting
    const clientIP = getClientIP(req);
    if (!checkRateLimit(clientIP)) {
      logError('contact.ratelimit', { message: 'Rate limit exceeded' }, { clientIP });
      return res.status(429).json({
        ok: false,
        error: 'Too many requests. Please wait before sending another message.'
      });
    }

    // Validate request body with Zod
    const validationResult = BodySchema.safeParse(req.body);
    if (!validationResult.success) {
      const errors = validationResult.error.issues.map(err => err.message).join(', ');
      logError('contact.validation', { message: 'Validation failed' }, { 
        errors: validationResult.error.issues,
        body: req.body 
      });
      return res.status(400).json({
        ok: false,
        error: `Please check your input: ${errors}`
      });
    }

    const { name, email, message } = validationResult.data;

    // Determine and use email transport
    try {
      if (process.env.RESEND_API_KEY) {
        await sendEmailWithResend(name, email, message);
        logError('contact.send', { message: 'Email sent via Resend' }, { 
          transport: 'resend',
          to: process.env.CONTACT_TO || "support@mtvtechsolutions.net"
        });
      } else if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        await sendEmailWithGmail(name, email, message);
        logError('contact.send', { message: 'Email sent via Gmail' }, { 
          transport: 'gmail',
          to: process.env.CONTACT_TO || "support@mtvtechsolutions.net"
        });
      } else {
        logError('contact.config', { message: 'No email transport configured' });
        return res.status(500).json({
          ok: false,
          error: 'Email service is being configured. You can reach us at support@mtvtechsolutions.net.',
          code: 'EMAIL_NOT_CONFIGURED'
        });
      }

      return res.status(200).json({
        ok: true,
        message: 'Thank you! Your message has been sent successfully.'
      });

    } catch (transportError) {
      logError('contact.send', transportError, { 
        transport: process.env.RESEND_API_KEY ? 'resend' : 'gmail'
      });
      return res.status(500).json({
        ok: false,
        error: 'Failed to send message. Please try again or contact us directly at support@mtvtechsolutions.net.'
      });
    }

  } catch (error) {
    logError('contact.general', error);
    return res.status(500).json({
      ok: false,
      error: 'An unexpected error occurred. Please try again later.'
    });
  }
}