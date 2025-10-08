'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
      {/* Cinematic background elements */}
      <div className="absolute inset-0">
        {/* Floating orbs with depth */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-accent/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-cyan/15 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,255,148,0.3) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Glass card container */}
        <motion.div 
          className="glass rounded-3xl p-8 md:p-12 depth"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Main heading with cinematic typography */}
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="block text-foreground font-light">AI-Powered</span>
            <span className="block gradient-text glow-text">Tech Solutions</span>
          </motion.h1>

          {/* Cinematic tagline */}
          <motion.p 
            className="text-xl md:text-3xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Computer Repair • Tech Support • Cybersecurity • Web Design
          </motion.p>

          {/* Enhanced description */}
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground/80 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Experience cutting-edge technology solutions with our AI-powered services. 
            From hardware diagnostics to cybersecurity protection, we deliver professional 
            tech support that keeps your business running at peak performance.
          </motion.p>

          {/* Cinematic CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link
              href="/contact"
              className="group relative bg-brand-accent text-brand-obsidian px-10 py-5 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 glow-green overflow-hidden"
            >
              <span className="relative z-10">Get Started Today</span>
              <div className="absolute inset-0 bg-gradient-to-r from-brand-accent to-brand-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            <Link
              href="/#services"
              className="glass border border-brand-accent/30 text-foreground px-10 py-5 rounded-xl text-lg font-semibold hover:border-brand-accent/60 transition-all duration-300 hover:scale-105 hover:shadow-glow-green"
            >
              View Our Services
            </Link>
          </motion.div>

          {/* Enhanced stats with glassmorphism */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            {[
              { number: "500+", label: "Happy Clients", delay: 0 },
              { number: "24/7", label: "Support Available", delay: 0.2 },
              { number: "99%", label: "Success Rate", delay: 0.4 }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center glass rounded-2xl p-6 card-hover"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 + stat.delay }}
              >
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-3">{stat.number}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Cinematic scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-6 h-12 border-2 border-brand-accent/50 rounded-full flex justify-center glass">
          <motion.div 
            className="w-1 h-4 bg-brand-accent rounded-full mt-2"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
