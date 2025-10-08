import { z } from 'zod';
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

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

async function sendEmailWithResend(name: string, email: string, message: string): Promise<void> {
  // Dynamic import to avoid issues if resend is not installed
  const { Resend } = await import('resend');
  const resend = new Resend(process.env.RESEND_API_KEY!);
  
  const fromEmail = process.env.RESEND_FROM || 'noreply@your-domain.com';
  const toEmail = process.env.CONTACT_TO || 'mtvrentals845@gmail.com';

  await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    subject: `New Contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
        <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #16a34a; margin-bottom: 20px; text-align: center;">New Contact Form Submission</h2>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #333; margin-bottom: 10px;">Contact Details:</h3>
            <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #333; margin-bottom: 10px;">Message:</h3>
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #16a34a;">
              <p style="margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
            <p style="color: #666; font-size: 14px; margin: 0;">
              This message was sent from the MTV Tech Solutions contact form.
            </p>
            <p style="color: #666; font-size: 14px; margin: 5px 0 0 0;">
              Reply directly to: ${email}
            </p>
          </div>
        </div>
      </div>
    `
  });
}

async function sendEmailWithGmail(name: string, email: string, message: string): Promise<void> {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASS!,
    },
  });

  const toEmail = process.env.CONTACT_TO || 'mtvrentals845@gmail.com';

  await transporter.sendMail({
    from: `"MTV Tech Solutions" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: `New Contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
        <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #16a34a; margin-bottom: 20px; text-align: center;">New Contact Form Submission</h2>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #333; margin-bottom: 10px;">Contact Details:</h3>
            <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #333; margin-bottom: 10px;">Message:</h3>
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #16a34a;">
              <p style="margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
            <p style="color: #666; font-size: 14px; margin: 0;">
              This message was sent from the MTV Tech Solutions contact form.
            </p>
            <p style="color: #666; font-size: 14px; margin: 5px 0 0 0;">
              Reply directly to: ${email}
            </p>
          </div>
        </div>
      </div>
    `
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  // Only allow POST requests
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
      console.error(JSON.stringify({ 
        scope: 'contact.rateLimit', 
        ip: clientIP, 
        timestamp: new Date().toISOString() 
      }, null, 2));
      
      return res.status(429).json({
        ok: false,
        error: 'Too many requests. Please wait before sending another message.'
      });
    }

    // Validate request body with Zod
    const validationResult = BodySchema.safeParse(req.body);
    if (!validationResult.success) {
      const errors = validationResult.error?.issues?.map(err => err.message).join(', ') || 'Invalid input';
      
      console.error(JSON.stringify({ 
        scope: 'contact.validation', 
        errors: validationResult.error?.issues || [],
        body: req.body,
        timestamp: new Date().toISOString() 
      }, null, 2));
      
      return res.status(400).json({
        ok: false,
        error: `Please check your input: ${errors}`
      });
    }

    const { name, email, message } = validationResult.data;

    // Determine and use email transport
    try {
      if (process.env.RESEND_API_KEY) {
        // Use Resend as primary transport
        await sendEmailWithResend(name, email, message);
        
        if (process.env.NODE_ENV === 'development') {
          console.log(JSON.stringify({ 
            scope: 'contact.success', 
            transport: 'resend',
            from: email,
            timestamp: new Date().toISOString() 
          }, null, 2));
        }
        
      } else if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        // Use Gmail SMTP as fallback
        await sendEmailWithGmail(name, email, message);
        
        if (process.env.NODE_ENV === 'development') {
          console.log(JSON.stringify({ 
            scope: 'contact.success', 
            transport: 'gmail',
            from: email,
            timestamp: new Date().toISOString() 
          }, null, 2));
        }
        
      } else {
        // No email transport configured
        console.error(JSON.stringify({ 
          scope: 'contact.config', 
          error: 'No email transport configured',
          timestamp: new Date().toISOString() 
        }, null, 2));
        
        return res.status(500).json({
          ok: false,
          error: 'Email service is not configured. Please contact us directly at mtvrentals845@gmail.com'
        });
      }

      return res.status(200).json({
        ok: true,
        message: 'Message sent successfully! We will get back to you soon.'
      });

    } catch (transportError) {
      console.error(JSON.stringify({ 
        scope: 'contact.send', 
        err: (transportError as Error).message,
        timestamp: new Date().toISOString() 
      }, null, 2));
      
      return res.status(500).json({
        ok: false,
        error: 'Failed to send message. Please try again or contact us directly at mtvrentals845@gmail.com'
      });
    }

  } catch (error) {
    console.error(JSON.stringify({ 
      scope: 'contact.general', 
      err: (error as Error).message,
      timestamp: new Date().toISOString() 
    }, null, 2));
    
    return res.status(500).json({
      ok: false,
      error: 'An unexpected error occurred. Please try again later.'
    });
  }
}