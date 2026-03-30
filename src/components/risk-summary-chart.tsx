"use client";

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { ChartContainer } from "@/components/ui/chart";

interface RiskSummaryChartProps {
  userData: any;
}

export function RiskSummaryChart({ userData }: RiskSummaryChartProps) {
  // Calculate risk by category
  const categories = {
    demographics: 0,
    medical: 0,
    lifestyle: 0,
    psychological: 0,
    environmental: 0,
    symptoms: 0,
  };

  // Demographics (age)
  if (userData.age > 35) categories.demographics += 2;
  else if (userData.age < 20) categories.demographics += 1;

  // Medical (pregnancy stage, blood pressure, glucose, complications, illnesses)
  if (userData.pregnancyStage === "2") categories.medical += 1;
  if (userData.bloodPressure === "high") categories.medical += 2;
  if (userData.glucoseLevel === "high") categories.medical += 2;
  if (userData.previousComplications) categories.medical += userData.previousComplications.length;
  if (userData.chronicIllnesses) categories.medical += userData.chronicIllnesses.length;

  // Lifestyle
  if (userData.lifestyle) {
    if (userData.lifestyle.includes("Smoking")) categories.lifestyle += 3;
    if (userData.lifestyle.includes("Alcohol")) categories.lifestyle += 3;
    if (userData.lifestyle.includes("Sedentary")) categories.lifestyle += 1;
    if (userData.lifestyle.includes("Poor Diet")) categories.lifestyle += 1;
    if (userData.lifestyle.includes("High Caffeine")) categories.lifestyle += 1;
  }

  // Psychological
  if (userData.stressLevel === "high") categories.psychological += 2;
  else if (userData.stressLevel === "moderate") categories.psychological += 1;
  if (userData.mentalHealth) {
    if (userData.mentalHealth.includes("Depression")) categories.psychological += 2;
    if (userData.mentalHealth.includes("Anxiety")) categories.psychological += 1;
  }

  // Environmental
  if (userData.environmentalRisks) categories.environmental += userData.environmentalRisks.length;

  // Symptoms
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
      if (highRiskSymptoms.includes(symptom)) categories.symptoms += 1;
    });
  }

  // Prepare data for pie chart
  const data = [
    { name: "Demographics", value: categories.demographics },
    { name: "Medical", value: categories.medical },
    { name: "Lifestyle", value: categories.lifestyle },
    { name: "Psychological", value: categories.psychological },
    { name: "Environmental", value: categories.environmental },
    { name: "Symptoms", value: categories.symptoms },
  ].filter((item) => item.value > 0);

  // Pink shades color palette
  const COLORS = [
    "#FFC0CB", // Light Pink
    "#FF69B4", // Hot Pink
    "#FF1493", // Deep Pink
    "#DB7093", // Pale Violet Red
    "#C71585", // Medium Violet Red
    "#FF6EB4", // Pink Sherbet
  ];

  return (
    <div className="w-full space-y-4">
      <h3 className="text-lg font-medium">Risk Category Distribution</h3>
      <div className="h-[300px] w-full">
        <ChartContainer
          config={{
            chart1: { label: "Demographics", color: "#FFC0CB" },
            chart2: { label: "Medical", color: "#FF69B4" },
            chart3: { label: "Lifestyle", color: "#FF1493" },
            chart4: { label: "Psychological", color: "#DB7093" },
            chart5: { label: "Environmental", color: "#C71585" },
            chart6: { label: "Symptoms", color: "#FF6EB4" },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`Score: ${value}`, name]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
      <div className="text-sm text-muted-foreground">
        <p>This chart shows how different categories contribute to your overall risk assessment.</p>
      </div>
    </div>
  );
}