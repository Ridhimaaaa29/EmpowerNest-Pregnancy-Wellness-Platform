"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertCircle, CheckCircle2, Plus, Trash2 } from "lucide-react"

type SleepEntry = {
  id: string
  date: string
  bedtime: string
  wakeTime: string
  quality: number
  notes: string
}

export default function SleepTracker() {
  const [sleepEntries, setSleepEntries] = useState<SleepEntry[]>([
    {
      id: "1",
      date: "2023-05-01",
      bedtime: "22:30",
      wakeTime: "07:15",
      quality: 4,
      notes: "Slept well, minimal disruptions",
    },
    {
      id: "2",
      date: "2023-05-02",
      bedtime: "23:00",
      wakeTime: "06:45",
      quality: 3,
      notes: "Woke up twice during the night",
    },
  ])

  const [newEntry, setNewEntry] = useState<Omit<SleepEntry, "id">>({
    date: new Date().toISOString().split("T")[0],
    bedtime: "",
    wakeTime: "",
    quality: 3,
    notes: "",
  })

  const addSleepEntry = () => {
    const entry: SleepEntry = {
      ...newEntry,
      id: Date.now().toString(),
    }

    setSleepEntries([...sleepEntries, entry])
    setNewEntry({
      date: new Date().toISOString().split("T")[0],
      bedtime: "",
      wakeTime: "",
      quality: 3,
      notes: "",
    })
  }

  const deleteSleepEntry = (id: string) => {
    setSleepEntries(sleepEntries.filter((entry) => entry.id !== id))
  }

  const calculateSleepDuration = (bedtime: string, wakeTime: string): string => {
    if (!bedtime || !wakeTime) return "N/A"

    const [bedHours, bedMinutes] = bedtime.split(":").map(Number)
    const [wakeHours, wakeMinutes] = wakeTime.split(":").map(Number)

    let hours = wakeHours - bedHours
    let minutes = wakeMinutes - bedMinutes

    if (minutes < 0) {
      minutes += 60
      hours -= 1
    }

    if (hours < 0) {
      hours += 24
    }

    return `${hours}h ${minutes}m`
  }

  const getQualityLabel = (quality: number): string => {
    switch (quality) {
      case 1:
        return "Poor"
      case 2:
        return "Fair"
      case 3:
        return "Good"
      case 4:
        return "Very Good"
      case 5:
        return "Excellent"
      default:
        return "Unknown"
    }
  }

  const getQualityColor = (quality: number): string => {
    switch (quality) {
      case 1:
        return "text-red-500"
      case 2:
        return "text-orange-500"
      case 3:
        return "text-yellow-500"
      case 4:
        return "text-green-500"
      case 5:
        return "text-emerald-500"
      default:
        return "text-slate-500"
    }
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Sleep Tracker</h3>

      <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
        <h4 className="font-medium mb-4">Add New Sleep Entry</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={newEntry.date}
              onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="bedtime">Bedtime</Label>
              <Input
                id="bedtime"
                type="time"
                value={newEntry.bedtime}
                onChange={(e) => setNewEntry({ ...newEntry, bedtime: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="wakeTime">Wake Time</Label>
              <Input
                id="wakeTime"
                type="time"
                value={newEntry.wakeTime}
                onChange={(e) => setNewEntry({ ...newEntry, wakeTime: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <Label htmlFor="quality">Sleep Quality (1-5)</Label>
          <div className="flex items-center gap-2 mt-2">
            <Input
              id="quality"
              type="range"
              min="1"
              max="5"
              value={newEntry.quality}
              onChange={(e) => setNewEntry({ ...newEntry, quality: Number.parseInt(e.target.value) })}
              className="w-full"
            />
            <span className={getQualityColor(newEntry.quality)}>{getQualityLabel(newEntry.quality)}</span>
          </div>
        </div>

        <div className="mb-4">
          <Label htmlFor="notes">Notes</Label>
          <Input
            id="notes"
            value={newEntry.notes}
            onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
            placeholder="Any sleep disruptions or other notes"
          />
        </div>

        <Button onClick={addSleepEntry} className="w-full">
          <Plus className="mr-2 h-4 w-4" /> Add Sleep Entry
        </Button>
      </div>

      <div>
        <h4 className="font-medium mb-4">Sleep History</h4>
        {sleepEntries.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Bedtime</TableHead>
                <TableHead>Wake Time</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Quality</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sleepEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>{entry.bedtime}</TableCell>
                  <TableCell>{entry.wakeTime}</TableCell>
                  <TableCell>{calculateSleepDuration(entry.bedtime, entry.wakeTime)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={entry.quality * 20} className="w-16" />
                      <span className={getQualityColor(entry.quality)}>{getQualityLabel(entry.quality)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">{entry.notes}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => deleteSleepEntry(entry.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8 text-slate-500">
            <AlertCircle className="mx-auto h-8 w-8 mb-2" />
            <p>No sleep entries yet. Add your first entry above.</p>
          </div>
        )}
      </div>

      <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Sleep Insights</h4>
        <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-4">
          <CheckCircle2 className="h-5 w-5" />
          <p>Your average sleep duration is 8h 15m, which is within the recommended range.</p>
        </div>
        <p className="text-slate-600 dark:text-slate-300 text-sm">
          Consistent sleep patterns are important during pregnancy. Try to maintain a regular sleep schedule and create
          a relaxing bedtime routine to improve sleep quality.
        </p>
      </div>
    </div>
  )
}

