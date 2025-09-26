import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    const { name, email, message }: ContactFormData = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Email credentials not configured');
      return res.status(500).json({
        success: false,
        message: 'Email service not configured. Please contact us directly at mtvrentals845@gmail.com'
      });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'mtvrentals845@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
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
      `,
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
        
        ---
        This message was sent from the MTV Tech Solutions contact form.
        Reply directly to: ${email}
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Send confirmation email to the user
    const confirmationMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting MTV Tech Solutions',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h2 style="color: #16a34a; margin-bottom: 10px;">MTV Tech Solutions</h2>
              <p style="color: #666; margin: 0;">AI-Powered Technology Solutions</p>
            </div>
            
            <h3 style="color: #333; margin-bottom: 20px;">Thank you for contacting us!</h3>
            
            <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">
              Hi ${name},
            </p>
            
            <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">
              Thank you for reaching out to MTV Tech Solutions. We have received your message and will get back to you within 2-4 hours during business hours.
            </p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; border-left: 4px solid #16a34a; margin-bottom: 20px;">
              <h4 style="color: #333; margin-bottom: 10px;">Your Message:</h4>
              <p style="color: #666; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
            
            <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">
              In the meantime, feel free to explore our services:
            </p>
            
            <ul style="color: #333; line-height: 1.6; margin-bottom: 30px;">
              <li>Computer Repair & Hardware Diagnostics</li>
              <li>24/7 Technical Support</li>
              <li>Cybersecurity & Threat Protection</li>
              <li>Web Design & Development</li>
            </ul>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #666; font-size: 14px; margin: 0;">
                Best regards,<br>
                The MTV Tech Solutions Team
              </p>
              <p style="color: #666; font-size: 14px; margin: 10px 0 0 0;">
                Email: mtvrentals845@gmail.com<br>
                Available 24/7 for emergency support
              </p>
            </div>
          </div>
        </div>
      `,
      text: `
        MTV Tech Solutions - AI-Powered Technology Solutions
        
        Thank you for contacting us!
        
        Hi ${name},
        
        Thank you for reaching out to MTV Tech Solutions. We have received your message and will get back to you within 2-4 hours during business hours.
        
        Your Message:
        ${message}
        
        In the meantime, feel free to explore our services:
        - Computer Repair & Hardware Diagnostics
        - 24/7 Technical Support
        - Cybersecurity & Threat Protection
        - Web Design & Development
        
        Best regards,
        The MTV Tech Solutions Team
        
        Email: mtvrentals845@gmail.com
        Available 24/7 for emergency support
      `
    };

    // Send confirmation email
    await transporter.sendMail(confirmationMailOptions);

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully'
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again or contact us directly at mtvrentals845@gmail.com'
    });
  }
}
