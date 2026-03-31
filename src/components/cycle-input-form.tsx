"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, Loader2, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { CycleTracker } from "@/components/cycle-tracker"
import { cycleService } from "@/services/api"

export type CycleData = {
  lastPeriodDate: Date | undefined
  cycleLength: number
  periodLength: number
  regularCycle: boolean
  symptoms: string[]
  flow: string
}

export function CycleInputForm() {
  const [formStep, setFormStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [cycleData, setCycleData] = useState<CycleData>({
    lastPeriodDate: undefined,
    cycleLength: 28,
    periodLength: 5,
    regularCycle: true,
    symptoms: [],
    flow: "medium",
  })

  const updateCycleData = (key: keyof CycleData, value: any) => {
    setCycleData((prev) => ({ ...prev, [key]: value }))
  }

  const toggleSymptom = (symptom: string) => {
    setCycleData((prev) => {
      const symptoms = prev.symptoms.includes(symptom)
        ? prev.symptoms.filter((s) => s !== symptom)
        : [...prev.symptoms, symptom]
      return { ...prev, symptoms }
    })
  }

  const handleNext = async () => {
    if (formStep < 2) {
      setFormStep(formStep + 1)
    } else {
      setIsLoading(true)
      setError(null)
      
      try {
        // Format the date to ISO string for the API
        const dataToSend = {
          lastPeriodDate: cycleData.lastPeriodDate?.toISOString().split('T')[0],
          cycleLength: cycleData.cycleLength,
          periodLength: cycleData.periodLength,
          regularCycle: cycleData.regularCycle,
          symptoms: cycleData.symptoms,
          flow: cycleData.flow,
        }

        // Call the backend API to save cycle data
        const response = await cycleService.createCycle(dataToSend)
        
        if (response) {
          setSuccess(true)
          setTimeout(() => {
            setFormStep(3)
            setIsLoading(false)
          }, 1000)
        }
      } catch (err: any) {
        setError(err?.message || "Failed to save cycle data. Please try again.")
        setIsLoading(false)
      }
    }
  }

  const handleBack = () => {
    setFormStep(Math.max(0, formStep - 1))
  }

  const isNextDisabled = () => {
    if (formStep === 0) {
      return !cycleData.lastPeriodDate
    }
    return false
  }

  return (
    <div className="max-w-2xl mx-auto">
      {formStep < 3 ? (
        <Card className="border border-gray-200 shadow-sm bg-transparent">

          <CardHeader>
            <CardTitle className="text-2xl">Track Your Cycle</CardTitle>
            <CardDescription>
              {formStep === 0 && "Let's start with your last period date"}
              {formStep === 1 && "Tell us about your cycle length"}
              {formStep === 2 && "Any symptoms you regularly experience?"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 flex items-center gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-red-700">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}
            
            {success && (
              <div className="mb-4 flex items-center gap-2 rounded-md border border-green-200 bg-green-50 p-3 text-green-700">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">Cycle data saved successfully!</span>
              </div>
            )}
            {formStep === 0 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="period-date">When did your last period start?</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="period-date"
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !cycleData.lastPeriodDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {cycleData.lastPeriodDate ? format(cycleData.lastPeriodDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={cycleData.lastPeriodDate}
                        onSelect={(date) => updateCycleData("lastPeriodDate", date)}
                        disabled={(date) => date > new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="period-flow">How was your flow?</Label>
                  <RadioGroup
                    id="period-flow"
                    value={cycleData.flow}
                    onValueChange={(value) => updateCycleData("flow", value)}
                    className="grid grid-cols-4 gap-2"
                  >
                    <div>
                      <RadioGroupItem value="light" id="flow-light" className="peer sr-only" />
                      <Label
                        htmlFor="flow-light"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <div className="h-4 w-4 rounded-full bg-red-300"></div>
                        <span className="mt-2">Light</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="medium" id="flow-medium" className="peer sr-only" />
                      <Label
                        htmlFor="flow-medium"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <div className="h-4 w-4 rounded-full bg-red-500"></div>
                        <span className="mt-2">Medium</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="heavy" id="flow-heavy" className="peer sr-only" />
                      <Label
                        htmlFor="flow-heavy"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <div className="h-4 w-4 rounded-full bg-red-700"></div>
                        <span className="mt-2">Heavy</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="spotting" id="flow-spotting" className="peer sr-only" />
                      <Label
                        htmlFor="flow-spotting"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <div className="h-4 w-4 rounded-full bg-red-200"></div>
                        <span className="mt-2">Spotting</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}

            {formStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cycle-length">Cycle Length (days)</Label>
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-r-none"
                        onClick={() => updateCycleData("cycleLength", Math.max(21, cycleData.cycleLength - 1))}
                      >
                        -
                      </Button>
                      <Input
                        id="cycle-length"
                        type="number"
                        min={21}
                        max={35}
                        value={cycleData.cycleLength}
                        onChange={(e) => updateCycleData("cycleLength", Number.parseInt(e.target.value) || 28)}
                        className="rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-l-none"
                        onClick={() => updateCycleData("cycleLength", Math.min(35, cycleData.cycleLength + 1))}
                      >
                        +
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">Average is 28 days</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="period-length">Period Length (days)</Label>
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-r-none"
                        onClick={() => updateCycleData("periodLength", Math.max(2, cycleData.periodLength - 1))}
                      >
                        -
                      </Button>
                      <Input
                        id="period-length"
                        type="number"
                        min={2}
                        max={10}
                        value={cycleData.periodLength}
                        onChange={(e) => updateCycleData("periodLength", Number.parseInt(e.target.value) || 5)}
                        className="rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-l-none"
                        onClick={() => updateCycleData("periodLength", Math.min(10, cycleData.periodLength + 1))}
                      >
                        +
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">Average is 5 days</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="regular-cycle">Is your cycle regular?</Label>
                    <Switch
                      id="regular-cycle"
                      checked={cycleData.regularCycle}
                      onCheckedChange={(checked) => updateCycleData("regularCycle", checked)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    A regular cycle means your period comes at approximately the same time each month
                  </p>
                </div>
              </div>
            )}

            {formStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Common symptoms you experience</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: "cramps", label: "Cramps" },
                      { id: "headache", label: "Headache" },
                      { id: "bloating", label: "Bloating" },
                      { id: "fatigue", label: "Fatigue" },
                      { id: "mood-swings", label: "Mood Swings" },
                      { id: "breast-tenderness", label: "Breast Tenderness" },
                      { id: "acne", label: "Acne" },
                      { id: "backache", label: "Backache" },
                    ].map((symptom) => (
                      <div key={symptom.id} className="flex items-center space-x-2">
                        <Switch
                          id={symptom.id}
                          checked={cycleData.symptoms.includes(symptom.id)}
                          onCheckedChange={() => toggleSymptom(symptom.id)}
                        />
                        <Label htmlFor={symptom.id}>{symptom.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {formStep > 0 ? (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            ) : (
              <div></div>
            )}
            <Button onClick={handleNext} disabled={isNextDisabled() || isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {formStep < 2 ? "Continue" : "Calculate My Cycle"}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <CycleTracker cycleData={cycleData} />
      )}
    </div>
  )
}

