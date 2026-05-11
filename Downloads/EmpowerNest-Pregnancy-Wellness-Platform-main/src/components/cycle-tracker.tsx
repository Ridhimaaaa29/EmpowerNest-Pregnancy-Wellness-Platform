"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  addDays,
  format,
  isSameDay,
  subDays,
  differenceInDays,
  isBefore,
  isAfter,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
} from "date-fns"
import {
  AlertCircle,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Droplets,
  HeartPulse,
  Info,
  LineChart,
  Pill,
  Sparkles,
  Stethoscope,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { CycleData } from "@/components/cycle-input-form"

type CyclePhase = {
  name: string
  startDate: Date
  endDate: Date
  color: string
  description: string
  icon: React.ReactNode
}

type HealthRisk = {
  title: string
  description: string
  severity: "low" | "medium" | "high"
  recommendation: string
}

type Remedy = {
  title: string
  description: string
  category: "lifestyle" | "nutrition" | "medical" | "supplement"
  icon: React.ReactNode
}

export function CycleTracker({ cycleData }: { cycleData: CycleData }) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [cyclePhases, setCyclePhases] = useState<CyclePhase[]>([])
  const [currentPhase, setCurrentPhase] = useState<CyclePhase | null>(null)
  const [nextPeriod, setNextPeriod] = useState<Date | null>(null)
  const [daysUntilNextPeriod, setDaysUntilNextPeriod] = useState(0)
  const [cycleProgress, setCycleProgress] = useState(0)
  const [healthRisks, setHealthRisks] = useState<HealthRisk[]>([])
  const [remedies, setRemedies] = useState<Remedy[]>([])
  const [cycleAnalysis, setCycleAnalysis] = useState("")

  useEffect(() => {
    if (!cycleData.lastPeriodDate) return

    const today = new Date()

    // Calculate all the phases
    const phases: CyclePhase[] = []

    // Period phase
    const periodEndDate = addDays(cycleData.lastPeriodDate, cycleData.periodLength - 1)
    phases.push({
      name: "Menstruation",
      startDate: cycleData.lastPeriodDate,
      endDate: periodEndDate,
      color: "bg-red-500",
      description: "Your period phase when bleeding occurs",
      icon: <CalendarDays className="h-5 w-5 text-red-500" />,
    })

    // Follicular phase (after period, before ovulation)
    const ovulationDate = addDays(cycleData.lastPeriodDate, Math.floor(cycleData.cycleLength / 2) - 2)
    const follicularStartDate = addDays(periodEndDate, 1)
    const follicularEndDate = subDays(ovulationDate, 1)
    phases.push({
      name: "Follicular Phase",
      startDate: follicularStartDate,
      endDate: follicularEndDate,
      color: "bg-yellow-500",
      description: "Estrogen rises as follicles in your ovaries mature",
      icon: <Sparkles className="h-5 w-5 text-yellow-500" />,
    })

    // Ovulation phase (usually 1-2 days)
    const ovulationEndDate = addDays(ovulationDate, 1)
    phases.push({
      name: "Ovulation",
      startDate: ovulationDate,
      endDate: ovulationEndDate,
      color: "bg-purple-500",
      description: "Your most fertile days when an egg is released",
      icon: <Droplets className="h-5 w-5 text-purple-500" />,
    })

    // Luteal phase (after ovulation, before next period)
    const lutealStartDate = addDays(ovulationEndDate, 1)
    const nextPeriodDate = addDays(cycleData.lastPeriodDate, cycleData.cycleLength)
    const lutealEndDate = subDays(nextPeriodDate, 1)
    phases.push({
      name: "Luteal Phase",
      startDate: lutealStartDate,
      endDate: lutealEndDate,
      color: "bg-blue-500",
      description: "Progesterone rises to prepare for possible pregnancy",
      icon: <LineChart className="h-5 w-5 text-blue-500" />,
    })

    // Set the next period date
    setNextPeriod(nextPeriodDate)
    setDaysUntilNextPeriod(differenceInDays(nextPeriodDate, today))

    // Calculate current phase
    const currentPhase =
      phases.find(
        (phase) =>
          (isAfter(today, phase.startDate) || isSameDay(today, phase.startDate)) &&
          (isBefore(today, phase.endDate) || isSameDay(today, phase.endDate)),
      ) || null

    setCurrentPhase(currentPhase)
    setCyclePhases(phases)

    // Calculate cycle progress
    if (currentPhase) {
      const daysSinceStart = differenceInDays(today, cycleData.lastPeriodDate)
      setCycleProgress((daysSinceStart / cycleData.cycleLength) * 100)
    }

    // Analyze cycle health and provide recommendations
    analyzeCycleHealth(cycleData)
  }, [cycleData])

  const analyzeCycleHealth = (data: CycleData) => {
    const risks: HealthRisk[] = []
    const cycleRemedies: Remedy[] = []
    let analysis = ""

    // Analyze cycle length
    if (data.cycleLength < 21) {
      risks.push({
        title: "Short Cycle Length",
        description: "Your cycle is shorter than the typical range (21-35 days)",
        severity: "medium",
        recommendation: "Consider consulting with a healthcare provider to rule out hormonal imbalances",
      })
      analysis += "Your cycle length is shorter than average. "
    } else if (data.cycleLength > 35) {
      risks.push({
        title: "Long Cycle Length",
        description: "Your cycle is longer than the typical range (21-35 days)",
        severity: "medium",
        recommendation: "This could indicate conditions like PCOS or thyroid issues",
      })
      analysis += "Your cycle length is longer than average. "
    } else {
      analysis += "Your cycle length is within the normal range. "
    }

    // Analyze period length
    if (data.periodLength < 3) {
      risks.push({
        title: "Short Period Duration",
        description: "Your period lasts less than 3 days",
        severity: "low",
        recommendation: "Monitor for changes and discuss with your healthcare provider if concerned",
      })
    } else if (data.periodLength > 7) {
      risks.push({
        title: "Long Period Duration",
        description: "Your period lasts more than 7 days",
        severity: "medium",
        recommendation: "This could indicate conditions like fibroids or endometriosis",
      })
      cycleRemedies.push({
        title: "Iron-Rich Foods",
        description: "Include more iron-rich foods in your diet to prevent anemia from heavy periods",
        category: "nutrition",
        icon: <Pill className="h-5 w-5" />,
      })
    }

    // Analyze flow
    if (data.flow === "heavy") {
      risks.push({
        title: "Heavy Flow",
        description: "You've reported a heavy menstrual flow",
        severity: "medium",
        recommendation: "Monitor for signs of anemia and consider consulting a healthcare provider",
      })
      cycleRemedies.push({
        title: "Iron Supplements",
        description: "Consider iron supplements to prevent anemia (consult with a healthcare provider first)",
        category: "supplement",
        icon: <Pill className="h-5 w-5" />,
      })
    }

    // Analyze symptoms
    if (data.symptoms.includes("cramps") || data.symptoms.includes("headache")) {
      cycleRemedies.push({
        title: "Anti-Inflammatory Foods",
        description: "Incorporate anti-inflammatory foods like turmeric, ginger, and omega-3 fatty acids",
        category: "nutrition",
        icon: <Pill className="h-5 w-5" />,
      })

      cycleRemedies.push({
        title: "Heat Therapy",
        description: "Apply a heating pad to your lower abdomen to relieve menstrual cramps",
        category: "lifestyle",
        icon: <HeartPulse className="h-5 w-5" />,
      })
    }

    // Add general recommendations based on cycle regularity
    if (!data.regularCycle) {
      risks.push({
        title: "Irregular Cycles",
        description: "You've indicated that your cycles are irregular",
        severity: "medium",
        recommendation: "Track your cycle for 3-6 months to identify patterns and consult with a healthcare provider",
      })

      analysis += "Your cycles are irregular, which can sometimes make it difficult to predict your fertile window. "

      cycleRemedies.push({
        title: "Stress Management",
        description: "Practice stress-reduction techniques like meditation, yoga, or deep breathing",
        category: "lifestyle",
        icon: <HeartPulse className="h-5 w-5" />,
      })
    } else {
      analysis += "Your cycles are regular, which is a good sign of hormonal balance. "
    }

    // Add general remedies that are good for most people
    cycleRemedies.push({
      title: "Regular Exercise",
      description: "Moderate exercise can help regulate hormones and reduce menstrual symptoms",
      category: "lifestyle",
      icon: <HeartPulse className="h-5 w-5" />,
    })

    cycleRemedies.push({
      title: "Hydration",
      description: "Stay well-hydrated, especially during your period to reduce bloating and cramps",
      category: "lifestyle",
      icon: <Droplets className="h-5 w-5" />,
    })

    cycleRemedies.push({
      title: "Annual Check-up",
      description: "Schedule regular gynecological check-ups to monitor your reproductive health",
      category: "medical",
      icon: <Stethoscope className="h-5 w-5" />,
    })

    // Set the analysis summary
    if (risks.length === 0) {
      analysis +=
        "Based on the information provided, your cycle appears healthy with no significant risk factors identified."
    } else {
      analysis += `We've identified ${risks.length} potential area${risks.length > 1 ? "s" : ""} to monitor in your cycle health. These are not diagnoses but suggestions for discussion with healthcare providers.`
    }

    setHealthRisks(risks)
    setRemedies(cycleRemedies)
    setCycleAnalysis(analysis)
  }

  const nextMonth = () => {
    setCurrentMonth(addDays(currentMonth, 32))
  }

  const prevMonth = () => {
    setCurrentMonth(subDays(currentMonth, 32))
  }

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Create calendar grid with empty cells for proper alignment
  const startDay = getDay(monthStart)
  const calendarDays = Array(startDay).fill(null).concat(monthDays)

  // Function to check if a date is in a specific phase
  const getDatePhase = (date: Date) => {
    return cyclePhases.find(
      (phase) =>
        (isAfter(date, phase.startDate) || isSameDay(date, phase.startDate)) &&
        (isBefore(date, phase.endDate) || isSameDay(date, phase.endDate)),
    )
  }

  // Function to get fertile days (3 days before ovulation and ovulation day)
  const isFertileDay = (date: Date) => {
    const ovulationPhase = cyclePhases.find((phase) => phase.name === "Ovulation")
    if (!ovulationPhase) return false

    const fertileDaysStart = subDays(ovulationPhase.startDate, 3)
    return (
      (isAfter(date, fertileDaysStart) || isSameDay(date, fertileDaysStart)) &&
      (isBefore(date, ovulationPhase.endDate) || isSameDay(date, ovulationPhase.endDate))
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      <Card className="border-none shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-primary/20 to-primary/5 dark:from-primary/10 dark:to-primary/5 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Your Cycle Tracker</h2>
              <p className="text-muted-foreground">Based on your {cycleData.cycleLength}-day cycle</p>
            </div>
            <Button variant="secondary" className="self-start">
              <CalendarDays className="mr-2 h-4 w-4" />
              Edit Cycle Data
            </Button>
          </div>

          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-primary"></div>
                <span className="text-sm font-medium">
                  Cycle Day{" "}
                  {Math.min(
                    cycleData.cycleLength,
                    differenceInDays(new Date(), cycleData.lastPeriodDate || new Date()) + 1,
                  )}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">{cycleData.cycleLength} days total</span>
            </div>
            <Progress value={cycleProgress} className="h-2" />
          </div>
        </div>

        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Current Phase</h3>
                {currentPhase ? (
                  <div className="flex items-center mt-1 gap-2">
                    {currentPhase.icon}
                    <span className="font-medium">{currentPhase.name}</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Info className="h-4 w-4" />
                            <span className="sr-only">Info</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">{currentPhase.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                ) : (
                  <p className="text-muted-foreground">Loading your cycle data...</p>
                )}
              </div>

              <div>
                <h3 className="text-lg font-medium">Next Period</h3>
                {nextPeriod && (
                  <p className="mt-1">
                    <span className="font-medium">{format(nextPeriod, "MMMM d, yyyy")}</span>
                    <span className="text-muted-foreground ml-2">(in {daysUntilNextPeriod} days)</span>
                  </p>
                )}
              </div>

              <div>
                <h3 className="text-lg font-medium">Fertile Window</h3>
                {cyclePhases.length > 0 && (
                  <div className="mt-1">
                    <div className="flex items-center gap-2">
                      <Droplets className="h-5 w-5 text-green-500" />
                      <p>
                        <span className="font-medium">
                          {format(subDays(cyclePhases[2].startDate, 3), "MMMM d")} -{" "}
                          {format(cyclePhases[2].endDate, "MMMM d")}
                        </span>
                        <span className="text-muted-foreground ml-2">(5 days)</span>
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      These are your most fertile days when pregnancy is most likely
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Cycle Phases</h3>
              <div className="space-y-3">
                {cyclePhases.map((phase, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`h-4 w-4 rounded-full ${phase.color}`}></div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium">{phase.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {differenceInDays(phase.endDate, phase.startDate) + 1} days
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {format(phase.startDate, "MMM d")} - {format(phase.endDate, "MMM d")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* New Health Analysis Section */}
      <Card className="border-none shadow-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50">
          <CardTitle className="flex items-center gap-2">
            <HeartPulse className="h-5 w-5 text-primary" />
            Cycle Health Analysis
          </CardTitle>
          <CardDescription>Personalized insights and recommendations based on your cycle data</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="analysis">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
              <TabsTrigger value="risks">Health Risks</TabsTrigger>
              <TabsTrigger value="remedies">Remedies</TabsTrigger>
            </TabsList>

            <TabsContent value="analysis" className="mt-4 space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                <p className="text-sm leading-relaxed">{cycleAnalysis}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-medium mb-2">Your Cycle Profile</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Cycle Length:</span>
                      <span className="font-medium">{cycleData.cycleLength} days</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Period Length:</span>
                      <span className="font-medium">{cycleData.periodLength} days</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Flow Type:</span>
                      <span className="font-medium capitalize">{cycleData.flow}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Regularity:</span>
                      <span className="font-medium">{cycleData.regularCycle ? "Regular" : "Irregular"}</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Common Symptoms</h3>
                  {cycleData.symptoms.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {cycleData.symptoms.map((symptom) => (
                        <Badge key={symptom} variant="outline" className="capitalize">
                          {symptom.replace(/-/g, " ")}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No symptoms reported</p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm text-muted-foreground italic">
                  Note: This analysis is based on the information you've provided and general guidelines. It is not a
                  medical diagnosis. Always consult with a healthcare provider for personalized advice.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="risks" className="mt-4 space-y-4">
              {healthRisks.length > 0 ? (
                <div className="space-y-4">
                  {healthRisks.map((risk, index) => (
                    <Alert key={index} variant={risk.severity === "high" ? "destructive" : "default"}>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle className="flex items-center gap-2">
                        {risk.title}
                        <Badge
                          variant={
                            risk.severity === "high"
                              ? "destructive"
                              : risk.severity === "medium"
                                ? "default"
                                : "outline"
                          }
                        >
                          {risk.severity} risk
                        </Badge>
                      </AlertTitle>
                      <AlertDescription className="mt-2">
                        <p>{risk.description}</p>
                        <p className="mt-2 font-medium">Recommendation: {risk.recommendation}</p>
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                  <p className="text-center">
                    No significant health risks identified based on your current cycle data.
                  </p>
                </div>
              )}

              <div className="mt-4">
                <p className="text-sm text-muted-foreground italic">
                  These potential risks are not diagnoses but suggestions for monitoring and discussion with healthcare
                  providers. If you experience severe symptoms, please consult a medical professional.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="remedies" className="mt-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {remedies.map((remedy, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div
                      className={cn(
                        "p-2 flex items-center gap-2",
                        remedy.category === "lifestyle"
                          ? "bg-green-50 dark:bg-green-950/30"
                          : remedy.category === "nutrition"
                            ? "bg-blue-50 dark:bg-blue-950/30"
                            : remedy.category === "medical"
                              ? "bg-red-50 dark:bg-red-950/30"
                              : "bg-purple-50 dark:bg-purple-950/30",
                      )}
                    >
                      {remedy.icon}
                      <span className="font-medium capitalize">{remedy.category}</span>
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-medium">{remedy.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{remedy.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-6">
                <p className="text-sm text-muted-foreground italic">
                  These remedies are general recommendations. Always consult with a healthcare provider before starting
                  any new supplement or treatment regimen, especially if you have existing health conditions.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="border-none shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Calendar View</CardTitle>
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
          <CardDescription>{format(currentMonth, "MMMM yyyy")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1 text-center">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-sm font-medium py-1">
                {day}
              </div>
            ))}

            {calendarDays.map((day, i) => {
              if (!day) {
                return <div key={`empty-${i}`} className="h-12"></div>
              }

              const phase = getDatePhase(day)
              const isToday = isSameDay(day, new Date())
              const isFertile = isFertileDay(day)

              return (
                <div
                  key={day.toString()}
                  className={cn(
                    "h-12 flex flex-col items-center justify-center rounded-md relative",
                    isToday && "bg-accent font-bold",
                  )}
                >
                  <span className="text-sm">{format(day, "d")}</span>

                  {phase && <div className={cn("absolute bottom-1 h-1.5 w-1.5 rounded-full", phase.color)} />}

                  {isFertile && !phase?.name.includes("Ovulation") && (
                    <div className="absolute bottom-1 h-1.5 w-1.5 rounded-full bg-green-500" />
                  )}
                </div>
              )
            })}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <span>Period</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <span>Follicular</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-purple-500" />
              <span>Ovulation</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-blue-500" />
              <span>Luteal</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <span>Fertile</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle>Insights & Predictions</CardTitle>
          <CardDescription>
            Based on your {cycleData.cycleLength}-day cycle with {cycleData.periodLength}-day periods
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="predictions">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="predictions">Predictions</TabsTrigger>
              <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
            </TabsList>

            <TabsContent value="predictions" className="mt-4 space-y-4">
              <div className="space-y-4">
                <h3 className="font-medium">Upcoming Cycles</h3>
                {nextPeriod && (
                  <div className="space-y-3">
                    {[0, 1, 2].map((i) => {
                      const periodStart = addDays(nextPeriod, i * cycleData.cycleLength)
                      const periodEnd = addDays(periodStart, cycleData.periodLength - 1)
                      const ovulationDate = addDays(periodStart, Math.floor(cycleData.cycleLength / 2) - 2)

                      return (
                        <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-2 p-3 rounded-lg bg-muted/50">
                          <div>
                            <div className="flex items-center gap-2">
                              <CalendarDays className="h-5 w-5 text-red-500" />
                              <p className="font-medium">Period {i === 0 ? "(Next)" : i + 1}</p>
                            </div>
                            <p className="text-sm text-muted-foreground ml-7">
                              {format(periodStart, "MMMM d")} - {format(periodEnd, "MMMM d, yyyy")}
                            </p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <Droplets className="h-5 w-5 text-purple-500" />
                              <p className="font-medium">Ovulation</p>
                            </div>
                            <p className="text-sm text-muted-foreground ml-7">
                              {format(ovulationDate, "MMMM d, yyyy")}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="symptoms" className="mt-4">
              <div className="space-y-4">
                <h3 className="font-medium">Your Tracked Symptoms</h3>
                {cycleData.symptoms.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {cycleData.symptoms.map((symptom) => (
                      <div key={symptom} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        {symptom
                          .split("-")
                          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(" ")}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No symptoms tracked yet</p>
                )}

                <div className="mt-6">
                  <h3 className="font-medium mb-2">When to Expect Symptoms</h3>
                  <div className="space-y-3">
                    {cyclePhases.map((phase, index) => (
                      <div key={index} className="p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-2">
                          <div className={`h-3 w-3 rounded-full ${phase.color}`}></div>
                          <p className="font-medium">{phase.name}</p>
                        </div>
                        <div className="ml-5 mt-1">
                          <p className="text-sm">
                            {phase.name === "Menstruation" && "Cramps, fatigue, lower back pain"}
                            {phase.name === "Follicular Phase" && "Increased energy, improved mood, higher libido"}
                            {phase.name === "Ovulation" &&
                              "Slight pain on one side, increased discharge, breast tenderness"}
                            {phase.name === "Luteal Phase" && "Bloating, mood changes, food cravings, fatigue"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

