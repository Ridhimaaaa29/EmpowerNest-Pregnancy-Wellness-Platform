"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  addMonths,
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  subMonths,
} from "date-fns"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type CalendarDay = {
  date: Date
  isPeriod: boolean
  isOvulation: boolean
  isFertile: boolean
  isToday: boolean
}

export function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const today = new Date()

  // In a real app, this would come from your backend or state management
  const periodDays = [1, 2, 3, 4, 5].map((day) => {
    const date = new Date(2025, 4, day) // May 2025
    return date.toISOString()
  })

  const ovulationDay = new Date(2025, 4, 14).toISOString() // May 14, 2025

  const fertileDays = [11, 12, 13, 14, 15, 16].map((day) => {
    const date = new Date(2025, 4, day) // May 2025
    return date.toISOString()
  })

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Create calendar grid with empty cells for proper alignment
  const startDay = monthStart.getDay()
  const endDay = 6 - monthEnd.getDay()

  const previousMonthDays =
    startDay > 0
      ? eachDayOfInterval({
          start: subMonths(monthStart, 1).setDate(monthStart.getDate() - startDay),
          end: subMonths(monthStart, 1),
        })
      : []

  const nextMonthDays =
    endDay > 0
      ? eachDayOfInterval({
          start: addMonths(monthEnd, 1).setDate(1),
          end: addMonths(monthEnd, 1).setDate(endDay),
        })
      : []

  const calendarDays: CalendarDay[] = [
    ...previousMonthDays.map((date) => ({
      date,
      isPeriod: false,
      isOvulation: false,
      isFertile: false,
      isToday: isSameDay(date, today),
    })),
    ...monthDays.map((date) => ({
      date,
      isPeriod: periodDays.includes(date.toISOString()),
      isOvulation: ovulationDay === date.toISOString(),
      isFertile: fertileDays.includes(date.toISOString()),
      isToday: isSameDay(date, today),
    })),
    ...nextMonthDays.map((date) => ({
      date,
      isPeriod: false,
      isOvulation: false,
      isFertile: false,
      isToday: isSameDay(date, today),
    })),
  ]

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{format(currentMonth, "MMMM yyyy")}</h2>
        <div className="flex gap-1">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous month</span>
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next month</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekdays.map((day) => (
          <div key={day} className="text-center text-sm font-medium py-2">
            {day}
          </div>
        ))}

        {calendarDays.map((day, index) => (
          <Button
            key={index}
            variant="ghost"
            className={cn(
              "h-12 w-full rounded-md p-0 font-normal relative",
              !isSameMonth(day.date, currentMonth) && "text-muted-foreground opacity-50",
              day.isToday && "bg-accent text-accent-foreground",
            )}
          >
            <time dateTime={format(day.date, "yyyy-MM-dd")}>{format(day.date, "d")}</time>
            <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-0.5">
              {day.isPeriod && <div className="h-1.5 w-1.5 rounded-full bg-red-500" />}
              {day.isOvulation && <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />}
              {day.isFertile && !day.isOvulation && <div className="h-1.5 w-1.5 rounded-full bg-green-500" />}
            </div>
          </Button>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-red-500" />
          <span>Period</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-purple-500" />
          <span>Ovulation</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-green-500" />
          <span>Fertile</span>
        </div>
      </div>
    </Card>
  )
}

