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

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm 8+

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/slats55/TECHSOLUTIONS.git
   cd TECHSOLUTIONS
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` and add your email credentials:
   ```env
   EMAIL_USER=yourgmail@gmail.com
   EMAIL_PASS=your_app_password_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📧 Email Setup

To enable the contact form functionality:

1. **Gmail Setup**:
   - Enable 2-factor authentication on your Gmail account
   - Generate an App Password: [Google App Passwords](https://myaccount.google.com/apppasswords)
   - Use the App Password (not your regular password) in `.env.local`

2. **Environment Variables**:
   ```env
   EMAIL_USER=mtvrentals845@gmail.com
   EMAIL_PASS=your_16_character_app_password
   ```

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

### cPanel/Shared Hosting

1. **Build the project**:
   ```bash
   npm run build
   npm run export
   ```

2. **Upload** the `out` folder to your hosting provider
3. **Configure** email settings on your server

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
- **Email**: mtvrentals845@gmail.com
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