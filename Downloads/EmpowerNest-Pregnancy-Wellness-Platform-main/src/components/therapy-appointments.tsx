"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertCircle, CalendarIcon, Clock, Plus, Trash2, User } from "lucide-react"
import { format } from "date-fns"

type Appointment = {
  id: string
  date: Date
  time: string
  therapistName: string
  therapistType: string
  notes: string
}

export default function TherapyAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      date: new Date(2023, 4, 15),
      time: "10:00",
      therapistName: "Dr. Sarah Johnson",
      therapistType: "Psychologist",
      notes: "Initial consultation",
    },
  ])

  const [date, setDate] = useState<Date | undefined>(new Date())
  const [time, setTime] = useState("09:00")
  const [therapistName, setTherapistName] = useState("")
  const [therapistType, setTherapistType] = useState("Psychologist")
  const [notes, setNotes] = useState("")
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const addAppointment = () => {
    if (!date || !time || !therapistName || !therapistType) return

    const newAppointment: Appointment = {
      id: Date.now().toString(),
      date,
      time,
      therapistName,
      therapistType,
      notes,
    }

    setAppointments([...appointments, newAppointment])

    // Reset form
    setDate(new Date())
    setTime("09:00")
    setTherapistName("")
    setTherapistType("Psychologist")
    setNotes("")
  }

  const deleteAppointment = (id: string) => {
    setAppointments(appointments.filter((appointment) => appointment.id !== id))
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Therapy Appointments</h3>

      <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
        <h4 className="font-medium mb-4">Schedule New Appointment</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="date">Date</Label>
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal" id="date">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => {
                    setDate(date)
                    setIsCalendarOpen(false)
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label htmlFor="time">Time</Label>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4 text-slate-500" />
              <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="therapistName">Therapist Name</Label>
            <div className="flex items-center">
              <User className="mr-2 h-4 w-4 text-slate-500" />
              <Input
                id="therapistName"
                value={therapistName}
                onChange={(e) => setTherapistName(e.target.value)}
                placeholder="Enter therapist name"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="therapistType">Therapist Type</Label>
            <Select value={therapistType} onValueChange={setTherapistType}>
              <SelectTrigger id="therapistType">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Psychologist">Psychologist</SelectItem>
                <SelectItem value="Psychiatrist">Psychiatrist</SelectItem>
                <SelectItem value="Counselor">Counselor</SelectItem>
                <SelectItem value="Social Worker">Social Worker</SelectItem>
                <SelectItem value="Doula">Doula</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mb-4">
          <Label htmlFor="notes">Notes</Label>
          <Input
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any specific topics or concerns"
          />
        </div>

        <Button onClick={addAppointment} className="w-full">
          <Plus className="mr-2 h-4 w-4" /> Schedule Appointment
        </Button>
      </div>

      <div>
        <h4 className="font-medium mb-4">Upcoming Appointments</h4>
        {appointments.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Therapist</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{format(appointment.date, "MMM d, yyyy")}</TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell>{appointment.therapistName}</TableCell>
                  <TableCell>{appointment.therapistType}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{appointment.notes}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => deleteAppointment(appointment.id)}>
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
            <p>No appointments scheduled. Book your first appointment above.</p>
          </div>
        )}
      </div>

      <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Therapy Resources</h4>
        <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
          Regular therapy sessions can help manage stress, anxiety, and other emotional challenges during pregnancy.
          Consider scheduling appointments at least once a month or more frequently if needed.
        </p>
        <Button variant="outline" className="w-full">
          Find Pregnancy Therapists Near Me
        </Button>
      </div>
    </div>
  )
}

