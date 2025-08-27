import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Monitor, Code, Zap, CheckCircle, Users, DollarSign } from "lucide-react";
import ServiceCard from "@/components/ui/service-card";
import PricingCard from "@/components/ui/pricing-card";

export default function Home() {
  const navigateToServices = () => {
    window.location.hash = "services";
  };

  const navigateToContact = () => {
    window.location.hash = "contact";
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="hero-gradient py-20 lg:py-32" data-testid="hero-section">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
            Reliable Computer Repair & <br />
            <span className="text-accent">Modern Website Design</span>
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto" data-testid="hero-description">
            Professional solutions for your digital needs. Fast repairs, cutting-edge websites, and exceptional service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services">
              <Button 
                className="bg-accent text-accent-foreground px-8 py-4 text-lg font-bold hover:bg-accent/90"
                data-testid="hero-cta-services"
              >
                Explore Services
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                variant="outline"
                className="border-2 border-accent text-accent px-8 py-4 text-lg font-bold hover:bg-accent hover:text-accent-foreground bg-transparent"
                data-testid="hero-cta-contact"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-secondary" data-testid="services-overview-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="services-overview-title">
              Our Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="services-overview-description">
              We specialize in two core areas: keeping your technology running smoothly and creating stunning digital presences.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <ServiceCard
              testId="service-computer-repair"
              icon={<Monitor className="w-8 h-8 text-accent-foreground" />}
              title="Computer Repair"
              description="Fast, affordable, and reliable repair services for desktops, laptops, and mobile devices. From virus removal to hardware fixes, we've got you covered."
              features={[
                "Hardware Diagnostics & Repair",
                "Virus Removal & Security",
                "Data Recovery & Backup",
                "System Optimization"
              ]}
              buttonText="Get Repair Quote"
              onButtonClick={navigateToContact}
            />

            <ServiceCard
              testId="service-website-design"
              icon={<Code className="w-8 h-8 text-accent-foreground" />}
              title="Website Design"
              description="Modern, responsive websites tailored to your business or personal brand. We create stunning digital experiences that convert visitors into customers."
              features={[
                "Custom Web Design & Development",
                "Mobile-Responsive Design",
                "E-commerce Solutions",
                "SEO Optimization"
              ]}
              buttonText="Start Your Project"
              onButtonClick={navigateToContact}
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-background" data-testid="why-choose-us-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="why-choose-us-title">
              Why Choose MTV Industries?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="why-choose-us-description">
              We combine technical expertise with exceptional customer service to deliver results that exceed expectations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Zap className="w-10 h-10 text-accent" />,
                title: "Fast Turnaround",
                description: "Quick diagnosis and repair times to get you back up and running.",
                testId: "feature-fast-turnaround"
              },
              {
                icon: <CheckCircle className="w-10 h-10 text-accent" />,
                title: "Reliable Solutions",
                description: "Professional-grade repairs and websites built to last.",
                testId: "feature-reliable-solutions"
              },
              {
                icon: <Users className="w-10 h-10 text-accent" />,
                title: "Expert Support",
                description: "Knowledgeable technicians and designers at your service.",
                testId: "feature-expert-support"
              },
              {
                icon: <DollarSign className="w-10 h-10 text-accent" />,
                title: "Fair Pricing",
                description: "Transparent, competitive rates with no hidden fees.",
                testId: "feature-fair-pricing"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center" data-testid={feature.testId}>
                <div className="w-20 h-20 bg-secondary rounded-full mx-auto mb-6 flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4" data-testid={`${feature.testId}-title`}>
                  {feature.title}
                </h3>
                <p className="text-muted-foreground" data-testid={`${feature.testId}-description`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 bg-secondary" data-testid="about-preview-section">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="about-preview-title">
                About MTV Industries
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed" data-testid="about-preview-description">
                At MTV Industries, we pride ourselves on providing reliable computer repair and cutting-edge website design services. Our mission is to deliver professional, modern solutions while keeping usability and customer satisfaction at the forefront.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed" data-testid="about-preview-description-2">
                With years of experience in the tech industry, we understand that your digital tools are essential to your success. Whether it's fixing a critical hardware issue or creating a website that perfectly represents your brand, we're here to help.
              </p>
              <div className="grid sm:grid-cols-2 gap-6 mb-8" data-testid="about-preview-values">
                {[
                  "Customer-First Approach",
                  "Modern Solutions",
                  "Professional Service",
                  "Quality Guarantee"
                ].map((value, index) => (
                  <div key={index} className="flex items-center" data-testid={`about-value-${index}`}>
                    <div className="w-3 h-3 bg-accent rounded-full mr-4"></div>
                    <span className="font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:pl-8">
              <img 
                src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Professional technicians working on computer repair" 
                className="rounded-xl shadow-2xl w-full h-auto" 
                data-testid="about-preview-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-background" data-testid="pricing-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="pricing-title">
              Service Packages
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="pricing-description">
              Choose from our flexible service packages designed to meet your specific needs and budget.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <PricingCard
              testId="pricing-basic"
              title="Basic Repair"
              price="$89"
              period="/service"
              features={[
                "System Diagnostics",
                "Software Issues",
                "Basic Optimization"
              ]}
              buttonText="Choose Basic"
              onButtonClick={navigateToContact}
            />

            <PricingCard
              testId="pricing-standard"
              title="Standard Repair"
              price="$149"
              period="/service"
              features={[
                "Everything in Basic",
                "Hardware Repairs",
                "Virus Removal",
                "Data Backup"
              ]}
              buttonText="Choose Standard"
              onButtonClick={navigateToContact}
              isPopular={true}
            />

            <PricingCard
              testId="pricing-website"
              title="Website Package"
              price="$599"
              period="/project"
              features={[
                "Custom Design",
                "Mobile Responsive",
                "SEO Optimization",
                "1-Year Support"
              ]}
              buttonText="Choose Website"
              onButtonClick={navigateToContact}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
