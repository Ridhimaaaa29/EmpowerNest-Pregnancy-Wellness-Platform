"use client";

import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";

interface RecoveryEntry {
  date: Date;
  mood: string;
  painLevel: number;
  bleeding: string;
  notes: string;
}

interface AppointmentEntry {
  date: Date;
  type: string;
  doctor: string;
  notes: string;
}

interface RecoveryTabProps {
  babyData: {
    postpartumRecovery: RecoveryEntry[];
    appointments: AppointmentEntry[];
  };
  newRecovery: RecoveryEntry;
  setNewRecovery: (recovery: RecoveryEntry) => void;
  addRecovery: () => void;
  newAppointment: AppointmentEntry;
  setNewAppointment: (appointment: AppointmentEntry) => void;
  addAppointment: () => void;
}

export function RecoveryTab({
  babyData,
  newRecovery,
  setNewRecovery,
  addRecovery,
  newAppointment,
  setNewAppointment,
  addAppointment,
}: RecoveryTabProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Postpartum Recovery Card */}
        <Card>
          <CardHeader>
            <CardTitle>Postpartum Recovery</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {babyData.postpartumRecovery
                .slice()
                .reverse()
                .map((entry, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">{format(entry.date, "MMMM d, yyyy")}</span>
                      <Badge variant={entry.mood === "Good" ? "outline" : "secondary"}>Mood: {entry.mood}</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-medium">Pain Level: </span>
                        {entry.painLevel}/5
                      </div>
                      <div>
                        <span className="font-medium">Bleeding: </span>
                        {entry.bleeding}
                      </div>
                      {entry.notes && (
                        <div className="col-span-2 mt-2">
                          <span className="font-medium">Notes: </span>
                          {entry.notes}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

              {/* Add Recovery Entry Form */}
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {newRecovery.date ? format(newRecovery.date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={newRecovery.date}
                          onSelect={(date) => date && setNewRecovery({ ...newRecovery, date })}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mood">Mood</Label>
                    <Select
                      value={newRecovery.mood}
                      onValueChange={(value) => setNewRecovery({ ...newRecovery, mood: value })}
                    >
                      <SelectTrigger id="mood">
                        <SelectValue placeholder="Select mood" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Good">Good</SelectItem>
                        <SelectItem value="Okay">Okay</SelectItem>
                        <SelectItem value="Tired">Tired</SelectItem>
                        <SelectItem value="Sad">Sad</SelectItem>
                        <SelectItem value="Anxious">Anxious</SelectItem>
                        <SelectItem value="Overwhelmed">Overwhelmed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pain-level">Pain Level (1-5)</Label>
                    <Select
                      value={newRecovery.painLevel.toString()}
                      onValueChange={(value) => setNewRecovery({ ...newRecovery, painLevel: Number.parseInt(value) })}
                    >
                      <SelectTrigger id="pain-level">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 - Minimal</SelectItem>
                        <SelectItem value="2">2 - Mild</SelectItem>
                        <SelectItem value="3">3 - Moderate</SelectItem>
                        <SelectItem value="4">4 - Severe</SelectItem>
                        <SelectItem value="5">5 - Very Severe</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bleeding">Bleeding</Label>
                    <Select
                      value={newRecovery.bleeding}
                      onValueChange={(value) => setNewRecovery({ ...newRecovery, bleeding: value })}
                    >
                      <SelectTrigger id="bleeding">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="None">None</SelectItem>
                        <SelectItem value="Light">Light</SelectItem>
                        <SelectItem value="Moderate">Moderate</SelectItem>
                        <SelectItem value="Heavy">Heavy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recovery-notes">Notes</Label>
                  <Textarea
                    id="recovery-notes"
                    placeholder="How are you feeling today?"
                    value={newRecovery.notes}
                    onChange={(e) => setNewRecovery({ ...newRecovery, notes: e.target.value })}
                  />
                </div>

                <Button onClick={addRecovery} className="w-full">
                  Add Recovery Entry
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appointments Card */}
        <Card>
          <CardHeader>
            <CardTitle>Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {babyData.appointments
                .slice()
                .sort((a, b) => a.date.getTime() - b.date.getTime())
                .map((appointment, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{appointment.type}</h4>
                      <Badge variant={new Date() > appointment.date ? "secondary" : "outline"}>
                        {format(appointment.date, "MMM d, yyyy")}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 gap-2 text-sm">
                      <div>
                        <span className="font-medium">Doctor: </span>
                        {appointment.doctor}
                      </div>
                      {appointment.notes && (
                        <div>
                          <span className="font-medium">Notes: </span>
                          {appointment.notes}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

              {/* Add Appointment Form */}
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {newAppointment.date ? format(newAppointment.date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={newAppointment.date}
                          onSelect={(date) => date && setNewAppointment({ ...newAppointment, date })}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="appointment-type">Type</Label>
                    <Input
                      id="appointment-type"
                      placeholder="Pediatrician, Postpartum checkup, etc."
                      value={newAppointment.type}
                      onChange={(e) => setNewAppointment({ ...newAppointment, type: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="doctor">Doctor</Label>
                  <Input
                    id="doctor"
                    placeholder="Doctor's name"
                    value={newAppointment.doctor}
                    onChange={(e) => setNewAppointment({ ...newAppointment, doctor: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="appointment-notes">Notes</Label>
                  <Textarea
                    id="appointment-notes"
                    placeholder="Any special instructions or reminders"
                    value={newAppointment.notes}
                    onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                  />
                </div>

                <Button onClick={addAppointment} className="w-full">
                  Add Appointment
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}