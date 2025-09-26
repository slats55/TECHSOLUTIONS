import Head from 'next/head';
import Link from 'next/link';
import { XCircle, ArrowLeft, RefreshCw, HelpCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Cancel() {
  return (
    <>
      <Head>
        <title>Payment Canceled - MTV Tech Solutions</title>
        <meta name="description" content="Your payment was canceled. No charges were made to your account." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-background">
        <Navbar />
        
        <section className="pt-20 pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center animate-fade-in">
              {/* Cancel Icon */}
              <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-400 rounded-full flex items-center justify-center mx-auto mb-8">
                <XCircle className="w-12 h-12 text-white" />
              </div>

              {/* Cancel Message */}
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-foreground">Payment </span>
                <span className="text-red-500">Canceled</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                No worries! Your payment was canceled and no charges were made to your account.
              </p>

              {/* Reassurance */}
              <div className="bg-card border border-border rounded-lg p-6 mb-8 max-w-md mx-auto">
                <div className="flex items-center justify-center mb-3">
                  <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-green-500" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">No Charges Applied</h3>
                <p className="text-sm text-muted-foreground">
                  Your payment method was not charged. You can safely try again or contact us for assistance.
                </p>
              </div>
            </div>

            {/* Why This Might Have Happened */}
            <div className="mt-12 bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 text-foreground text-center">
                Why might this have happened?
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Changed Your Mind</h4>
                      <p className="text-sm text-muted-foreground">You decided to review our services before purchasing</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Technical Issue</h4>
                      <p className="text-sm text-muted-foreground">Browser or connection problems interrupted the process</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Payment Method</h4>
                      <p className="text-sm text-muted-foreground">Issues with card details or payment authorization</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary text-sm">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Need More Info</h4>
                      <p className="text-sm text-muted-foreground">Want to speak with our team before proceeding</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/#services"
                className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 flex items-center group"
              >
                <RefreshCw className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                Try Again
              </Link>
              
              <Link
                href="/contact"
                className="border border-accent text-accent px-8 py-3 rounded-lg font-semibold hover:bg-accent/10 transition-all duration-300 flex items-center"
              >
                <HelpCircle className="w-5 h-5 mr-2" />
                Get Help
              </Link>
              
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </div>

            {/* Alternative Options */}
            <div className="mt-16 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">
                  <span className="gradient-text">Still Need Our Services?</span>
                </h3>
                <p className="text-lg text-muted-foreground">
                  We're here to help! Choose the option that works best for you.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <RefreshCw className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Try Payment Again</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Go back to our services and complete your purchase
                  </p>
                  <Link
                    href="/#services"
                    className="text-primary hover:text-primary/80 transition-colors duration-200 text-sm font-medium"
                  >
                    View Services →
                  </Link>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <HelpCircle className="w-6 h-6 text-accent" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Contact Support</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Speak with our team about your technical needs
                  </p>
                  <Link
                    href="/contact"
                    className="text-accent hover:text-accent/80 transition-colors duration-200 text-sm font-medium"
                  >
                    Get in Touch →
                  </Link>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <ArrowLeft className="w-6 h-6 text-green-500" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Browse More</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Learn more about our AI-powered tech solutions
                  </p>
                  <Link
                    href="/"
                    className="text-green-500 hover:text-green-400 transition-colors duration-200 text-sm font-medium"
                  >
                    Explore More →
                  </Link>
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
