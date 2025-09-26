import { 
  Wrench, 
  Shield, 
  Monitor, 
  Code,
  CheckCircle,
  Clock,
  Users,
  Award
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Wrench,
      title: 'Computer Repair',
      description: 'Expert hardware diagnostics and repairs for all computer systems. Fast turnaround times with quality parts.',
      features: ['Hardware Diagnostics', 'Component Replacement', 'Data Recovery', 'Performance Optimization'],
      color: 'from-primary to-primary/80'
    },
    {
      icon: Monitor,
      title: 'Tech Support',
      description: 'Comprehensive technical support for businesses and individuals. Remote and on-site assistance available.',
      features: ['Remote Support', 'Software Installation', 'Network Setup', 'Troubleshooting'],
      color: 'from-accent to-accent/80'
    },
    {
      icon: Shield,
      title: 'Cybersecurity',
      description: 'Protect your digital assets with our advanced cybersecurity solutions and threat monitoring.',
      features: ['Threat Detection', 'Security Audits', 'Firewall Setup', 'Incident Response'],
      color: 'from-red-500 to-red-400'
    },
    {
      icon: Code,
      title: 'Web Design',
      description: 'Modern, responsive web design and development services. Custom solutions for your business needs.',
      features: ['Responsive Design', 'SEO Optimization', 'E-commerce Solutions', 'Maintenance'],
      color: 'from-purple-500 to-purple-400'
    }
  ];

  const benefits = [
    {
      icon: CheckCircle,
      title: 'Quality Guaranteed',
      description: 'All work comes with our satisfaction guarantee'
    },
    {
      icon: Clock,
      title: 'Fast Response',
      description: 'Quick turnaround times for urgent issues'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Certified professionals with years of experience'
    },
    {
      icon: Award,
      title: 'Proven Results',
      description: 'Track record of successful project deliveries'
    }
  ];

  return (
    <section id="services" className="py-20 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Our Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive technology solutions designed to keep your business running 
            at peak performance with cutting-edge AI-powered tools and expert support.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.title}
                className="group relative bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/10"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">
              Why Choose <span className="gradient-text">MTV Tech Solutions</span>?
            </h3>
            <p className="text-lg text-muted-foreground">
              We combine cutting-edge technology with personalized service to deliver exceptional results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="text-center group"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/30 transition-colors duration-300">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2 text-foreground">
                    {benefit.title}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
