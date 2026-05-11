
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  link?: string;
  className?: string;
}

export function FeatureCard({ 
  title, 
  description, 
  icon: Icon,
  iconColor = "text-primary bg-primary/10",
  link,
  className 
}: FeatureCardProps) {
  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (link) {
      return (
        <Link to={link} className={cn("block", className)}>
          {children}
        </Link>
      );
    }
    return <div className={className}>{children}</div>;
  };

  return (
    <CardWrapper>
      <motion.div
        whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
        className="h-full relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md"
      >
        <div className={cn("inline-flex p-3 rounded-xl", iconColor)}>
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="mt-4 font-medium text-xl">{title}</h3>
        <p className="mt-1 text-muted-foreground">{description}</p>
        
        {link && (
          <div className="mt-4 inline-flex items-center text-sm font-medium text-primary">
            Learn more
            <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </motion.div>
    </CardWrapper>
  );
}

export default FeatureCard;
