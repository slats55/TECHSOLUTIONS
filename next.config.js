/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
  },
  // Only expose public environment variables to client-side
  env: {
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_CONTACT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  },
  // Stripe webhook requires raw body parsing
  experimental: {
    serverComponentsExternalPackages: ['stripe'],
  },
}

module.exports = nextConfig
