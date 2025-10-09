import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - MTV Tech Solutions</title>
        <meta
          name="description"
          content="Privacy Policy for MTV Tech Solutions - Learn how we protect your personal information and data."
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
                <span className="gradient-text">Privacy Policy</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>

            <div className="prose prose-invert max-w-none">
              <div className="bg-card border border-border rounded-xl p-8 space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-foreground">Information We Collect</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We collect information you provide directly to us, such as when you create an account, 
                    make a purchase, contact us for support, or communicate with us.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-foreground">How We Use Your Information</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We use the information we collect to provide, maintain, and improve our services, 
                    process transactions, and communicate with you.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-foreground">Information Sharing</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We do not sell, trade, or otherwise transfer your personal information to third parties 
                    without your consent, except as described in this policy.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-foreground">Data Security</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We implement appropriate security measures to protect your personal information against 
                    unauthorized access, alteration, disclosure, or destruction.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-foreground">Contact Us</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    If you have any questions about this Privacy Policy, please contact us at{' '}
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
