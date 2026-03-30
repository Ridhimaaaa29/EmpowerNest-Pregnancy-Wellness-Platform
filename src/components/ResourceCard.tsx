
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArrowRight, LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ResourceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  category?: string;
  color?: string;
  url?: string;
  className?: string;
}

export function ResourceCard({
  title,
  description,
  icon: Icon,
  category,
  color = "bg-primary/10 text-primary",
  url,
  className,
}: ResourceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={cn(
        "p-6 rounded-xl border bg-card shadow-sm hover:shadow-md transition-all overflow-hidden relative",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className={cn("p-3 rounded-xl", color)}>
          <Icon className="h-5 w-5" />
        </div>
        
        <div className="flex-1">
          {category && (
            <p className="text-xs font-medium text-muted-foreground mb-1">
              {category}
            </p>
          )}
          
          <h3 className="font-medium text-lg">{title}</h3>
          <p className="mt-1 text-muted-foreground text-sm line-clamp-2">{description}</p>
          
          {url && (
            <Button 
              variant="ghost" 
              size="sm" 
              asChild 
              className="mt-4 p-0 h-auto text-primary hover:text-primary/80 hover:bg-transparent"
            >
              <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                Learn more
                <ArrowRight className="h-3 w-3" />
              </a>
            </Button>
          )}
        </div>
      </div>
      
      {/* Decorative corner shape */}
      <div className={cn(
        "absolute -right-10 -bottom-10 w-20 h-20 rounded-full opacity-10",
        color.split(" ")[0]
      )} />
    </motion.div>
  );
}

export default ResourceCard;
