
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import PageTransition from '@/components/PageTransition';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Baby, 
  Users, 
  Briefcase, 
  Calendar, 
  BookOpen,
  Award,
  CheckCircle
} from 'lucide-react';

const AboutPage = () => {
  return (
    <PageTransition>
      <Navigation />
      
      <main className="container max-w-6xl pt-24 pb-16 px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">About EmpowerNest</h1>
          <p className="text-muted-foreground text-lg">
            Our mission is to support parents through every stage of their journey
          </p>
        </div>
        
        {/* Mission section */}
        <section className="mb-16">
          <div className="bg-card rounded-xl border p-8 shadow-sm">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-2/3">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4">Our Mission</h2>
                <p className="text-muted-foreground mb-4">
                  At EmpowerNest, we believe that parenthood should be a journey of joy and growth, not isolation 
                  and sacrifice. We've created a holistic platform that addresses the unique needs of parents 
                  in today's world, combining health tracking, parenting resources, and career support.
                </p>
                <p className="text-muted-foreground mb-6">
                  Our goal is to empower parents to thrive in all aspects of their lives, making parenthood 
                  more manageable, connected, and fulfilling.
                </p>
                <div className="flex gap-4">
                  <Button asChild size="lg" className="rounded-full">
                    <Link to="/tracker">Get Started</Link>
                  </Button>
                </div>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="w-40 h-40 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="h-16 w-16 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Values section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Heart,
                title: "Compassion",
                description: "We approach every feature and interaction with empathy, understanding the diverse challenges parents face."
              },
              {
                icon: Award,
                title: "Excellence",
                description: "We strive for the highest quality in our tools, resources, and community support systems."
              },
              {
                icon: Users,
                title: "Inclusivity",
                description: "We design for all types of families, embracing diversity in parenting styles and family structures."
              },
              {
                icon: CheckCircle,
                title: "Empowerment",
                description: "We provide the tools and knowledge that help parents make confident, informed decisions."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl border p-6 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Features overview section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Calendar,
                title: "Period Tracker",
                description: "Track your menstrual cycles, ovulation, and fertility windows with personalized insights.",
                link: "/tracker"
              },
              {
                icon: Heart,
                title: "Pregnancy Journey",
                description: "Navigate your pregnancy with trimester-specific guidance, health tracking, and preparation tools.",
                link: "/pregnancy"
              },
              {
                icon: BookOpen,
                title: "Resources",
                description: "Access curated resources for parenting support, work-life balance, and personal well-being.",
                link: "/resources"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl border p-6 shadow-sm"
              >
                <div className="p-3 rounded-lg bg-primary/10 inline-block mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <Button asChild variant="outline" size="sm">
                  <Link to={feature.link}>Explore</Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Team section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                name: "Emma Rodriguez",
                role: "Founder & CEO",
                bio: "Former healthcare executive with a passion for women's health and work equity."
              },
              {
                name: "Michael Chen",
                role: "Head of Product",
                bio: "Product leader focused on building intuitive tools for families."
              },
              {
                name: "Sophia Kim",
                role: "Chief Medical Advisor",
                bio: "OB-GYN with 15 years of experience in reproductive health."
              },
              {
                name: "James Wilson",
                role: "Community Director",
                bio: "Building supportive spaces for parents to connect and learn together."
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl border p-6 shadow-sm text-center"
              >
                <div className="w-24 h-24 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">{member.name}</h3>
                <p className="text-primary text-sm mb-2">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Contact section */}
        <section>
          <div className="bg-card rounded-xl border p-8 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Get in Touch</h2>
            <p className="text-muted-foreground mb-6">
              Have questions or feedback? We'd love to hear from you. Contact our team or follow us on social media.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full">Contact Us</Button>
              <Button variant="outline" size="lg" className="rounded-full">Follow @EmpowerNest</Button>
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
};

export default AboutPage;
