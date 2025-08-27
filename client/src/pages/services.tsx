import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Monitor, Code, HardDrive, Shield, Smartphone, Globe, Search, ShoppingCart } from "lucide-react";
import ServiceCard from "@/components/ui/service-card";
import PricingCard from "@/components/ui/pricing-card";

export default function Services() {
  const navigateToContact = () => {
    window.location.hash = "contact";
  };

  return (
    <main className="pt-8">
      {/* Services Header */}
      <section className="py-20 bg-secondary" data-testid="services-header">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6" data-testid="services-title">
            Our Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="services-description">
            Professional computer repair and modern website design services tailored to your needs. 
            We combine technical expertise with exceptional customer service.
          </p>
        </div>
      </section>

      {/* Computer Repair Services */}
      <section className="py-20 bg-background" data-testid="computer-repair-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="computer-repair-title">
              Computer Repair Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="computer-repair-description">
              Fast, reliable, and affordable repair services for all your computing devices.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <ServiceCard
              testId="repair-hardware"
              icon={<Monitor className="w-8 h-8 text-accent-foreground" />}
              title="Hardware Repair & Diagnostics"
              description="Complete hardware troubleshooting and repair services for desktops and laptops."
              features={[
                "Motherboard & Component Repair",
                "Screen & Display Replacement",
                "Power Supply Issues",
                "Memory & Storage Upgrades",
                "Cooling System Maintenance"
              ]}
              buttonText="Get Hardware Quote"
              onButtonClick={navigateToContact}
            />

            <ServiceCard
              testId="repair-software"
              icon={<Shield className="w-8 h-8 text-accent-foreground" />}
              title="Software & Security Services"
              description="Comprehensive software solutions and security services to keep your system running smoothly."
              features={[
                "Virus & Malware Removal",
                "Operating System Installation",
                "Software Troubleshooting",
                "Data Recovery & Backup",
                "System Optimization"
              ]}
              buttonText="Get Software Quote"
              onButtonClick={navigateToContact}
            />

            <ServiceCard
              testId="repair-mobile"
              icon={<Smartphone className="w-8 h-8 text-accent-foreground" />}
              title="Mobile Device Repair"
              description="Professional repair services for smartphones, tablets, and other mobile devices."
              features={[
                "Screen & Display Repair",
                "Battery Replacement",
                "Water Damage Recovery",
                "Software Restoration",
                "Device Unlocking"
              ]}
              buttonText="Get Mobile Quote"
              onButtonClick={navigateToContact}
            />

            <ServiceCard
              testId="repair-data"
              icon={<HardDrive className="w-8 h-8 text-accent-foreground" />}
              title="Data Recovery & Backup"
              description="Professional data recovery services and backup solutions to protect your valuable information."
              features={[
                "Hard Drive Recovery",
                "SSD Data Recovery",
                "Cloud Backup Setup",
                "RAID Recovery",
                "Photo & Document Recovery"
              ]}
              buttonText="Get Data Quote"
              onButtonClick={navigateToContact}
            />
          </div>
        </div>
      </section>

      {/* Website Design Services */}
      <section className="py-20 bg-secondary" data-testid="website-design-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="website-design-title">
              Website Design & Development
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="website-design-description">
              Modern, responsive websites that represent your brand and drive results.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <ServiceCard
              testId="web-design"
              icon={<Code className="w-8 h-8 text-accent-foreground" />}
              title="Custom Web Design"
              description="Beautiful, functional websites tailored to your brand and business objectives."
              features={[
                "Custom Design & Layout",
                "Mobile-Responsive Design",
                "User Experience (UX) Optimization",
                "Brand Integration",
                "Content Management Systems"
              ]}
              buttonText="Start Web Project"
              onButtonClick={navigateToContact}
            />

            <ServiceCard
              testId="web-ecommerce"
              icon={<ShoppingCart className="w-8 h-8 text-accent-foreground" />}
              title="E-commerce Solutions"
              description="Complete online store solutions with secure payment processing and inventory management."
              features={[
                "Online Store Development",
                "Payment Gateway Integration",
                "Inventory Management",
                "Order Processing Systems",
                "Shopping Cart Optimization"
              ]}
              buttonText="Start E-commerce"
              onButtonClick={navigateToContact}
            />

            <ServiceCard
              testId="web-seo"
              icon={<Search className="w-8 h-8 text-accent-foreground" />}
              title="SEO & Digital Marketing"
              description="Search engine optimization and digital marketing services to increase your online visibility."
              features={[
                "Search Engine Optimization",
                "Google Analytics Setup",
                "Local SEO Optimization",
                "Content Strategy",
                "Performance Monitoring"
              ]}
              buttonText="Improve SEO"
              onButtonClick={navigateToContact}
            />

            <ServiceCard
              testId="web-maintenance"
              icon={<Globe className="w-8 h-8 text-accent-foreground" />}
              title="Website Maintenance"
              description="Ongoing website maintenance and support to keep your site secure and up-to-date."
              features={[
                "Regular Security Updates",
                "Content Updates",
                "Performance Optimization",
                "Backup & Recovery",
                "Technical Support"
              ]}
              buttonText="Get Maintenance"
              onButtonClick={navigateToContact}
            />
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 bg-background" data-testid="services-pricing-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="services-pricing-title">
              Service Pricing
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="services-pricing-description">
              Transparent pricing with no hidden fees. Choose the service level that fits your needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <PricingCard
              testId="pricing-diagnostic"
              title="Diagnostic"
              price="$49"
              period="/service"
              features={[
                "System Diagnosis",
                "Problem Identification",
                "Repair Estimate",
                "30-Min Consultation"
              ]}
              buttonText="Book Diagnostic"
              onButtonClick={navigateToContact}
            />

            <PricingCard
              testId="pricing-basic-repair"
              title="Basic Repair"
              price="$89"
              period="/service"
              features={[
                "Software Issues",
                "Basic Optimization",
                "Virus Removal",
                "System Updates"
              ]}
              buttonText="Choose Basic"
              onButtonClick={navigateToContact}
            />

            <PricingCard
              testId="pricing-standard-repair"
              title="Standard Repair"
              price="$149"
              period="/service"
              features={[
                "Hardware Repairs",
                "Data Recovery",
                "System Restoration",
                "Performance Tune-up"
              ]}
              buttonText="Choose Standard"
              onButtonClick={navigateToContact}
              isPopular={true}
            />

            <PricingCard
              testId="pricing-website-basic"
              title="Basic Website"
              price="$599"
              period="/project"
              features={[
                "5-Page Website",
                "Mobile Responsive",
                "Basic SEO",
                "Contact Form"
              ]}
              buttonText="Start Website"
              onButtonClick={navigateToContact}
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-secondary" data-testid="services-cta-section">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6" data-testid="services-cta-title">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto" data-testid="services-cta-description">
            Contact us today for a free consultation and quote for your computer repair or website design project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button 
                className="bg-accent text-accent-foreground px-8 py-4 text-lg font-bold hover:bg-accent/90"
                data-testid="services-cta-contact"
              >
                Get Free Quote
              </Button>
            </Link>
            <Button 
              variant="outline"
              className="border-2 border-accent text-accent px-8 py-4 text-lg font-bold hover:bg-accent hover:text-accent-foreground bg-transparent"
              data-testid="services-cta-call"
            >
              Call (555) 123-4567
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
