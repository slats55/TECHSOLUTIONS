'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Wrench, 
  Shield, 
  Monitor, 
  Code,
  CheckCircle,
  Clock,
  Users,
  Award,
  CreditCard,
  Loader2
} from 'lucide-react';

const Services = () => {
  const [loadingService, setLoadingService] = useState<string | null>(null);

  const services = [
    {
      id: 'computer-repair',
      icon: Wrench,
      title: 'Computer Repair',
      description: 'Expert hardware diagnostics and repairs for all computer systems. Fast turnaround times with quality parts.',
      features: ['Hardware Diagnostics', 'Component Replacement', 'Data Recovery', 'Performance Optimization'],
      color: 'from-primary to-primary/80',
      price: 9999, // $99.99 in cents
      priceDisplay: '$99.99',
      popular: false
    },
    {
      id: 'tech-support',
      icon: Monitor,
      title: 'Tech Support',
      description: 'Comprehensive technical support for businesses and individuals. Remote and on-site assistance available.',
      features: ['Remote Support', 'Software Installation', 'Network Setup', 'Troubleshooting'],
      color: 'from-accent to-accent/80',
      price: 7999, // $79.99 in cents
      priceDisplay: '$79.99',
      popular: true
    },
    {
      id: 'cybersecurity',
      icon: Shield,
      title: 'Cybersecurity',
      description: 'Protect your digital assets with our advanced cybersecurity solutions and threat monitoring.',
      features: ['Threat Detection', 'Security Audits', 'Firewall Setup', 'Incident Response'],
      color: 'from-red-500 to-red-400',
      price: 14999, // $149.99 in cents
      priceDisplay: '$149.99',
      popular: false
    },
    {
      id: 'web-design',
      icon: Code,
      title: 'Web Design',
      description: 'Modern, responsive web design and development services. Custom solutions for your business needs.',
      features: ['Responsive Design', 'SEO Optimization', 'E-commerce Solutions', 'Maintenance'],
      color: 'from-purple-500 to-purple-400',
      price: 49999, // $499.99 in cents
      priceDisplay: '$499.99',
      popular: false
    }
  ];

  const benefits = [
    {
      icon: CheckCircle,
      title: 'Quality Guaranteed',
      description: 'All work comes with our satisfaction guarantee'
    },
    {
      icon: Clock,
      title: 'Fast Response',
      description: 'Quick turnaround times for urgent issues'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Certified professionals with years of experience'
    },
    {
      icon: Award,
      title: 'Proven Results',
      description: 'Track record of successful project deliveries'
    }
  ];

  const handleCheckout = async (service: typeof services[0]) => {
    setLoadingService(service.id);

    try {
      const response = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lineItems: [
            {
              price_data: {
                currency: 'usd',
                product_data: {
                  name: service.title,
                  description: service.description,
                },
                unit_amount: service.price,
              },
              quantity: 1,
            },
          ],
          metadata: {
            service_id: service.id,
            service_name: service.title,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();
      
      if (url) {
        window.location.href = url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Sorry, there was an error processing your request. Please try again or contact support.');
    } finally {
      setLoadingService(null);
    }
  };

  return (
    <section id="services" className="py-20 cinematic-gradient relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text glow-text">Our Services</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Comprehensive technology solutions designed to keep your business running 
            at peak performance with cutting-edge AI-powered tools and expert support.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const isLoading = loadingService === service.id;
            
            return (
              <motion.div
                key={service.id}
                className={`group relative glass border ${service.popular ? 'border-brand-accent' : 'border-border'} rounded-2xl p-6 card-hover depth`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Popular Badge */}
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-brand-accent text-brand-obsidian px-4 py-2 rounded-full text-xs font-bold glow-green">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div className={`w-20 h-20 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 shadow-glow-green`}>
                  <IconComponent className="w-10 h-10 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Price */}
                <div className="mb-4">
                  <span className="text-2xl font-bold text-foreground">{service.priceDisplay}</span>
                  <span className="text-sm text-muted-foreground ml-1">starting at</span>
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Checkout Button */}
                <button
                  onClick={() => handleCheckout(service)}
                  disabled={isLoading}
                  className={`w-full bg-gradient-to-r ${service.color} text-white py-4 px-6 rounded-xl font-bold hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-cinematic hover:shadow-glow-green`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      <span>Get Started</span>
                    </>
                  )}
                </button>

                {/* Cinematic hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/5 to-brand-cyan/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            );
          })}
        </div>

        {/* Payment Security Notice */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground bg-card border border-border rounded-lg px-4 py-2">
            <Shield className="w-4 h-4 text-primary" />
            <span>Secure payments powered by Stripe • SSL encrypted • No setup fees</span>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">
              Why Choose <span className="gradient-text">MTV Tech Solutions</span>?
            </h3>
            <p className="text-lg text-muted-foreground">
              We combine cutting-edge technology with personalized service to deliver exceptional results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="text-center group"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/30 transition-colors duration-300">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2 text-foreground">
                    {benefit.title}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Custom Service CTA */}
        <div className="mt-16 text-center">
          <div className="bg-card border border-border rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Need Something Custom?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Don't see exactly what you need? We offer custom technology solutions 
              tailored to your specific requirements. Contact us for a personalized quote.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300"
            >
              <Users className="w-5 h-5 mr-2" />
              Get Custom Quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;