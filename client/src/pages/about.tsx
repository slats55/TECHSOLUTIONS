import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Award, Clock, Users, Target, CheckCircle, Heart } from "lucide-react";

export default function About() {
  return (
    <main className="pt-8">
      {/* About Header */}
      <section className="py-20 bg-secondary" data-testid="about-header">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6" data-testid="about-title">
            About MTV Industries
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="about-subtitle">
            Professional computer repair and modern website design services built on trust, expertise, and customer satisfaction.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-background" data-testid="mission-section">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="mission-title">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed" data-testid="mission-description">
                At MTV Industries, we pride ourselves on providing reliable computer repair and cutting-edge website design services. Our mission is to deliver professional, modern solutions while keeping usability and customer satisfaction at the forefront.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed" data-testid="mission-description-2">
                With years of experience in the tech industry, we understand that your digital tools are essential to your success. Whether it's fixing a critical hardware issue or creating a website that perfectly represents your brand, we're here to help you achieve your goals.
              </p>
              <Link href="/contact">
                <Button 
                  className="bg-accent text-accent-foreground px-8 py-4 text-lg font-bold hover:bg-accent/90"
                  data-testid="mission-cta"
                >
                  Work With Us
                </Button>
              </Link>
            </div>
            <div className="lg:pl-8">
              <img 
                src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Professional technicians working on computer repair" 
                className="rounded-xl shadow-2xl w-full h-auto" 
                data-testid="mission-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-secondary" data-testid="values-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="values-title">
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="values-description">
              These principles guide every decision we make and every service we provide.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Heart className="w-10 h-10 text-accent" />,
                title: "Customer-First Approach",
                description: "Every decision we make starts with considering what's best for our customers. Your satisfaction is our top priority.",
                testId: "value-customer-first"
              },
              {
                icon: <Award className="w-10 h-10 text-accent" />,
                title: "Quality Excellence",
                description: "We never compromise on quality. Every repair and every website is built to the highest professional standards.",
                testId: "value-quality"
              },
              {
                icon: <CheckCircle className="w-10 h-10 text-accent" />,
                title: "Reliability & Trust",
                description: "You can count on us to deliver on our promises. We build lasting relationships through consistent, dependable service.",
                testId: "value-reliability"
              },
              {
                icon: <Clock className="w-10 h-10 text-accent" />,
                title: "Timely Service",
                description: "We respect your time and understand urgency. Quick turnaround times without sacrificing quality.",
                testId: "value-timely"
              },
              {
                icon: <Target className="w-10 h-10 text-accent" />,
                title: "Innovation Focus",
                description: "We stay current with the latest technology trends and best practices to provide modern solutions.",
                testId: "value-innovation"
              },
              {
                icon: <Users className="w-10 h-10 text-accent" />,
                title: "Professional Expertise",
                description: "Our team brings years of experience and continuous learning to solve your toughest technical challenges.",
                testId: "value-expertise"
              }
            ].map((value, index) => (
              <div key={index} className="text-center bg-card p-6 rounded-xl border border-border" data-testid={value.testId}>
                <div className="w-20 h-20 bg-background rounded-full mx-auto mb-6 flex items-center justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-4" data-testid={`${value.testId}-title`}>
                  {value.title}
                </h3>
                <p className="text-muted-foreground" data-testid={`${value.testId}-description`}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-background" data-testid="story-section">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="story-title">
              Our Story
            </h2>
            <div className="text-lg text-muted-foreground space-y-6 leading-relaxed">
              <p data-testid="story-paragraph-1">
                MTV Industries was founded with a simple vision: to provide reliable, professional technology services 
                that small businesses and individuals can trust. We saw too many people struggling with unreliable 
                computer repair services and outdated website designs that didn't represent their brand properly.
              </p>
              <p data-testid="story-paragraph-2">
                Starting as a small local repair shop, we quickly expanded our services to include modern website 
                design and development. Our commitment to quality work, fair pricing, and exceptional customer service 
                helped us grow organically through word-of-mouth recommendations.
              </p>
              <p data-testid="story-paragraph-3">
                Today, MTV Industries serves customers across the region with the same personal touch and attention 
                to detail that made us successful from day one. We've helped hundreds of customers get their 
                technology working properly and built stunning websites that drive real business results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-secondary" data-testid="why-choose-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="why-choose-title">
              Why Choose MTV Industries?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="why-choose-description">
              Here's what sets us apart from other technology service providers.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              {[
                {
                  title: "Experienced Professionals",
                  description: "Our team has years of experience in both computer repair and web development, ensuring expert service across all our offerings.",
                  testId: "advantage-experience"
                },
                {
                  title: "Comprehensive Services",
                  description: "From hardware repairs to complete website redesigns, we're your one-stop solution for all technology needs.",
                  testId: "advantage-comprehensive"
                },
                {
                  title: "Transparent Pricing",
                  description: "No hidden fees or surprise charges. We provide clear, upfront pricing so you know exactly what to expect.",
                  testId: "advantage-pricing"
                }
              ].map((advantage, index) => (
                <div key={index} className="flex items-start" data-testid={advantage.testId}>
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2" data-testid={`${advantage.testId}-title`}>
                      {advantage.title}
                    </h3>
                    <p className="text-muted-foreground" data-testid={`${advantage.testId}-description`}>
                      {advantage.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-8">
              {[
                {
                  title: "Fast Turnaround Times",
                  description: "We understand that time is money. Most repairs are completed within 24-48 hours, and we provide realistic timelines for all projects.",
                  testId: "advantage-fast"
                },
                {
                  title: "Quality Guarantee",
                  description: "We stand behind our work with warranties on repairs and ongoing support for website projects. Your satisfaction is guaranteed.",
                  testId: "advantage-quality"
                },
                {
                  title: "Local & Personal",
                  description: "As a local business, we understand the community and provide personalized service that large corporations simply can't match.",
                  testId: "advantage-local"
                }
              ].map((advantage, index) => (
                <div key={index} className="flex items-start" data-testid={advantage.testId}>
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2" data-testid={`${advantage.testId}-title`}>
                      {advantage.title}
                    </h3>
                    <p className="text-muted-foreground" data-testid={`${advantage.testId}-description`}>
                      {advantage.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-background" data-testid="about-cta-section">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6" data-testid="about-cta-title">
            Ready to Work Together?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto" data-testid="about-cta-description">
            Experience the MTV Industries difference. Contact us today to discuss your computer repair or website design needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button 
                className="bg-accent text-accent-foreground px-8 py-4 text-lg font-bold hover:bg-accent/90"
                data-testid="about-cta-contact"
              >
                Get Started Today
              </Button>
            </Link>
            <Link href="/services">
              <Button 
                variant="outline"
                className="border-2 border-accent text-accent px-8 py-4 text-lg font-bold hover:bg-accent hover:text-accent-foreground bg-transparent"
                data-testid="about-cta-services"
              >
                View Our Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
