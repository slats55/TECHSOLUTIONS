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
- **Services Overview** with detailed descriptions
- **Statistics** showcasing company achievements
- **Responsive Design** for all devices

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