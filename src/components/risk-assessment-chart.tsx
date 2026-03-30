"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { ChartContainer } from "@/components/ui/chart"

interface RiskFactorData {
  name: string
  value: number
  category: string
}

interface RiskAssessmentChartProps {
  userData: any
  riskScore: number
}

export function RiskAssessmentChart({ userData, riskScore }: RiskAssessmentChartProps) {
  // Calculate individual risk factors and their contributions
  const riskFactors: RiskFactorData[] = []

  // Age factor
  if (userData.age > 35) {
    riskFactors.push({ name: "Age > 35", value: 2, category: "Demographics" })
  } else if (userData.age < 20) {
    riskFactors.push({ name: "Age < 20", value: 1, category: "Demographics" })
  }

  // Pregnancy stage factor
  if (userData.pregnancyStage === "2") {
    riskFactors.push({ name: "Third Trimester", value: 1, category: "Pregnancy Stage" })
  }

  // Health data factors
  if (userData.bloodPressure === "high") {
    riskFactors.push({ name: "High Blood Pressure", value: 2, category: "Health Metrics" })
  }

  if (userData.glucoseLevel === "high") {
    riskFactors.push({ name: "High Glucose", value: 2, category: "Health Metrics" })
  }

  // Medical history factors
  if (userData.previousComplications && userData.previousComplications.length > 0) {
    riskFactors.push({
      name: "Previous Complications",
      value: userData.previousComplications.length,
      category: "Medical History",
    })
  }

  if (userData.chronicIllnesses && userData.chronicIllnesses.length > 0) {
    riskFactors.push({
      name: "Chronic Illnesses",
      value: userData.chronicIllnesses.length,
      category: "Medical History",
    })
  }

  // Lifestyle factors
  if (userData.lifestyle) {
    if (userData.lifestyle.includes("Smoking")) {
      riskFactors.push({ name: "Smoking", value: 3, category: "Lifestyle" })
    }
    if (userData.lifestyle.includes("Alcohol")) {
      riskFactors.push({ name: "Alcohol", value: 3, category: "Lifestyle" })
    }
    if (userData.lifestyle.includes("Sedentary")) {
      riskFactors.push({ name: "Sedentary", value: 1, category: "Lifestyle" })
    }
    if (userData.lifestyle.includes("Poor Diet")) {
      riskFactors.push({ name: "Poor Diet", value: 1, category: "Lifestyle" })
    }
    if (userData.lifestyle.includes("High Caffeine")) {
      riskFactors.push({ name: "High Caffeine", value: 1, category: "Lifestyle" })
    }
  }

  // Psychological factors
  if (userData.stressLevel === "high") {
    riskFactors.push({ name: "High Stress", value: 2, category: "Psychological" })
  } else if (userData.stressLevel === "moderate") {
    riskFactors.push({ name: "Moderate Stress", value: 1, category: "Psychological" })
  }

  if (userData.mentalHealth) {
    if (userData.mentalHealth.includes("Depression")) {
      riskFactors.push({ name: "Depression", value: 2, category: "Psychological" })
    }
    if (userData.mentalHealth.includes("Anxiety")) {
      riskFactors.push({ name: "Anxiety", value: 1, category: "Psychological" })
    }
  }

  // Environmental factors
  if (userData.environmentalRisks && userData.environmentalRisks.length > 0) {
    riskFactors.push({
      name: "Environmental Risks",
      value: userData.environmentalRisks.length,
      category: "Environmental",
    })
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
  ]

  let symptomCount = 0
  if (userData.symptoms) {
    userData.symptoms.forEach((symptom: string) => {
      if (highRiskSymptoms.includes(symptom)) {
        symptomCount++
      }
    })

    if (symptomCount > 0) {
      riskFactors.push({ name: "High Risk Symptoms", value: symptomCount, category: "Symptoms" })
    }
  }

  // Sort risk factors by value (highest to lowest)
  riskFactors.sort((a, b) => b.value - a.value)

  // Take top 10 risk factors for better visualization
  const topRiskFactors = riskFactors.slice(0, 10)

  return (
    <div className="w-full space-y-4">
      <h3 className="text-lg font-medium">Risk Factor Analysis</h3>
      <div className="h-[400px] w-full">
        <ChartContainer
          config={{
            value: {
              label: "Risk Score",
              color: "hsl(var(--chart-1))",
            },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topRiskFactors} layout="vertical" margin={{ top: 10, right: 10, left: 120, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis type="number" domain={[0, Math.max(...topRiskFactors.map((item) => item.value)) + 1]} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={120} />
              <Tooltip
                formatter={(value, name, props) => {
                  return [`Score: ${value}`, props.payload.category]
                }}
                labelFormatter={(value) => `Risk Factor: ${value}`}
              />
              <Legend />
              <Bar dataKey="value" name="Risk Score" fill="var(--color-value)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
      <div className="text-sm text-muted-foreground">
        <p>
          Total Risk Score: {riskScore} - {riskScore > 5 ? "High Risk" : riskScore > 3 ? "Moderate Risk" : "Low Risk"}
        </p>
        <p className="mt-1">This chart shows the top contributing factors to your pregnancy risk assessment.</p>
      </div>
    </div>
  )
}

