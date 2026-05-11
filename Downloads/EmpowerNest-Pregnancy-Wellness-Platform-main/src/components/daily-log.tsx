"use client"

import { useState } from "react"
import { Droplets, Frown, Heart, Meh, Save, Smile, Thermometer, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

export function DailyLog() {
  const [mood, setMood] = useState<string | null>(null)
  const [flow, setFlow] = useState<string | null>(null)
  const [symptoms, setSymptoms] = useState<string[]>([])
  const [notes, setNotes] = useState("")

  const toggleSymptom = (symptom: string) => {
    if (symptoms.includes(symptom)) {
      setSymptoms(symptoms.filter((s) => s !== symptom))
    } else {
      setSymptoms([...symptoms, symptom])
    }
  }

  const handleSave = () => {
    // In a real app, you would save this data to your backend or local storage
    console.log({ mood, flow, symptoms, notes })
    // Then redirect or show success message
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>How are you feeling today?</CardTitle>
          <CardDescription>Log your mood and symptoms for May 8, 2025</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-base">Mood</Label>
            <div className="flex justify-between mt-2">
              <Button
                variant={mood === "happy" ? "default" : "outline"}
                size="lg"
                className="flex-1 max-w-[100px]"
                onClick={() => setMood("happy")}
              >
                <Smile className="mr-2 h-5 w-5" />
                Happy
              </Button>
              <Button
                variant={mood === "neutral" ? "default" : "outline"}
                size="lg"
                className="flex-1 max-w-[100px]"
                onClick={() => setMood("neutral")}
              >
                <Meh className="mr-2 h-5 w-5" />
                Okay
              </Button>
              <Button
                variant={mood === "sad" ? "default" : "outline"}
                size="lg"
                className="flex-1 max-w-[100px]"
                onClick={() => setMood("sad")}
              >
                <Frown className="mr-2 h-5 w-5" />
                Low
              </Button>
            </div>
          </div>

          <Separator />

          <div>
            <Label className="text-base">Period Flow</Label>
            <RadioGroup value={flow || ""} onValueChange={setFlow} className="mt-2">
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="none" id="none" />
                  <Label htmlFor="none">None</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="light" />
                  <Label htmlFor="light">Light</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium">Medium</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="heavy" id="heavy" />
                  <Label htmlFor="heavy">Heavy</Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          <div>
            <Label className="text-base">Symptoms</Label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={symptoms.includes("cramps")}
                  onCheckedChange={() => toggleSymptom("cramps")}
                  id="cramps"
                />
                <Label htmlFor="cramps" className="flex items-center">
                  <Zap className="mr-2 h-4 w-4 text-yellow-500" />
                  Cramps
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={symptoms.includes("headache")}
                  onCheckedChange={() => toggleSymptom("headache")}
                  id="headache"
                />
                <Label htmlFor="headache" className="flex items-center">
                  <Zap className="mr-2 h-4 w-4 text-yellow-500" />
                  Headache
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={symptoms.includes("bloating")}
                  onCheckedChange={() => toggleSymptom("bloating")}
                  id="bloating"
                />
                <Label htmlFor="bloating" className="flex items-center">
                  <Droplets className="mr-2 h-4 w-4 text-blue-500" />
                  Bloating
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={symptoms.includes("tender_breasts")}
                  onCheckedChange={() => toggleSymptom("tender_breasts")}
                  id="tender_breasts"
                />
                <Label htmlFor="tender_breasts" className="flex items-center">
                  <Heart className="mr-2 h-4 w-4 text-red-500" />
                  Tender Breasts
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch checked={symptoms.includes("acne")} onCheckedChange={() => toggleSymptom("acne")} id="acne" />
                <Label htmlFor="acne" className="flex items-center">
                  <Droplets className="mr-2 h-4 w-4 text-blue-500" />
                  Acne
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={symptoms.includes("temperature")}
                  onCheckedChange={() => toggleSymptom("temperature")}
                  id="temperature"
                />
                <Label htmlFor="temperature" className="flex items-center">
                  <Thermometer className="mr-2 h-4 w-4 text-red-500" />
                  Temperature
                </Label>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <Label htmlFor="notes" className="text-base">
              Notes
            </Label>
            <Textarea
              id="notes"
              placeholder="Add any additional notes here..."
              className="mt-2"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave} className="w-full">
            <Save className="mr-2 h-4 w-4" />
            Save Log
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

