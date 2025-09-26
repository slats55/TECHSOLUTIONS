# Stripe Checkout Example

A complete, working example of Stripe Checkout integration with Node.js + Express backend.

## Features

- ✅ Stripe Checkout (hosted page) for secure payments
- ✅ Express.js backend with webhook handling
- ✅ Static frontend served from `/public`
- ✅ Environment variable configuration
- ✅ Webhook signature verification
- ✅ Test mode ready

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your Stripe keys from the [Stripe Dashboard](https://dashboard.stripe.com):
   - `STRIPE_SECRET_KEY`: Your secret key (starts with `sk_test_` for test mode)
   - `STRIPE_PUBLISHABLE_KEY`: Your publishable key (starts with `pk_test_` for test mode)
   - `STRIPE_WEBHOOK_SECRET`: Webhook endpoint secret (starts with `whsec_`)
   - `YOUR_DOMAIN`: Your domain (use `http://localhost:3000` for local development)

3. **Run the server:**
   ```bash
   npm run dev
   ```

4. **Visit the app:**
   Open `http://localhost:3000` in your browser

## Testing Webhooks Locally

### Option 1: Using ngrok (Recommended)

1. **Install ngrok:**
   ```bash
   # Download from https://ngrok.com/download
   # Or install via package manager
   ```

2. **Start ngrok:**
   ```bash
   ngrok http 3000
   ```

3. **Configure webhook in Stripe Dashboard:**
   - Go to [Stripe Dashboard > Webhooks](https://dashboard.stripe.com/webhooks)
   - Click "Add endpoint"
   - URL: `https://your-ngrok-id.ngrok.io/webhook`
   - Select events: `checkout.session.completed`
   - Copy the webhook signing secret to your `.env` file

### Option 2: Using Stripe CLI

1. **Install Stripe CLI:**
   ```bash
   # Download from https://stripe.com/docs/stripe-cli
   ```

2. **Login and forward webhooks:**
   ```bash
   stripe login
   stripe listen --forward-to localhost:3000/webhook
   ```

3. **Copy the webhook secret** from the CLI output to your `.env` file

## Testing Payments

### Test Cards

Use these test card numbers in **test mode only**:

- **Success:** `4242 4242 4242 4242`
- **Decline:** `4000 0000 0000 0002`
- **Requires authentication:** `4000 0025 0000 3155`

Use any future expiration date (e.g., `12/34`) and any 3-digit CVC.

### Test the API

**Create a checkout session:**
```bash
curl -X POST http://localhost:3000/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "name": "T-shirt",
        "unit_amount": 2000,
        "quantity": 1
      }
    ]
  }'
```

**JavaScript example:**
```javascript
const response = await fetch('/create-checkout-session', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    items: [{ name: 'T-shirt', unit_amount: 2000, quantity: 1 }]
  })
});
const session = await response.json();
```

## Project Structure

```
├── package.json          # Dependencies and scripts
├── server.js             # Express server with Stripe integration
├── .env.example          # Environment variables template
├── .env                  # Your actual environment variables (create this)
├── public/
│   ├── index.html        # Product page with checkout button
│   ├── checkout.js       # Frontend checkout logic
│   ├── success.html      # Payment success page
│   └── cancel.html       # Payment cancellation page
└── README.md             # This file
```

## API Endpoints

### POST `/create-checkout-session`

Creates a Stripe Checkout Session.

**Request body:**
```json
{
  "items": [
    {
      "name": "Product Name",
      "unit_amount": 2000,
      "quantity": 1
    }
  ]
}
```

**Response:**
```json
{
  "id": "cs_test_...",
  "url": "https://checkout.stripe.com/..."
}
```

### POST `/webhook`

Handles Stripe webhooks with signature verification.

**Headers:**
- `stripe-signature`: Stripe webhook signature

**Body:** Raw webhook payload (application/json)

## Security Notes

- ✅ **Use HTTPS in production** - Stripe requires HTTPS for live payments
- ✅ **Store keys in environment variables** - Never commit secrets to version control
- ✅ **Verify webhook signatures** - Always verify webhook authenticity
- ✅ **Don't log secret keys** - Keep sensitive data out of logs
- ✅ **Use test mode for development** - Test with `sk_test_` and `pk_test_` keys

## Production Deployment

1. **Set up HTTPS** (required for live payments)
2. **Use live Stripe keys** (`sk_live_` and `pk_live_`)
3. **Configure production webhook URL** in Stripe Dashboard
4. **Set environment variables** on your hosting platform
5. **Test thoroughly** with small amounts first

## Troubleshooting

**"Webhook signature verification failed"**
- Check that `STRIPE_WEBHOOK_SECRET` matches your webhook endpoint secret
- Ensure webhook URL is correct and accessible

**"Invalid API key"**
- Verify your Stripe keys are correct
- Make sure you're using test keys in test mode

**"Payment method not supported"**
- Check that `payment_method_types: ['card']` is set
- Verify your Stripe account supports the payment method

## Next Steps

- **Add database persistence** for orders (see TODO comments in `server.js`)
- **Implement user authentication** for order history
- **Add email receipts** using Stripe's receipt emails or your own service
- **Handle more webhook events** like `payment_intent.succeeded`
- **Add inventory management** and stock checking
- **Implement subscription payments** using Stripe Subscriptions

## Resources

- [Stripe Checkout Documentation](https://stripe.com/docs/checkout)
- [Stripe Webhooks Guide](https://stripe.com/docs/webhooks)
- [Stripe Test Cards](https://stripe.com/docs/testing)
- [Stripe CLI Documentation](https://stripe.com/docs/stripe-cli)

