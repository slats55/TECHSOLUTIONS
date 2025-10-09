import { buffer } from 'micro';
import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method not allowed');
  }

  // If Stripe is not configured, return 200 no-op
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    console.log('Stripe webhook received but not configured - returning 200');
    return res.status(200).json({ received: true, configured: false });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-08-27.basil',
  });

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'] as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf.toString(),
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('✅ Payment successful:', {
          sessionId: session.id,
          customerEmail: session.customer_email,
          amountTotal: session.amount_total,
          currency: session.currency,
          metadata: session.metadata,
        });

        // Business logic implementation:
        // - Send confirmation email to customer
        // - Create order in database
        // - Update inventory
        // - Trigger fulfillment process
        // Note: Implement these based on your business requirements
        
        break;
      }

      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('⏰ Checkout session expired:', session.id);
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('💰 Payment intent succeeded:', {
          id: paymentIntent.id,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
        });
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.error('❌ Payment failed:', {
          id: paymentIntent.id,
          lastPaymentError: paymentIntent.last_payment_error,
        });
        
        // Handle failed payment:
        // - Send notification to customer
        // - Log for manual review
        // - Update order status
        // Note: Implement these based on your business requirements
        
        break;
      }

      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log('📄 Invoice paid:', {
          id: invoice.id,
          customerEmail: invoice.customer_email,
          amountPaid: invoice.amount_paid,
        });
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log(`🔄 Subscription ${event.type}:`, {
          id: subscription.id,
          customerId: subscription.customer,
          status: subscription.status,
        });
        break;
      }

      default:
        console.log(`🔔 Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (err: any) {
    console.error('Error processing webhook:', err);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
}
