import { Link } from "wouter";
import { Twitter, Linkedin, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4" data-testid="footer-company-name">
              MTV Industries
            </h3>
            <p className="text-muted-foreground mb-4" data-testid="footer-company-description">
              Professional computer repair and modern website design services.
            </p>
            <div className="flex space-x-4" data-testid="social-links">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-accent transition-colors"
                data-testid="social-twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-accent transition-colors"
                data-testid="social-facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-accent transition-colors"
                data-testid="social-linkedin"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4" data-testid="footer-quick-links-title">
              Quick Links
            </h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/" data-testid="footer-link-home">
                  <a className="hover:text-accent transition-colors">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/services" data-testid="footer-link-services">
                  <a className="hover:text-accent transition-colors">Services</a>
                </Link>
              </li>
              <li>
                <Link href="/about" data-testid="footer-link-about">
                  <a className="hover:text-accent transition-colors">About</a>
                </Link>
              </li>
              <li>
                <Link href="/contact" data-testid="footer-link-contact">
                  <a className="hover:text-accent transition-colors">Contact</a>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4" data-testid="footer-services-title">
              Services
            </h4>
            <ul className="space-y-2 text-muted-foreground">
              <li data-testid="footer-service-computer-repair">Computer Repair</li>
              <li data-testid="footer-service-website-design">Website Design</li>
              <li data-testid="footer-service-data-recovery">Data Recovery</li>
              <li data-testid="footer-service-consultations">Consultations</li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4" data-testid="footer-contact-title">
              Contact
            </h4>
            <ul className="space-y-2 text-muted-foreground">
              <li data-testid="footer-contact-phone">(555) 123-4567</li>
              <li data-testid="footer-contact-email">info@mtvindustries.com</li>
              <li data-testid="footer-contact-address">
                123 Tech Street<br />Downtown City, ST 12345
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 text-center text-muted-foreground">
          <p data-testid="footer-copyright">
            &copy; 2025 MTV Industries | Computer Repair & Website Design. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
