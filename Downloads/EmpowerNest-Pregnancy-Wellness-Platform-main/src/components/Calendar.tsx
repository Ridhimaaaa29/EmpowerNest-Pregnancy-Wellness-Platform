import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, 
         eachDayOfInterval, isSameMonth, isSameDay, isToday,
         getDay, addDays } from 'date-fns';

interface CalendarProps {
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  markedDates?: {
    date: Date;
    type: string; // Changed from specific string literals to string to be more flexible
    intensity?: string; // Changed from specific string literals to string
  }[];
  className?: string;
}

export function Calendar({ 
  selectedDate, 
  onDateSelect, 
  markedDates = [], 
  className 
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(selectedDate);
  
  useEffect(() => {
    if (selectedDate) {
      setSelectedDay(selectedDate);
      setCurrentMonth(selectedDate);
    }
  }, [selectedDate]);

  const handleDateSelect = (day: Date) => {
    setSelectedDay(day);
    if (onDateSelect) {
      onDateSelect(day);
    }
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const previousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  // Get days in month
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Get day of week for first day (0 = Sunday, 1 = Monday, etc.)
  const startDay = getDay(monthStart);
  
  // Generate blank days for the start of the month
  const blankDaysAtStart = Array.from({ length: startDay }, (_, i) => 
    addDays(monthStart, -(startDay - i))
  );
  
  // Calculate how many days to add at the end to make complete weeks
  const daysNeededAtEnd = (7 - ((daysInMonth.length + startDay) % 7)) % 7;
  const blankDaysAtEnd = Array.from({ length: daysNeededAtEnd }, (_, i) => 
    addDays(monthEnd, i + 1)
  );
  
  // Combine all days
  const calendarDays = [...blankDaysAtStart, ...daysInMonth, ...blankDaysAtEnd];
  
  // Helper to get mark type for a given date
  const getMarkForDate = (date: Date) => {
    return markedDates.find(mark => isSameDay(mark.date, date));
  };

  return (
    <div className={cn("p-4 bg-card rounded-xl border", className)}>
      <div className="flex items-center justify-between mb-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={previousMonth}
          className="p-2 rounded-full hover:bg-muted transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </motion.button>
        
        <h2 className="text-xl font-medium">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextMonth}
          className="p-2 rounded-full hover:bg-muted transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </motion.button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-muted-foreground py-1">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        <AnimatePresence mode="wait">
          {calendarDays.map((day, index) => {
            const isSelected = selectedDay ? isSameDay(day, selectedDay) : false;
            const isCurrentMonth = isSameMonth(day, currentMonth);
            const isTodayDate = isToday(day);
            const mark = getMarkForDate(day);
            
            return (
              <motion.button
                key={day.toISOString()}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2, delay: index * 0.01 }}
                className={cn(
                  "aspect-square flex flex-col items-center justify-center rounded-full relative",
                  isSelected ? "bg-primary text-primary-foreground" : "",
                  !isSelected && isTodayDate ? "border border-primary/50" : "",
                  !isSelected && !isCurrentMonth ? "text-muted-foreground/50" : "",
                  !isSelected && isCurrentMonth && !isTodayDate ? "hover:bg-muted" : "",
                )}
                onClick={() => handleDateSelect(day)}
              >
                <span className={cn(
                  "text-sm",
                  isSelected ? "font-medium" : ""
                )}>
                  {format(day, 'd')}
                </span>
                
                {/* Date markers */}
                {mark && isCurrentMonth && (
                  <div className={cn(
                    "h-1.5 w-1.5 absolute -bottom-0.5 rounded-full",
                    mark.type === 'period' && "bg-accent",
                    mark.type === 'fertile' && "bg-primary/70",
                    mark.type === 'ovulation' && "bg-primary",
                    mark.type === 'predicted' && "bg-primary/30",
                  )} />
                )}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>
      
      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-full bg-accent" />
          <span>Period</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-full bg-primary/70" />
          <span>Fertile Window</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-full bg-primary" />
          <span>Ovulation</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-full bg-primary/30" />
          <span>Predicted</span>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
