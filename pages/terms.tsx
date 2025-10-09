import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Service - MTV Tech Solutions</title>
        <meta
          name="description"
          content="Terms of Service for MTV Tech Solutions - Read our terms and conditions for using our technology services."
        />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-background">
        <Navbar />
        
        <section className="pt-20 pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="gradient-text">Terms of Service</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>

            <div className="prose prose-invert max-w-none">
              <div className="bg-card border border-border rounded-xl p-8 space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-foreground">Acceptance of Terms</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    By accessing and using MTV Tech Solutions services, you accept and agree to be bound by 
                    the terms and provision of this agreement.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-foreground">Services Description</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    MTV Tech Solutions provides computer repair, tech support, cybersecurity, and web design 
                    services. All services are provided on an as-is basis.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-foreground">Payment Terms</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Payment is due upon completion of services unless otherwise agreed upon. We accept 
                    major credit cards and other payment methods as specified during checkout.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-foreground">Service Guarantee</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We stand behind our work with a satisfaction guarantee. If you're not satisfied with 
                    our services, please contact us within 30 days for a resolution.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-foreground">Limitation of Liability</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    MTV Tech Solutions shall not be liable for any indirect, incidental, special, 
                    consequential, or punitive damages resulting from the use of our services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-foreground">Contact Information</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    For questions about these Terms of Service, please contact us at{' '}
                    <a href="mailto:support@mtvtechsolutions.net" className="text-primary hover:text-primary/80">
                      support@mtvtechsolutions.net
                    </a>
                  </p>
                </section>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
