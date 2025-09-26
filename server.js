/*
  server.js
  - POST /create-checkout-session  -> creates Checkout Session
  - POST /webhook                  -> receives and verifies webhooks (raw body)
*/
require('dotenv').config();
const express = require('express');
const app = express();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const PORT = process.env.PORT || 3000;
const YOUR_DOMAIN = process.env.YOUR_DOMAIN || `http://localhost:${PORT}`;

// Serve static files from public
app.use(express.static('public'));

// Serve checkout.js with injected publishable key
app.get('/checkout.js', (req, res) => {
  const fs = require('fs');
  const path = require('path');
  const checkoutJsPath = path.join(__dirname, 'public', 'checkout.js');
  let checkoutJs = fs.readFileSync(checkoutJsPath, 'utf8');
  
  // Replace the placeholder with the actual publishable key
  checkoutJs = checkoutJs.replace('<%= STRIPE_PUBLISHABLE_KEY_PLACEHOLDER %>', process.env.STRIPE_PUBLISHABLE_KEY);
  
  res.setHeader('Content-Type', 'application/javascript');
  res.send(checkoutJs);
});

// Create Checkout Session (use express.json() for this route only)
app.post('/create-checkout-session', express.json(), async (req, res) => {
  const { items = [] } = req.body; // array of { name, unit_amount (in cents), quantity }
  try {
    const line_items = items.map(i => ({
      price_data: {
        currency: 'usd',
        product_data: { name: i.name },
        unit_amount: i.unit_amount
      },
      quantity: i.quantity
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      success_url: `${YOUR_DOMAIN}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${YOUR_DOMAIN}/cancel.html`
    });

    res.json({ id: session.id, url: session.url });
  } catch (err) {
    console.error('Error creating checkout session:', err);
    res.status(500).json({ error: err.message });
  }
});

/*
  Webhook endpoint must use raw body so Stripe signature verification works.
  We explicitly use express.raw() only for this route.
*/
app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      // TODO: Fulfill the purchase: save to DB, send email/receipt, etc.
      console.log(`Payment succeeded for session ${session.id}`);
      break;
    // ... handle other event types as needed
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Domain: ${YOUR_DOMAIN}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
