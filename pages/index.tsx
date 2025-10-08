import Head from 'next/head';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>MTV Tech Solutions - AI-Powered Computer Repair, Tech Support, Cybersecurity & Web Design</title>
        <meta
          name="description"
          content="Expert AI-powered technology solutions including computer repair, tech support, cybersecurity, and web design. 24/7 support available nationwide."
        />
        <meta name="keywords" content="computer repair, tech support, cybersecurity, web design, AI-powered, technology solutions" />
        <meta name="author" content="MTV Tech Solutions" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mtvtechsolutions.com/" />
        <meta property="og:title" content="MTV Tech Solutions - AI-Powered Technology Solutions" />
        <meta
          property="og:description"
          content="Expert AI-powered technology solutions including computer repair, tech support, cybersecurity, and web design. 24/7 support available nationwide."
        />
        <meta property="og:image" content="/favicon.ico" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://mtvtechsolutions.com/" />
        <meta property="twitter:title" content="MTV Tech Solutions - AI-Powered Technology Solutions" />
        <meta
          property="twitter:description"
          content="Expert AI-powered technology solutions including computer repair, tech support, cybersecurity, and web design. 24/7 support available nationwide."
        />
        <meta property="twitter:image" content="/favicon.ico" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Theme */}
        <meta name="theme-color" content="#16a34a" />
        <meta name="color-scheme" content="dark" />
      </Head>

      <main className="min-h-screen bg-background">
        <Navbar />
        <Hero />
        <Services />
        <Footer />
      </main>
    </>
  );
}
