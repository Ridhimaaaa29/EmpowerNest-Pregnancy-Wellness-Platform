
import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import PageTransition from '@/components/PageTransition';

export default function WorkLife() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <PageTransition>
      <Navigation />
      <div className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold mb-6">Work-Life Balance</h1>
          <p className="text-muted-foreground text-lg">
            This page is under construction. Check back soon for work-life balance resources and guides.
          </p>
        </div>
      </div>
    </PageTransition>
  );
}
