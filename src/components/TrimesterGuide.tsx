
import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  Heart, 
  Baby, 
  Apple, 
  Bed, 
  Pill, 
  Weight,
  Activity,
  CalendarDays,
  Utensils,
  ArrowRight,
} from 'lucide-react';
import { Button } from "@/components/ui/button";

interface TrimesterGuideProps {
  className?: string;
}

type Trimester = 'first' | 'second' | 'third';

const trimesters: Record<Trimester, {
  title: string;
  weeks: string;
  description: string;
  icon: React.ElementType;
  tips: {
    icon: React.ElementType;
    title: string;
    description: string;
  }[];
  color: string;
}> = {
  first: {
    title: "First Trimester",
    weeks: "Weeks 1-12",
    description: "The first trimester is crucial for your baby's development. The brain, spinal cord, heart, and other organs begin to form.",
    icon: Heart,
    color: "from-rose-100 to-rose-50 border-rose-200/50 text-rose-700",
    tips: [
      {
        icon: Pill,
        title: "Take prenatal vitamins",
        description: "Folic acid is especially important during this time."
      },
      {
        icon: Bed,
        title: "Rest adequately",
        description: "Fatigue is common - listen to your body and rest when needed."
      },
      {
        icon: Utensils,
        title: "Manage morning sickness",
        description: "Eat small, frequent meals and stay hydrated."
      }
    ]
  },
  second: {
    title: "Second Trimester",
    weeks: "Weeks 13-26",
    description: "Often called the 'golden period' of pregnancy, the second trimester is typically when you'll have more energy and less nausea.",
    icon: Baby,
    color: "from-blue-100 to-blue-50 border-blue-200/50 text-blue-700",
    tips: [
      {
        icon: Activity,
        title: "Stay active",
        description: "Regular, moderate exercise is beneficial for both you and baby."
      },
      {
        icon: CalendarDays,
        title: "Plan for childbirth",
        description: "Explore birth options and classes during this period."
      },
      {
        icon: Weight,
        title: "Monitor weight gain",
        description: "Aim for healthy, gradual weight gain as recommended by your doctor."
      }
    ]
  },
  third: {
    title: "Third Trimester",
    weeks: "Weeks 27-40",
    description: "Your baby is growing rapidly and gaining weight. You'll likely feel more tired and experience new discomforts as your body prepares for birth.",
    icon: Apple,
    color: "from-violet-100 to-violet-50 border-violet-200/50 text-violet-700",
    tips: [
      {
        icon: Bed,
        title: "Sleep positioning",
        description: "Sleep on your side, preferably the left, for optimal blood flow."
      },
      {
        icon: Weight,
        title: "Prepare for labor",
        description: "Practice relaxation techniques and finalize your birth plan."
      },
      {
        icon: CalendarDays,
        title: "Monitor movements",
        description: "Keep track of your baby's movements and report changes to your doctor."
      }
    ]
  }
};

export function TrimesterGuide({ className }: TrimesterGuideProps) {
  const [activeTrimester, setActiveTrimester] = useState<Trimester>('first');
  
  const trimesterData = trimesters[activeTrimester];

  return (
    <div className={cn("p-6 rounded-2xl border bg-card", className)}>
      <h3 className="text-2xl font-medium mb-6">Pregnancy Journey</h3>
      
      {/* Trimester selector */}
      <div className="flex gap-2 mb-8">
        {(Object.keys(trimesters) as Trimester[]).map((key) => {
          const isActive = activeTrimester === key;
          const trimester = trimesters[key];
          
          return (
            <button
              key={key}
              onClick={() => setActiveTrimester(key)}
              className={cn(
                "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all",
                isActive 
                  ? `bg-gradient-to-r ${trimester.color}`
                  : "bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {trimester.title}
            </button>
          );
        })}
      </div>
      
      {/* Trimester content */}
      <motion.div
        key={activeTrimester}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <div className="flex gap-4 items-start">
          <div className={cn(
            "p-3 rounded-xl shrink-0",
            `bg-gradient-to-br ${trimesterData.color} bg-opacity-50`
          )}>
            <trimesterData.icon className="h-6 w-6" />
          </div>
          
          <div>
            <h4 className="text-xl font-medium">{trimesterData.title}</h4>
            <p className="text-sm text-muted-foreground">{trimesterData.weeks}</p>
            <p className="mt-2">{trimesterData.description}</p>
          </div>
        </div>
        
        {/* Tips section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {trimesterData.tips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-xl border bg-card/50 hover:bg-card/80 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className={cn(
                  "p-2 rounded-lg",
                  `bg-gradient-to-br ${trimesterData.color} bg-opacity-30`
                )}>
                  <tip.icon className="h-4 w-4" />
                </div>
                <div>
                  <h5 className="font-medium">{tip.title}</h5>
                  <p className="text-sm text-muted-foreground mt-1">{tip.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="flex justify-end mt-6">
          <Button variant="outline" size="sm" className="text-sm flex items-center gap-1">
            Learn more
            <ArrowRight className="h-3 w-3" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export default TrimesterGuide;
