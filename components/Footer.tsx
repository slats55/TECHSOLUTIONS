import Link from 'next/link';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/#services' },
    { name: 'Contact', href: '/contact' },
  ];

  const services = [
    { name: 'Computer Repair', href: '/#services' },
    { name: 'Tech Support', href: '/#services' },
    { name: 'Cybersecurity', href: '/#services' },
    { name: 'Web Design', href: '/#services' },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold gradient-text">MTV Tech Solutions</span>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              AI-powered technology solutions for modern businesses. 
              Expert computer repair, tech support, cybersecurity, and web design services.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center hover:bg-primary/30 transition-colors duration-300 cursor-pointer">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center hover:bg-accent/30 transition-colors duration-300 cursor-pointer">
                <Phone className="w-5 h-5 text-accent" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-muted-foreground text-sm">Email</p>
                          <a
                            href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'support@mtvtechsolutions.net'}`}
                            className="text-foreground hover:text-primary transition-colors duration-200"
                          >
                            {process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'support@mtvtechsolutions.net'}
                          </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-muted-foreground text-sm">Hours</p>
                  <p className="text-foreground">24/7 Support Available</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-muted-foreground text-sm">Service Area</p>
                  <p className="text-foreground">Nationwide Remote Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © {currentYear} MTV Tech Solutions. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
