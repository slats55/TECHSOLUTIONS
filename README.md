# MTV Tech Solutions

A modern, production-ready Next.js website for MTV Tech Solutions - your trusted partner for AI-powered technology solutions.

## 🚀 Services

- **Computer Repair** - Expert hardware diagnostics and repairs
- **Tech Support** - 24/7 technical support for businesses and individuals
- **Cybersecurity** - Advanced threat protection and security audits
- **Web Design** - Modern, responsive web design and development

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom dark theme
- **Email**: Nodemailer for contact form functionality
- **Deployment**: Vercel/Netlify ready
- **Code Quality**: ESLint + Prettier

## 🎨 Design Features

- **Dark Theme**: Modern black/grey background with neon green/blue accents
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Animations**: Smooth transitions and hover effects
- **Accessibility**: WCAG compliant with semantic HTML
- **Performance**: Optimized for speed and SEO

## 🚀 Run Locally

⚠️ **IMPORTANT**: This project requires a development server. Do NOT open `index.html` directly in your browser via `file://` protocol.

### Prerequisites

- Node.js 18+ 
- npm 8+

### Quick Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Open in browser**
   - Navigate to: http://localhost:3000 (NOT file://)
   - Verify API health: http://localhost:3000/api/health

4. **Test contact form**
   - Submit the contact form (will show "Email service is being configured" if no email transport is set up)
   - This is expected behavior for localhost without email credentials

5. **Test Stripe webhook (optional)**
   - If you have Stripe test keys, run: `stripe listen --forward-to localhost:3000/api/webhook`
   - The webhook endpoint will return 200 even without Stripe configuration

6. **Run smoke tests**
   ```bash
   npm run test:curl
   ```

### Environment Setup (Optional)

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` and configure your email transport (see Email Setup section below).

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### ⚠️ File Protocol Warning

If you see a blank page or errors:
- ❌ **Don't use**: `file:///path/to/index.html`
- ✅ **Use instead**: `http://localhost:3000` (after running `npm run dev`)

This is a Next.js application that requires a server to function properly.

## 📧 Contact Email Setup

**Recipient**: support@mtvtechsolutions.net

### Primary Transport: Resend

1. **Create Resend Account**: [https://resend.com](https://resend.com)
2. **Verify Domain**: Add and verify `mtvtechsolutions.net` domain
3. **Get API Key**: Go to API Keys in your dashboard
4. **Set Environment Variables**:
   ```env
   RESEND_API_KEY=re_your_api_key_here
   RESEND_FROM=noreply@mtvtechsolutions.net
   CONTACT_TO=support@mtvtechsolutions.net
   ```

### Fallback Transport: Gmail

1. **Gmail Setup**:
   - Enable 2-factor authentication on your Gmail account
   - Generate an App Password: [Google App Passwords](https://myaccount.google.com/apppasswords)
   - Use the App Password (not your regular password) in `.env.local`

2. **Environment Variables**:
   ```env
   EMAIL_USER=yourgmail@gmail.com
   EMAIL_PASS=your_16_character_app_password
   CONTACT_TO=support@mtvtechsolutions.net
   ```

### Local Testing

```bash
npm run dev
curl http://localhost:3000/api/health
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Myles","email":"myles@test.com","message":"Hello from local test"}'
```

**Expected Result**: 200 OK with `{ "ok": true }`

### Transport Selection Logic

The system automatically chooses the email transport:
- If `RESEND_API_KEY` is present → uses Resend
- Else if `EMAIL_USER` + `EMAIL_PASS` are present → uses Gmail SMTP
- Else returns 500 error with configuration message

## 💳 Stripe Integration Setup

MTV Tech Solutions includes full Stripe payment integration for service bookings:

### 1. Stripe Account Setup

1. **Create Stripe Account**: [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register)
2. **Get API Keys**: Go to [API Keys](https://dashboard.stripe.com/apikeys)
   - Copy your **Publishable key** (starts with `pk_test_`)
   - Copy your **Secret key** (starts with `sk_test_`)

### 2. Environment Configuration

Add these variables to your `.env.local` file:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

### 3. Webhook Setup (Production)

1. **Create Webhook Endpoint**:
   - Go to [Stripe Webhooks](https://dashboard.stripe.com/webhooks)
   - Click "Add endpoint"
   - URL: `https://yourdomain.com/api/webhook`
   - Events: Select `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.payment_failed`

2. **Get Webhook Secret**:
   - Click on your webhook endpoint
   - Copy the "Signing secret" (starts with `whsec_`)
   - Add it to your `.env.local` as `STRIPE_WEBHOOK_SECRET`

### 4. Local Development with Webhooks

For local testing of webhooks:

```bash
# Install Stripe CLI
npm install -g stripe-cli

# Login to Stripe
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/webhook
```

### 5. Test Payment

Use Stripe's test card numbers:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **Requires Authentication**: `4000 0025 0000 3155`

Any future date, any 3-digit CVC, and any postal code.

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Add environment variables** in Vercel dashboard
3. **Deploy** - automatic deployments on push to main

### Netlify

1. **Connect your repository** to Netlify
2. **Build settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. **Add environment variables** in Netlify dashboard

### Deploying to cPanel

#### Option 1: Node.js Application (Preferred)

If your cPanel hosting supports Node.js:

1. **Enable Node.js** in cPanel Application Manager
2. **Upload your project** files to the app directory
3. **Install dependencies**:
   ```bash
   npm install --production
   ```
4. **Set environment variables** in cPanel or `.env.local`
5. **Start the application** using Passenger

#### Option 2: Static Export + Serverless Functions

If Node.js is not available:

1. **Create a serverless relay** (Cloudflare Workers, Netlify Functions, or Vercel Functions)
2. **Deploy the contact API** to the serverless platform
3. **Build static export**:
   ```bash
   npm run build
   npm run export
   ```
4. **Upload the `out` folder** to your cPanel public_html
5. **Update contact form** to use the serverless API endpoint

⚠️ **Security Note**: Never expose email credentials (RESEND_API_KEY, EMAIL_PASS) in client-side code. Always use server-side APIs or serverless functions.

#### Environment Variables for cPanel

Add these to your `.env.local` or cPanel environment settings:

```env
# Email Transport (choose one)
RESEND_API_KEY=your_resend_api_key
# OR
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_app_password

# Site URL for production
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Contact recipient
CONTACT_TO=support@mtvtechsolutions.net
```

## 📁 Project Structure

```
TECHSOLUTIONS/
├── components/          # React components
│   ├── Hero.tsx        # Landing page hero section
│   ├── Services.tsx    # Services showcase
│   ├── Footer.tsx      # Site footer
│   └── Navbar.tsx      # Navigation bar
├── pages/              # Next.js pages
│   ├── api/           # API routes
│   │   └── contact.ts # Contact form handler
│   ├── index.tsx      # Home page
│   ├── contact.tsx    # Contact page
│   └── _app.tsx       # App wrapper
├── styles/            # Global styles
│   └── globals.css    # Tailwind + custom CSS
├── public/            # Static assets
└── package.json       # Dependencies & scripts
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks
- `npm run format` - Format code with Prettier

## 🎯 Features

### Home Page
- **Hero Section** with compelling call-to-action
- **Services Overview** with detailed descriptions and pricing
- **Statistics** showcasing company achievements
- **Responsive Design** for all devices

### Services & Payments
- **Stripe Integration** for secure online payments
- **Service Booking** with instant checkout
- **Payment Success/Cancel** pages with user guidance
- **Webhook Support** for real-time payment updates
- **Test Mode** ready with Stripe test cards

### Contact Page
- **Contact Form** with validation
- **Email Integration** using Nodemailer
- **Contact Information** with multiple touchpoints
- **Success/Error Handling** with user feedback

### Technical Features
- **TypeScript** for type safety
- **ESLint + Prettier** for code quality
- **Tailwind CSS** for styling
- **Dark Theme** with neon accents
- **SEO Optimized** with meta tags
- **Performance Optimized** with Next.js
- **Secure Payments** with Stripe
- **Webhook Processing** for payment events

## 🧪 Testing & Troubleshooting

### Health Check Endpoint

Check your email configuration and system status:

```bash
# Local testing
curl -X GET http://localhost:3000/api/health

# Production testing
curl -X GET https://your-domain.com/api/health
```

Expected response:
```json
{
  "ok": true,
  "env": "development",
  "emailTransport": "RESEND",
  "hasEnvs": {
    "RESEND_API_KEY": true,
    "EMAIL_USER": false,
    "EMAIL_PASS": false
  }
}
```

### Contact Form Testing

Test the contact form with curl:

```bash
# Valid request (should return 200 if email configured, 500 if not)
curl -s -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Myles",
    "email": "myles@example.com",
    "message": "Test message from curl."
  }'

# Invalid email (should return 400)
curl -s -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "invalid-email",
    "message": "Test message that is long enough"
  }'

# Missing fields (should return 400)
curl -s -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test"
  }'

# Wrong method (should return 405)
curl -s -X GET http://localhost:3000/api/contact

# PowerShell equivalent for Windows:
# Invoke-WebRequest -Uri "http://localhost:3000/api/health" -Method GET
# Invoke-WebRequest -Uri "http://localhost:3000/api/contact" -Method POST -ContentType "application/json" -Body '{"name":"Myles","email":"myles@example.com","message":"Test message from PowerShell."}'
```

### Common Error Codes

| Code | Meaning | Solution |
|------|---------|----------|
| 400 | Validation failed | Check name (2-100 chars), valid email, message (10-5000 chars) |
| 405 | Wrong HTTP method | Use POST for `/api/contact`, GET for `/api/health` |
| 429 | Rate limit exceeded | Wait 10 minutes, max 5 requests per IP |
| 500 | Email transport error | Check `/api/health` for configuration issues |

### Troubleshooting Steps

1. **Check Health Endpoint**: Visit `/api/health` to verify configuration
2. **Verify Environment Variables**: Ensure email transport vars are set correctly
3. **Test Locally**: Use curl commands above to isolate issues
4. **Check Logs**: Look for structured JSON logs in console/server logs
5. **Rate Limiting**: If getting 429, wait 10 minutes between tests

### Gmail SMTP Troubleshooting

- **"Invalid credentials"**: Use App Password, not regular password
- **"Less secure app access"**: Enable 2FA and use App Password instead
- **"Authentication failed"**: Verify EMAIL_USER matches the Gmail account
- **"Connection timeout"**: Check firewall/network restrictions

### Resend Troubleshooting

- **"Invalid API key"**: Verify RESEND_API_KEY is correct
- **"Domain not verified"**: Use verified domain in RESEND_FROM
- **"Rate limit exceeded"**: Check Resend dashboard for limits

## 🔧 Customization

### Colors
Edit `tailwind.config.ts` to customize the color scheme:
```typescript
colors: {
  primary: "hsl(142 76% 36%)", // Neon green
  accent: "hsl(199 89% 48%)",  // Neon blue
  // ... other colors
}
```

### Content
- Update company information in components
- Modify services in `Services.tsx`
- Change contact details in `Footer.tsx` and `contact.tsx`

### Styling
- Global styles in `styles/globals.css`
- Component-specific styles using Tailwind classes
- Custom animations and effects

## 📞 Support

For technical support or questions:
- **Email**: support@mtvtechsolutions.net
- **Available**: 24/7 emergency support
- **Response Time**: 2-4 hours during business hours

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**MTV Tech Solutions** - AI-Powered Technology Solutions for Modern Businesses