"use client";

import { RecoveryTab } from "../components/RecoveryTab";
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";

export default function RecoveryPage() {
  // Load data from localStorage on component mount
  const loadData = (key: string, defaultValue: any) => {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : defaultValue;
  };

  // Save data to localStorage whenever it changes
  const saveData = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const [babyData, setBabyData] = useState({
    postpartumRecovery: loadData("postpartumRecovery", []),
    appointments: loadData("appointments", []),
  });

  const [newRecovery, setNewRecovery] = useState({
    date: new Date(),
    mood: "",
    painLevel: 1,
    bleeding: "",
    notes: "",
  });

  const [newAppointment, setNewAppointment] = useState({
    date: new Date(),
    type: "",
    doctor: "",
    notes: "",
  });

  // Save babyData to localStorage whenever it changes
  useEffect(() => {
    saveData("postpartumRecovery", babyData.postpartumRecovery);
    saveData("appointments", babyData.appointments);
  }, [babyData]);

  const addRecovery = () => {
    setBabyData((prev) => ({
      ...prev,
      postpartumRecovery: [...prev.postpartumRecovery, newRecovery],
    }));
    setNewRecovery({
      date: new Date(),
      mood: "",
      painLevel: 1,
      bleeding: "",
      notes: "",
    });
  };

  const addAppointment = () => {
    setBabyData((prev) => ({
      ...prev,
      appointments: [...prev.appointments, newAppointment],
    }));
    setNewAppointment({
      date: new Date(),
      type: "",
      doctor: "",
      notes: "",
    });
  };

  return (
    <div className="container mx-auto p-4">
      <Navigation />
      <br />
      <br />
      <h1 className="text-2xl font-bold mb-6"></h1>
      <RecoveryTab
        babyData={babyData}
        newRecovery={newRecovery}
        setNewRecovery={setNewRecovery}
        addRecovery={addRecovery}
        newAppointment={newAppointment}
        setNewAppointment={setNewAppointment}
        addAppointment={addAppointment}
      />
    </div>
  );
}