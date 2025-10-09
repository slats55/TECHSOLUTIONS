import type { NextApiRequest, NextApiResponse } from 'next';

interface HealthResponse {
  ok: boolean;
  env: string | undefined;
  emailTransport: 'RESEND' | 'GMAIL' | 'NONE';
  hasEnvs: {
    RESEND_API_KEY: boolean;
    RESEND_FROM: boolean;
    EMAIL_USER: boolean;
    EMAIL_PASS: boolean;
    CONTACT_TO: boolean;
  };
  contactTo: string;
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
        RESEND_FROM: false,
        EMAIL_USER: false,
        EMAIL_PASS: false,
        CONTACT_TO: false,
      },
      contactTo: 'support@mtvtechsolutions.net'
    });
  }

  const {
    RESEND_API_KEY,
    RESEND_FROM,
    EMAIL_USER,
    EMAIL_PASS,
    CONTACT_TO
  } = process.env;

  // Determine email transport based on available environment variables
  let emailTransport: 'RESEND' | 'GMAIL' | 'NONE' = 'NONE';
  
  if (RESEND_API_KEY) {
    emailTransport = 'RESEND';
  } else if (EMAIL_USER && EMAIL_PASS) {
    emailTransport = 'GMAIL';
  }

  return res.status(200).json({
    ok: true,
    env: process.env.NODE_ENV,
    emailTransport,
    hasEnvs: {
      RESEND_API_KEY: Boolean(RESEND_API_KEY),
      RESEND_FROM: Boolean(RESEND_FROM),
      EMAIL_USER: Boolean(EMAIL_USER),
      EMAIL_PASS: Boolean(EMAIL_PASS),
      CONTACT_TO: Boolean(CONTACT_TO),
    },
    contactTo: CONTACT_TO || "support@mtvtechsolutions.net",
  });
}