import type { NextApiRequest, NextApiResponse } from 'next';

interface HealthResponse {
  ok: boolean;
  env: string | undefined;
  emailTransport: 'RESEND' | 'GMAIL' | 'NONE';
  hasEnvs: {
    RESEND_API_KEY: boolean;
    EMAIL_USER: boolean;
    EMAIL_PASS: boolean;
  };
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<HealthResponse>
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({
      ok: false,
      env: process.env.NODE_ENV,
      emailTransport: 'NONE',
      hasEnvs: {
        RESEND_API_KEY: false,
        EMAIL_USER: false,
        EMAIL_PASS: false,
      }
    });
  }

  // Determine email transport based on available environment variables
  let emailTransport: 'RESEND' | 'GMAIL' | 'NONE' = 'NONE';
  
  if (process.env.RESEND_API_KEY) {
    emailTransport = 'RESEND';
  } else if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    emailTransport = 'GMAIL';
  }

  return res.status(200).json({
    ok: true,
    env: process.env.NODE_ENV,
    emailTransport,
    hasEnvs: {
      RESEND_API_KEY: Boolean(process.env.RESEND_API_KEY),
      EMAIL_USER: Boolean(process.env.EMAIL_USER),
      EMAIL_PASS: Boolean(process.env.EMAIL_PASS),
    }
  });
}
