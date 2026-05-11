import tracker from '@/components/period-tracker';
import { useEffect } from 'react';
import Hero from '@/components/Hero';
import Navigation from '@/components/Navigation';
import FeatureCard from '@/components/FeatureCard';
import PageTransition from '@/components/PageTransition';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Heart, 
  BookOpen, 
  Briefcase, 
  Users, 
  Laptop, 
  PencilRuler,
  Building,
  Brain,
  Baby,
  HeadphonesIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  // Smooth scroll to top on page load
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  const allFeatures = [
    {
      icon: Calendar,
      title: "Period & Ovulation Tracker",
      description: "Track reproductive health and fertility windows with personalized insights",
      link: "/tracker",
      color: "text-primary bg-primary/10"
    },
    {
      icon: Heart,
      title: "Pregnancy & Maternal Health",
      description: "AI-based trimester insights, wellness guides, and health monitoring",
      link: "/pregnancy",
      color: "text-accent-foreground bg-accent/10"
    },
    {
      icon: Baby,
      title: "Baby Care",
      description: "Vaccination tracking, milestone tracking, and AI-based reminders",
      link: "/baby-care",
      color: "text-green-600 bg-green-100"
    },
    {
      icon: Briefcase,
      title: "Work-Life Balance",
      description: "Tools and scheduling assistance for working mothers",
      link: "/work-life",
      color: "text-blue-600 bg-blue-100"
    },
    {
      icon: PencilRuler,
      title: "Freelancing & Hobby Marketplace",
      description: "Work on interest-based projects and sell creative works",
      color: "text-purple-600 bg-purple-100"
    },
    {
      icon: Building,
      title: "Employer Interaction Portal",
      description: "Communicate with workplaces regarding maternity policies",
      color: "text-slate-600 bg-slate-100"
    },
    {
      icon: Users,
      title: "Empowering Fathers",
      description: "A dedicated guide for fathers on supporting their partners and childcare",
      color: "text-amber-600 bg-amber-100"
    },
    {
      icon: HeadphonesIcon,
      title: "Mental Health Resources",
      description: "Resources for emotional well-being, guided meditation, and therapy options",
      link: "/mental-health",
      color: "text-indigo-600 bg-indigo-100"
    }
  ];

  return (
    <PageTransition>
      <Navigation />
      
      {/* Hero section */}
      <Hero />
      
      {/* All features section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16 max-w-2xl mx-auto"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-medium mb-4">
              A Complete Parenthood Support Ecosystem
            </motion.h2>
            <motion.p variants={itemVariants} className="text-muted-foreground text-lg">
              EmpowerNest provides all the tools and resources parents need from fertility tracking
              to postpartum care and career support.
            </motion.p>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {allFeatures.map((feature, index) => (
              <motion.div key={feature.title} variants={itemVariants}>
                <FeatureCard
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  iconColor={feature.color}
                  link={feature.link}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Testimonial section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-8 rounded-2xl border bg-card max-w-5xl mx-auto relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/5 to-accent/5 pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-primary/10 blur-[40px] pointer-events-none" />
            
            <div className="relative">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-2/3">
                  <h3 className="text-2xl md:text-3xl font-medium mb-6">
                    Designed for every stage of your parenthood journey
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Whether you're planning a pregnancy, expecting a child, navigating the postpartum period, 
                    or balancing work and family life, EmpowerNest provides personalized support and resources 
                    to help you thrive.
                  </p>
                  <Button size="lg" className="rounded-full" asChild>
                    <Link to="/baby-care">Start your journey</Link>
                  </Button>
                </div>
                
                <div className="md:w-1/3 grid grid-cols-2 gap-3">
                  {[
                    { icon: Calendar, label: "Cycle Tracking" },
                    { icon: Heart, label: "Pregnancy" },
                    { icon: Baby, label: "Baby Care" },
                    { icon: Briefcase, label: "Work-Life" }
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + (i * 0.1) }}
                      className="flex flex-col items-center justify-center p-4 rounded-xl border bg-card/80 backdrop-blur-sm text-center"
                    >
                      <item.icon className="h-8 w-8 mb-2 text-primary" />
                      <span className="text-sm">{item.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-card py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
                  <Heart className="h-4 w-4" />
                </div>
                <span className="font-medium text-lg">EmpowerNest</span>
              </div>
              <p className="mt-2 text-muted-foreground max-w-md">
                Your complete parenthood support ecosystem, designed to help parents thrive in every aspect of their journey.
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div>
                <h4 className="font-medium mb-3">Features</h4>
                <ul className="space-y-2">
                  <li><Link to="/tracker" className="text-muted-foreground hover:text-foreground">Period Tracker</Link></li>
                  <li><Link to="/pregnancy" className="text-muted-foreground hover:text-foreground">Pregnancy Journey</Link></li>
                  <li><Link to="/baby-care" className="text-muted-foreground hover:text-foreground">Baby Care</Link></li>
                  <li><Link to="/work-life" className="text-muted-foreground hover:text-foreground">Work-Life</Link></li>
                  <li><Link to="/mental-health" className="text-muted-foreground hover:text-foreground">Mental Health</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Company</h4>
                <ul className="space-y-2">
                  <li><Link to="/about" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Contact</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Privacy</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Connect</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Twitter</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Instagram</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Facebook</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-6 border-t border-muted">
            <p className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} EmpowerNest. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </PageTransition>
  );
};

export default Index;
