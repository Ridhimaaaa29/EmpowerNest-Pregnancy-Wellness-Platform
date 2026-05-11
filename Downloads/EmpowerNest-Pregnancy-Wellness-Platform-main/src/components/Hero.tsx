
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Heart, BookOpen } from 'lucide-react';

export function Hero() {
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

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center py-20 px-4 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background -z-10" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[100px] -z-10" />
      
      <motion.div 
        className="container max-w-5xl mx-auto text-center space-y-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Tag */}
        <motion.div variants={itemVariants} className="inline-block">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
            Your complete parenthood support ecosystem
          </span>
        </motion.div>
        
        {/* Headline */}
        <motion.h1 
          variants={itemVariants}
          className="text-4xl md:text-6xl font-bold tracking-tight"
        >
          Nurturing parenthood, <br />
          <span className="text-primary">empowering families</span>
        </motion.h1>
        
        {/* Description */}
        <motion.p 
          variants={itemVariants}
          className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground"
        >
          EmpowerNest combines health tracking, parenting resources, and career support in one 
          elegant platform to help parents thrive in every aspect of their journey.
        </motion.p>
        
        {/* CTA buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button asChild size="lg" className="rounded-full font-medium">
            <Link to="/tracker">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full font-medium">
            <Link to="/Resources">
              Explore Resources
            </Link>
          </Button>
        </motion.div>
        
        {/* Feature cards */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
        >
          {[
            {
              icon: Calendar,
              title: "Cycle Tracking",
              description: "Smart period & ovulation tracker with personalized insights",
              link: "/tracker",
              color: "bg-primary/10 text-primary"
            },
            {
              icon: Heart,
              title: "Pregnancy Journey",
              description: "Comprehensive support through all stages of pregnancy",
              link: "/pregnancy",
              color: "bg-accent/15 text-accent-foreground"
            },
            {
              icon: BookOpen,
              title: "Support Resources",
              description: "Career guidance and parenting resources all in one place",
              link: "/resources",
              color: "bg-secondary text-secondary-foreground"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md"
              whileHover={{ y: -5 }}
              whileTap={{ y: 0 }}
            >
              <div className={`inline-flex p-3 rounded-xl ${feature.color}`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-medium text-xl">{feature.title}</h3>
              <p className="mt-1 text-muted-foreground">{feature.description}</p>
              <Link 
                to={feature.link}
                className="mt-4 inline-flex items-center text-sm font-medium text-primary"
              >
                Learn more
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Hero;
