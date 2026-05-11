"use client"

import { useState } from "react"
import { CalendarDays, Droplets } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function UpcomingEvents() {
  // In a real app, this would come from your backend or state management
  const [events] = useState([
    {
      id: 1,
      type: "period",
      title: "Period starts",
      date: "May 22",
      daysAway: 14,
      icon: <CalendarDays className="h-5 w-5 text-red-500" />,
      bgColor: "bg-red-50",
    },
    {
      id: 2,
      type: "ovulation",
      title: "Ovulation day",
      date: "May 8",
      daysAway: 0,
      icon: <Droplets className="h-5 w-5 text-purple-500" />,
      bgColor: "bg-purple-50",
    },
    {
      id: 3,
      type: "fertile",
      title: "Fertile window ends",
      date: "May 13",
      daysAway: 5,
      icon: <Droplets className="h-5 w-5 text-green-500" />,
      bgColor: "bg-green-50",
    },
  ])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
        <CardDescription>Your cycle forecast</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className={`flex items-center gap-4 rounded-lg p-3 ${event.bgColor}`}>
              <div className="rounded-full bg-white p-1">{event.icon}</div>
              <div className="flex-1">
                <p className="font-medium">{event.title}</p>
                <p className="text-sm text-muted-foreground">{event.date}</p>
              </div>
              <div className="text-sm font-medium">
                {event.daysAway === 0 ? (
                  <span className="text-primary">Today</span>
                ) : (
                  <span>In {event.daysAway} days</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

