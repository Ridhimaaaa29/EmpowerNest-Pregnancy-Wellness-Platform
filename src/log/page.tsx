import type { Metadata } from "next"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DailyLog } from "@/components/daily-log"

export const metadata: Metadata = {
  title: "Log - Bloom",
  description: "Log your daily symptoms and mood",
}

export default function LogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/">
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-lg font-semibold">Daily Log</h1>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <DailyLog />
      </main>
    </div>
  )
}

