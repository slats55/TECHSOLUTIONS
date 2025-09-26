import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-08-27.basil',
});

interface LineItem {
  price_data: {
    currency: string;
    product_data: {
      name: string;
      description?: string;
    };
    unit_amount: number;
  };
  quantity: number;
}

interface CheckoutRequest {
  lineItems: LineItem[];
  customerEmail?: string;
  metadata?: Record<string, string>;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check if Stripe is configured
  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ 
      error: 'Stripe not configured. Please contact support.' 
    });
  }

  try {
    const { lineItems, customerEmail, metadata }: CheckoutRequest = req.body;

    // Validate required fields
    if (!lineItems || !Array.isArray(lineItems) || lineItems.length === 0) {
      return res.status(400).json({ 
        error: 'Invalid line items provided' 
      });
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      customer_email: customerEmail,
      metadata: {
        ...metadata,
        source: 'MTV Tech Solutions Website',
      },
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cancel`,
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
      phone_number_collection: {
        enabled: true,
      },
      custom_text: {
        submit: {
          message: 'Thank you for choosing MTV Tech Solutions!',
        },
      },
    });

    return res.status(200).json({ 
      url: session.url,
      sessionId: session.id 
    });

  } catch (err: any) {
    console.error('Stripe checkout error:', err);
    return res.status(500).json({ 
      error: 'Unable to create checkout session. Please try again.' 
    });
  }
}
