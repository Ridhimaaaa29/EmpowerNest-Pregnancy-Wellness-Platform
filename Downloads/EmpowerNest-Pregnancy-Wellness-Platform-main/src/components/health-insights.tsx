"use client"

import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface HealthInsightsProps {
  insights: string
  riskLevel: string
}

export function HealthInsights({ insights, riskLevel }: HealthInsightsProps) {
  const parsedInsights = JSON.parse(insights)

  return (
    <Card>
      <CardContent>
        <CardTitle>AI-Powered Health Insights</CardTitle>
        {parsedInsights.alerts.length > 0 && (
          <>
            {parsedInsights.alerts.map((alert: any) => (
              <Alert
                key={alert.title}
                variant={
                  alert.severity === "high" ? "destructive" : alert.severity === "medium" ? "warning" : "default"
                }
              >
                <AlertTitle>{alert.title}</AlertTitle>
                <AlertDescription>{alert.description}</AlertDescription>
              </Alert>
            ))}
          </>
        )}
        <div className="space-y-4 mt-4">
          <h4 className="text-lg font-medium">Nutrition</h4>
          <ul>
            {parsedInsights.nutrition.map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h4 className="text-lg font-medium">Exercise</h4>
          <ul>
            {parsedInsights.exercise.map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h4 className="text-lg font-medium">Care</h4>
          <ul>
            {parsedInsights.care.map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {parsedInsights.sleep && (
            <>
              <h4 className="text-lg font-medium">Sleep</h4>
              <ul>
                {parsedInsights.sleep.map((item: string) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

