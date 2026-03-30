"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface VaccineRecommendation {
  name: string;
  description?: string;
}

interface VaccinationSchedulerProps {
  age: number;
}

export default function VaccinationScheduler({ age }: VaccinationSchedulerProps) {
  const [recommendations, setRecommendations] = useState<VaccineRecommendation[]>([]);

  useEffect(() => {
    getRecommendedVaccinations();
  }, [age]);

  const getRecommendedVaccinations = () => {
    let vaccineList: VaccineRecommendation[] = [];

    if (age < 2) {
      vaccineList = [
        { name: "First Dose DTaP", description: "Protects against diphtheria, tetanus, and pertussis" },
      ];
    } else if (age < 4) {
      vaccineList = [
        { name: "Second Dose DTaP", description: "Second dose of DTaP series" },
      ];
    } else if (age < 6) {
      vaccineList = [
        { name: "Rotavirus Vaccination", description: "Protects against rotavirus" },
      ];
    } else {
      vaccineList = [
        { name: "Annual Flu Shot", description: "Yearly flu vaccine" },
      ];
    }

    setRecommendations(vaccineList);
  };

  return (
    <div>
      {recommendations.length > 0 ? (
        <ul className="space-y-2">
          {recommendations.map((vaccine, index) => (
            <li key={index} className="bg-white p-3 rounded shadow-sm">
              <p className="font-medium text-black">{vaccine.name}</p>
              {vaccine.description && <p className="text-sm text-black">{vaccine.description}</p>}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No upcoming vaccinations.</p>
      )}
    </div>
  );
}