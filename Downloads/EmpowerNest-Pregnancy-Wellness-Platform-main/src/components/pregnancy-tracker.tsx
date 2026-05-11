"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { pregnancyService } from "@/services/api";

// Risk assessment logic
const predictHealthRisk = (userData: any) => {
  let riskScore = 0;

  // Age factor
  if (userData.age > 35) riskScore += 2;
  else if (userData.age < 20) riskScore += 1;

  // Pregnancy stage factor
  if (userData.pregnancyStage === "2") riskScore += 1;

  // Health data factor
  if (userData.bloodPressure === "high") riskScore += 2;
  if (userData.glucoseLevel === "high") riskScore += 2;

  // Medical history factors
  if (userData.previousComplications && userData.previousComplications.length > 0) {
    riskScore += userData.previousComplications.length;
  }

  if (userData.chronicIllnesses && userData.chronicIllnesses.length > 0) {
    riskScore += userData.chronicIllnesses.length;
  }

  // Lifestyle factors
  if (userData.lifestyle) {
    if (userData.lifestyle.includes("Smoking")) riskScore += 3;
    if (userData.lifestyle.includes("Alcohol")) riskScore += 3;
    if (userData.lifestyle.includes("Sedentary")) riskScore += 1;
    if (userData.lifestyle.includes("Poor Diet")) riskScore += 1;
    if (userData.lifestyle.includes("High Caffeine")) riskScore += 1;
  }

  // Psychological factors
  if (userData.stressLevel === "high") riskScore += 2;
  else if (userData.stressLevel === "moderate") riskScore += 1;

  if (userData.mentalHealth && userData.mentalHealth.includes("Depression")) riskScore += 2;
  if (userData.mentalHealth && userData.mentalHealth.includes("Anxiety")) riskScore += 1;

  // Environmental factors
  if (userData.environmentalRisks && userData.environmentalRisks.length > 0) {
    riskScore += userData.environmentalRisks.length;
  }

  // Symptoms factor
  const highRiskSymptoms = [
    "Swelling",
    "Back Pain",
    "Heartburn",
    "Severe Headaches",
    "Vision Changes",
    "Vaginal Bleeding",
    "Reduced Fetal Movement",
  ];
  if (userData.symptoms) {
    userData.symptoms.forEach((symptom: string) => {
      if (highRiskSymptoms.includes(symptom)) riskScore += 1;
    });
  }

  return riskScore > 5 ? "High Risk" : riskScore > 3 ? "Moderate Risk" : "Low Risk";
};

// Medical advice based on risk level
const getMedicalAdvice = (risk: string) => {
  switch (risk) {
    case "High Risk":
      return {
        advice: [
          "Consult your healthcare provider immediately for a detailed evaluation.",
          "Monitor your blood pressure and glucose levels daily.",
          "Avoid strenuous activities and get plenty of rest.",
          "Follow a balanced diet and avoid high-sodium or high-sugar foods.",
          "Attend all prenatal appointments and follow your doctor's recommendations.",
        ],
      };
    case "Moderate Risk":
      return {
        advice: [
          "Schedule a consultation with your healthcare provider to discuss your risk factors.",
          "Maintain a healthy lifestyle with regular exercise and a balanced diet.",
          "Monitor your symptoms and report any unusual changes to your doctor.",
          "Avoid smoking, alcohol, and excessive caffeine.",
          "Practice stress management techniques like meditation or yoga.",
        ],
      };
    case "Low Risk":
      return {
        advice: [
          "Continue with regular prenatal check-ups and follow your doctor's advice.",
          "Maintain a healthy diet rich in fruits, vegetables, and whole grains.",
          "Stay active with moderate exercise like walking or prenatal yoga.",
          "Get adequate rest and stay hydrated.",
          "Avoid smoking, alcohol, and excessive caffeine.",
        ],
      };
    default:
      return { advice: [] };
  }
};

export default function PregnancyTracker() {
  const [formData, setFormData] = useState({
    age: "",
    pregnancyStage: "",
    symptoms: [] as string[],
    bloodPressure: "",
    glucoseLevel: "",
    fetalDevelopment: "",
    previousComplications: [] as string[],
    chronicIllnesses: [] as string[],
    lifestyle: [] as string[],
    stressLevel: "",
    mentalHealth: [] as string[],
    environmentalRisks: [] as string[],
  });

  const [result, setResult] = useState<string | null>(null);
  const [riskHistory, setRiskHistory] = useState<{ date: string; risk: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dueDate, setDueDate] = useState("");

  // Load risk history from backend on component mount
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const entries = await pregnancyService.getAllEntries();
        if (entries && Array.isArray(entries)) {
          setRiskHistory(entries.map((entry: any) => ({
            date: entry.dueDate?.split('T')[0] || new Date().toLocaleDateString(),
            risk: entry.riskAssessment || "Low Risk",
          })));
        }
      } catch (err) {
        console.error("Failed to load pregnancy history:", err);
        // Fall back to empty history if API fails
      }
    };
    fetchHistory();
  }, []);

  const handleSymptomChange = (symptom: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      symptoms: checked ? [...prev.symptoms, symptom] : prev.symptoms.filter((s) => s !== symptom),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const risk = predictHealthRisk({
        ...formData,
        age: Number.parseInt(formData.age),
      });

      setResult(risk);

      // Prepare data for backend
      const pregnancyData = {
        dueDate: dueDate || new Date().toISOString().split('T')[0],
        weight: formData.bloodPressure ? parseInt(formData.bloodPressure) : undefined,
        bloodPressure: formData.bloodPressure,
        notes: `Risk Assessment: ${risk}. Age: ${formData.age}, Stage: ${formData.pregnancyStage}`,
      };

      // Save to backend
      const response = await pregnancyService.createEntry(pregnancyData);
      
      if (response) {
        // Add the new risk assessment to the history
        setRiskHistory((prev) => [
          ...prev,
          {
            date: new Date().toLocaleDateString(),
            risk,
          },
        ]);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to save pregnancy assessment");
      console.error("Error saving pregnancy assessment:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Prepare data for the bar chart
  const chartData = riskHistory.map((entry) => ({
    date: entry.date,
    risk: entry.risk === "High Risk" ? 3 : entry.risk === "Moderate Risk" ? 2 : 1,
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Pregnancy Health Risk Assessment</CardTitle>
        <CardDescription>
          Enter your details to get a personalized health risk assessment for your pregnancy
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-md bg-red-50 p-4 border border-red-200 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-red-800">{error}</span>
            </div>
          )}

          {/* Due Date for Backend */}
          <div className="space-y-2">
            <Label htmlFor="due-date">Expected Due Date (for backend tracking)</Label>
            <Input
              id="due-date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          {/* Age */}
          <div className="space-y-2">
            <Label htmlFor="age">Your Age</Label>
            <Input
              id="age"
              type="number"
              placeholder="Enter your age"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              required
            />
          </div>

          {/* Pregnancy Stage */}
          <div className="space-y-2">
            <Label htmlFor="pregnancy-stage">Pregnancy Stage</Label>
            <Select
              value={formData.pregnancyStage}
              onValueChange={(value) => setFormData({ ...formData, pregnancyStage: value })}
              required
            >
              <SelectTrigger id="pregnancy-stage">
                <SelectValue placeholder="Select trimester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">First Trimester</SelectItem>
                <SelectItem value="1">Second Trimester</SelectItem>
                <SelectItem value="2">Third Trimester</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Symptoms */}
          <div className="space-y-2">
            <Label>Symptoms (Select all that apply)</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {[
                "Morning Sickness",
                "Fatigue",
                "Swelling",
                "Back Pain",
                "Heartburn",
                "Mood Swings",
                "Frequent Urination",
                "Food Cravings",
                "Stretch Marks",
                "Shortness of Breath",
                "Tender Breasts",
                "Severe Headaches",
                "Vision Changes",
                "Sudden Weight Gain",
                "Vaginal Bleeding",
                "Reduced Fetal Movement",
              ].map((symptom) => (
                <div key={symptom} className="flex items-center space-x-2">
                  <Checkbox
                    id={`symptom-${symptom}`}
                    checked={formData.symptoms.includes(symptom)}
                    onCheckedChange={(checked) => handleSymptomChange(symptom, checked as boolean)}
                  />
                  <label
                    htmlFor={`symptom-${symptom}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {symptom}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Blood Pressure */}
          <div className="space-y-2">
            <Label>Blood Pressure</Label>
            <RadioGroup
              value={formData.bloodPressure}
              onValueChange={(value) => setFormData({ ...formData, bloodPressure: value })}
              required
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="normal" id="bp-normal" />
                <Label htmlFor="bp-normal">Normal</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="bp-high" />
                <Label htmlFor="bp-high">High</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Glucose Level */}
          <div className="space-y-2">
            <Label>Glucose Level</Label>
            <RadioGroup
              value={formData.glucoseLevel}
              onValueChange={(value) => setFormData({ ...formData, glucoseLevel: value })}
              required
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="normal" id="gl-normal" />
                <Label htmlFor="gl-normal">Normal</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="gl-high" />
                <Label htmlFor="gl-high">High</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Assessing..." : "Assess Health Risk"}
          </Button>
        </form>

        {/* Graphical Report */}
        {riskHistory.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Risk Assessment History</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 3]} ticks={[1, 2, 3]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="risk" fill="#FF69B4" name="Risk Level" barSize={20} /> {/* Reduced bar width */}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </CardContent>
      {result && (
        <CardFooter>
          <div
            className={`w-full p-4 rounded-lg ${
              result === "Low Risk"
                ? "bg-green-50 text-green-700"
                : result === "Moderate Risk"
                  ? "bg-yellow-50 text-yellow-700"
                  : "bg-red-50 text-red-700"
            }`}
          >
            <div className="flex items-center gap-2">
              {result === "Low Risk" ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
              <h3 className="font-medium">Health Risk Assessment: {result}</h3>
            </div>
            <p className="mt-2 text-sm">
              {result === "Low Risk"
                ? "Your pregnancy appears to be progressing normally. Continue with regular check-ups and maintain a healthy lifestyle."
                : result === "Moderate Risk"
                  ? "Your assessment indicates some risk factors. We recommend discussing these with your healthcare provider at your next appointment."
                  : "Your assessment indicates significant risk factors. We recommend consulting with your healthcare provider as soon as possible for personalized advice."}
            </p>
            {/* Medical Advice */}
            <div className="mt-4">
              <h4 className="font-medium">Medical Advice:</h4>
              <ul className="list-disc list-inside text-sm">
                {getMedicalAdvice(result).advice.map((advice, index) => (
                  <li key={index}>{advice}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}