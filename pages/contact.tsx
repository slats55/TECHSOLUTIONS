import Head from 'next/head';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | { errorCode: number; message: string }>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Build proper API URL for both local and production
      const base = typeof window !== "undefined"
        ? window.location.origin
        : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
      const apiUrl = `${base}/api/contact`;
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        // Handle specific error codes with user-friendly messages
        let errorMessage = 'Something went wrong. Please try again.';
        
        if (response.status === 400) {
          errorMessage = 'Please check your name, email, and message.';
        } else if (response.status === 429) {
          errorMessage = 'Too many requests — try again soon.';
        } else if (response.status === 500) {
          errorMessage = 'Email service is being configured. You can reach us at support@mtvtechsolutions.net.';
        }
        
        setSubmitStatus({
          errorCode: response.status,
          message: data.error || errorMessage
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        errorCode: 0,
        message: 'Network error. Please check your connection and try again, or contact us at support@mtvtechsolutions.net.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Send us an email anytime',
      value: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'support@mtvtechsolutions.net',
      href: `mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'support@mtvtechsolutions.net'}`
    },
    {
      icon: Phone,
      title: 'Call Us',
      description: '24/7 support available',
      value: 'Available on request',
      href: '#'
    },
    {
      icon: MapPin,
      title: 'Service Area',
      description: 'Nationwide remote support',
      value: 'Remote & On-site',
      href: '#'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      description: 'We are always available',
      value: '24/7 Support',
      href: '#'
    }
  ];

  return (
    <>
      <Head>
        <title>Contact Us - MTV Tech Solutions</title>
        <meta
          name="description"
          content="Get in touch with MTV Tech Solutions for expert computer repair, tech support, cybersecurity, and web design services. 24/7 support available."
        />
        <meta name="keywords" content="contact, tech support, computer repair, cybersecurity, web design, help" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-background">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="gradient-text">Get In Touch</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Ready to solve your technology challenges? Contact our expert team 
                for professional computer repair, tech support, cybersecurity, and web design services.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-card border border-border rounded-xl p-8">
                <h2 className="text-2xl font-bold mb-6 text-foreground">Send us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Tell us about your technology needs..."
                    />
                  </div>

                  {/* Submit Status */}
                  {submitStatus === 'success' && (
                    <div className="flex items-center space-x-2 text-green-500 bg-green-500/10 p-3 rounded-lg">
                      <CheckCircle className="w-5 h-5" />
                      <span>Thank you! Your message has been sent successfully.</span>
                    </div>
                  )}

                  {typeof submitStatus === 'object' && submitStatus.errorCode && (
                    <div className="flex items-center space-x-2 text-red-500 bg-red-500/10 p-3 rounded-lg">
                      <AlertCircle className="w-5 h-5" />
                      <span>{submitStatus.message}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-foreground">Contact Information</h2>
                  <p className="text-muted-foreground mb-8">
                    We're here to help with all your technology needs. Reach out to us 
                    through any of the following methods and we'll respond promptly.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {contactInfo.map((info, index) => {
                    const IconComponent = info.icon;
                    return (
                      <div
                        key={info.title}
                        className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300 hover:scale-105"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <IconComponent className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground mb-1">
                              {info.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              {info.description}
                            </p>
                            <a
                              href={info.href}
                              className="text-primary hover:text-primary/80 transition-colors duration-200 font-medium"
                            >
                              {info.value}
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Additional Info */}
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-3">Response Time</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    We typically respond to all inquiries within 2-4 hours during business hours, 
                    and within 24 hours for urgent requests.
                  </p>
                  <div className="flex items-center space-x-2 text-sm text-primary">
                    <Clock className="w-4 h-4" />
                    <span>24/7 Emergency Support Available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
