"use client"

import { useState } from "react"
import { CalendarClock, CalendarDays, Droplets } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function CycleOverview() {
  // In a real app, this would come from your backend or state management
  const [cycleData] = useState({
    currentDay: 8,
    cycleLength: 28,
    periodLength: 5,
    ovulationDay: 14,
    nextPeriod: "May 22",
    fertileDays: { start: "May 8", end: "May 13" },
  })

  const cycleProgress = (cycleData.currentDay / cycleData.cycleLength) * 100

  return (
    <Card className="border-2 border-primary/10">
      <CardHeader className="pb-2">
        <CardTitle>Cycle Overview</CardTitle>
        <CardDescription>
          Day {cycleData.currentDay} of {cycleData.cycleLength}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={cycleProgress} className="h-2" />

        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex items-start gap-2">
            <div className="rounded-full p-1 bg-red-100">
              <CalendarDays className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <p className="text-sm font-medium">Next Period</p>
              <p className="text-sm text-muted-foreground">{cycleData.nextPeriod}</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <div className="rounded-full p-1 bg-purple-100">
              <Droplets className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <p className="text-sm font-medium">Ovulation</p>
              <p className="text-sm text-muted-foreground">
                {cycleData.currentDay <= cycleData.ovulationDay
                  ? `In ${cycleData.ovulationDay - cycleData.currentDay} days`
                  : "Passed"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <div className="rounded-full p-1 bg-green-100">
              <CalendarClock className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium">Fertile Window</p>
              <p className="text-sm text-muted-foreground">
                {cycleData.fertileDays.start} - {cycleData.fertileDays.end}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

