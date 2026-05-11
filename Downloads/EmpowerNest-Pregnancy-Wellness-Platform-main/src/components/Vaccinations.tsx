import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface VaccineRecommendation {
  name: string;
  description?: string;
}

export default function VaccinationScheduler() {
  const [age, setAge] = useState<string>('');
  const [timeUnit, setTimeUnit] = useState<string>('m');
  const [recommendations, setRecommendations] = useState<VaccineRecommendation[]>([]);
  const [error, setError] = useState<string>('');

  const getRecommendedVaccinations = () => {
    setError('');
    const ageNum = parseFloat(age);
    
    // Check for valid age input
    if (isNaN(ageNum) || ageNum < 0) {
      setError('Invalid input. Age must be a positive number.');
      return;
    }

    let vaccineList: VaccineRecommendation[] = [];

    switch (timeUnit) {
      case 'w': // weeks
        if (ageNum < 1.0) {
          vaccineList = [
            { name: 'BCG', description: 'Protects against tuberculosis' },
            { name: 'Hepatitis B (1st dose)', description: 'First of three doses to protect against Hepatitis B' },
            { name: 'OPV', description: 'Oral Polio Vaccine' }
          ];
        } else if (ageNum >= 6.0 && ageNum < 7.0) {
          vaccineList = [
            { name: 'DTwP/DTaP (1st dose)', description: 'Protects against diphtheria, tetanus, and pertussis' },
            { name: 'Hib-1', description: 'Protects against Haemophilus influenzae type b' },
            { name: 'IPV-1', description: 'Inactivated Polio Vaccine' },
            { name: 'Hepatitis B (2nd dose)', description: 'Second dose of Hep B series' },
            { name: 'PCV 1', description: 'Pneumococcal conjugate vaccine' },
            { name: 'Rotavirus (1st dose)', description: 'Protects against rotavirus' }
          ];
        } else if (ageNum >= 10.0 && ageNum < 11.0) {
          vaccineList = [
            { name: 'DTwP/DTaP (2nd dose)', description: 'Second dose of DTwP/DTaP series' },
            { name: 'Hib-2', description: 'Second dose of Hib series' },
            { name: 'IPV-2', description: 'Second dose of IPV series' },
            { name: 'Hepatitis B (3rd dose)', description: 'Third dose of Hep B series' },
            { name: 'PCV 2', description: 'Second dose of PCV series' },
            { name: 'Rotavirus (2nd dose)', description: 'Second dose of rotavirus vaccine' }
          ];
        } else if (ageNum >= 14.0 && ageNum < 15.0) {
          vaccineList = [
            { name: 'DTwP/DTaP (3rd dose)', description: 'Third dose of DTwP/DTaP series' },
            { name: 'Hib-3', description: 'Third dose of Hib series' },
            { name: 'IPV-3', description: 'Third dose of IPV series' },
            { name: 'Hepatitis B (4th dose)', description: 'Fourth dose of Hep B series' },
            { name: 'PCV 3', description: 'Third dose of PCV series' },
            { name: 'Rotavirus (3rd dose)', description: 'Third dose of rotavirus vaccine' }
          ];
        }
        break;

      case 'm': // months
        if (ageNum >= 6.0 && ageNum < 7.0) {
          vaccineList = [
            { name: 'Influenza (1st dose)', description: 'First dose of annual flu vaccine' }
          ];
        } else if (ageNum >= 7.0 && ageNum < 8.0) {
          vaccineList = [
            { name: 'Influenza (2nd dose)', description: 'Second dose of annual flu vaccine' }
          ];
        } else if (ageNum >= 9.0 && ageNum < 10.0) {
          vaccineList = [
            { name: 'MMR 1', description: 'First dose of Mumps, Measles, Rubella vaccine' }
          ];
        } else if (ageNum >= 12.0 && ageNum < 13.0) {
          vaccineList = [
            { name: 'Hepatitis A (1st dose)', description: 'First dose of Hepatitis A vaccine' }
          ];
        } else if (ageNum === 13.0 || ageNum === 15.0) {
          vaccineList = [
            { name: 'PCV Booster', description: 'Booster dose of Pneumococcal vaccine' },
            { name: 'MMR 2', description: 'Second dose of Mumps, Measles, Rubella vaccine' },
            { name: 'Varicella', description: 'Protects against chickenpox' }
          ];
        } else if (ageNum >= 16.0 && ageNum <= 18.0) {
          vaccineList = [
            { name: 'DTwP/DTaP Booster', description: 'Booster dose for diphtheria, tetanus, and pertussis' },
            { name: 'Hib Booster', description: 'Booster dose for Haemophilus influenzae type b' },
            { name: 'IPV Booster', description: 'Booster dose for polio' }
          ];
        } else if (ageNum >= 18.0 && ageNum < 20.0) {
          vaccineList = [
            { name: 'Hepatitis A (2nd dose)', description: 'Second dose of Hepatitis A vaccine' },
            { name: 'Varicella 2', description: 'Second dose of chickenpox vaccine' }
          ];
        }
        break;

      case 'y': // years
        if (ageNum >= 4.0 && ageNum < 6.0) {
          vaccineList = [
            { name: 'DTwP/DTaP Booster', description: 'Booster dose for diphtheria, tetanus, and pertussis' },
            { name: 'IPV Booster', description: 'Booster dose for polio' },
            { name: 'MMR 3', description: 'Third dose of Mumps, Measles, Rubella vaccine' }
          ];
        } else if (ageNum >= 9.0 && ageNum <= 14.0) {
          vaccineList = [
            { name: 'HPV (2 doses)', description: 'Human Papillomavirus vaccine' }
          ];
        } else if (ageNum >= 11.0 && ageNum <= 12.0) {
          vaccineList = [
            { name: 'Tdap/Td', description: 'Tetanus, diphtheria, acellular pertussis booster' }
          ];
        } else if (ageNum >= 2.0 && ageNum < 5.0) {
          vaccineList = [
            { name: 'Annual Influenza Vaccine', description: 'Yearly flu shot' }
          ];
        }
        break;

      default:
        setError('Invalid time unit. Please use weeks, months, or years.');
    }

    if (vaccineList.length === 0) {
      setRecommendations([{ name: 'No vaccinations scheduled for this age period.' }]);
    } else {
      setRecommendations(vaccineList);
    }
  };

  return (
    <div className="p-4 text-black ">
      <Card className="bg-white-500">
        <CardHeader>
          <CardTitle className="text-black">Vaccination Schedule Finder</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="age" className="text-black">Child's Age</Label>
              <Input
                id="age"
                type="number"
                step="0.1"
                min="0"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="text-black bg-white"
                placeholder="Enter age"
              />
            </div>
            
            <div>
              <Label className="text-black">Time Unit</Label>
              <RadioGroup 
                value={timeUnit} 
                onValueChange={setTimeUnit}
                className="flex space-x-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="w" id="weeks" />
                  <Label htmlFor="weeks" className="text-black">Weeks</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="m" id="months" />
                  <Label htmlFor="months" className="text-black">Months</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="y" id="years" />
                  <Label htmlFor="years" className="text-black">Years</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Button onClick={getRecommendedVaccinations} className="bg-pink-500 hover:bg-pink-600">
              Check Recommended Vaccinations
            </Button>
            
            {error && <p className="text-red-500 text-sm">{error}</p>}
            
            {recommendations.length > 0 && (
              <div className="mt-4">
                <h3 className="font-bold text-black mb-2">Recommended Vaccinations:</h3>
                <ul className="space-y-2">
                  {recommendations.map((vaccine, index) => (
                    <li key={index} className="bg-white p-3 rounded shadow-sm">
                      <p className="font-medium text-black">{vaccine.name}</p>
                      {vaccine.description && <p className="text-sm text-black">{vaccine.description}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}