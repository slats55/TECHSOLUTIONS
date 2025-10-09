import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CheckCircle, ArrowRight, Mail, Phone } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Success() {
  const router = useRouter();
  const { session_id } = router.query;
  const [sessionData, setSessionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session_id) {
      // In a real app, you'd fetch session details from your API
      // For now, we'll just show a success message
      setLoading(false);
    }
  }, [session_id]);

  return (
    <>
      <Head>
        <title>Payment Successful - MTV Tech Solutions</title>
        <meta name="description" content="Your payment has been processed successfully. Thank you for choosing MTV Tech Solutions." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-background">
        <Navbar />
        
        <section className="pt-20 pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              {loading ? (
                <div className="animate-pulse">
                  <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-6"></div>
                  <div className="h-8 bg-primary/20 rounded-lg mb-4 max-w-md mx-auto"></div>
                  <div className="h-4 bg-primary/20 rounded-lg mb-2 max-w-sm mx-auto"></div>
                </div>
              ) : (
                <div className="animate-fade-in">
                  {/* Success Icon */}
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-400 rounded-full flex items-center justify-center mx-auto mb-8 animate-glow">
                    <CheckCircle className="w-12 h-12 text-white" />
                  </div>

                  {/* Success Message */}
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    <span className="gradient-text">Payment Successful!</span>
                  </h1>
                  
                  <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                    🎉 Thank you for choosing MTV Tech Solutions! Your payment has been processed successfully.
                  </p>

                  {session_id && (
                    <div className="bg-card border border-border rounded-lg p-6 mb-8 max-w-md mx-auto">
                      <h3 className="text-lg font-semibold mb-2 text-foreground">Order Details</h3>
                      <p className="text-sm text-muted-foreground">
                        Session ID: <span className="font-mono text-primary">{session_id}</span>
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* What's Next Section */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center">
                  <Mail className="w-6 h-6 text-primary mr-2" />
                  What's Next?
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    You'll receive a confirmation email shortly
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Our team will contact you within 24 hours
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    We'll schedule your service at your convenience
                  </li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center">
                  <Phone className="w-6 h-6 text-accent mr-2" />
                  Need Immediate Help?
                </h3>
                <p className="text-muted-foreground mb-4">
                  For urgent technical support or questions about your order:
                </p>
                <div className="space-y-3">
                  <a
                    href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'support@mtvtechsolutions.net'}`}
                    className="flex items-center text-primary hover:text-primary/80 transition-colors duration-200"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    {process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'support@mtvtechsolutions.net'}
                  </a>
                  <p className="text-sm text-muted-foreground">
                    📞 24/7 Emergency Support Available
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/"
                className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 flex items-center group"
              >
                Return to Home
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              
              <Link
                href="/contact"
                className="border border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary/10 transition-all duration-300"
              >
                Contact Support
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 text-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-3">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">Secure Payment</h4>
                  <p className="text-sm text-muted-foreground">256-bit SSL encryption</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-3">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">24/7 Support</h4>
                  <p className="text-sm text-muted-foreground">Always here to help</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-3">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">Satisfaction Guaranteed</h4>
                  <p className="text-sm text-muted-foreground">100% money back</p>
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
