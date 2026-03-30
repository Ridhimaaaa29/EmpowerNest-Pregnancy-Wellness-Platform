"use client"

import PregnancyTracker from "@/components/pregnancy-tracker"
import Navigation from '@/components/Navigation';

export default function SyntheticV0PageForDeployment() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white dark:from-slate-950 dark:to-slate-900">
        
        <div className="container mx-auto px-4 py-8 md:py-12">
          <header className="mb-8 text-center">
            <div className="inline-flex items-center justify-center mb-4">
            <Navigation /> 
              
  
            </div>
            <p className="text-muted-foreground max-w-md mx-auto">
              
            </p>
          </header>
          <main>
            <PregnancyTracker />
          </main>
        </div>
      </div>
    </>
  )
}