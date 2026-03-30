import type { Metadata } from "next"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CycleInsights } from "@/components/cycle-insights"

export const metadata: Metadata = {
  title: "Insights - Bloom",
  description: "View insights about your cycle patterns",
}

export default function InsightsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/">
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-lg font-semibold">Insights</h1>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <CycleInsights />
      </main>
    </div>
  )
}

