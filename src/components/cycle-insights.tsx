"use client"

import { useState } from "react"
import { Calendar, LineChart, Ruler, Thermometer } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function CycleInsights() {
  // In a real app, this would come from your backend or state management
  const [cycleStats] = useState({
    averageCycleLength: 28,
    averagePeriodLength: 5,
    shortestCycle: 26,
    longestCycle: 30,
    averageTemperature: 97.8,
    commonSymptoms: ["Cramps", "Headache", "Bloating"],
  })

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Cycle Insights</CardTitle>
          <CardDescription>Understand your patterns and trends based on your logged data</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="summary">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="predictions">Predictions</TabsTrigger>
            </TabsList>

            <TabsContent value="summary" className="mt-4 space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Average Cycle Length</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <span className="text-2xl font-bold">{cycleStats.averageCycleLength}</span>
                    <span className="text-muted-foreground">days</span>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Average Period Length</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center gap-2">
                    <Ruler className="h-5 w-5 text-muted-foreground" />
                    <span className="text-2xl font-bold">{cycleStats.averagePeriodLength}</span>
                    <span className="text-muted-foreground">days</span>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Average Temperature</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center gap-2">
                    <Thermometer className="h-5 w-5 text-muted-foreground" />
                    <span className="text-2xl font-bold">{cycleStats.averageTemperature}</span>
                    <span className="text-muted-foreground">°F</span>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Cycle Length Range</CardTitle>
                  <CardDescription>
                    Your cycle length varies between {cycleStats.shortestCycle} and {cycleStats.longestCycle} days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{
                        width: `${((cycleStats.averageCycleLength - cycleStats.shortestCycle) / (cycleStats.longestCycle - cycleStats.shortestCycle)) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                    <span>{cycleStats.shortestCycle} days</span>
                    <span>{cycleStats.longestCycle} days</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Common Symptoms</CardTitle>
                  <CardDescription>Your most frequently logged symptoms</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {cycleStats.commonSymptoms.map((symptom) => (
                      <div key={symptom} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        {symptom}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trends" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Cycle Length Trends</CardTitle>
                  <CardDescription>How your cycle length has changed over time</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <LineChart className="h-10 w-10" />
                    <p>Cycle length trend visualization would appear here</p>
                    <p className="text-sm">Track more cycles to see your trends</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="predictions" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Future Predictions</CardTitle>
                  <CardDescription>Predicted dates for your next 3 cycles</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">Next Period</p>
                        <p className="text-sm text-muted-foreground">Predicted start date</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">May 22, 2025</p>
                        <p className="text-sm text-muted-foreground">In 14 days</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">Following Period</p>
                        <p className="text-sm text-muted-foreground">Predicted start date</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">June 19, 2025</p>
                        <p className="text-sm text-muted-foreground">In 42 days</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">Third Period</p>
                        <p className="text-sm text-muted-foreground">Predicted start date</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">July 17, 2025</p>
                        <p className="text-sm text-muted-foreground">In 70 days</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

