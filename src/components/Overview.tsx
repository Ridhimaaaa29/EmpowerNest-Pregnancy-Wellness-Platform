"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Edit2, Save } from "lucide-react";
import VaccinationScheduler from "@/components/VaccinationScheduler"; // Import VaccinationScheduler

export default function Overview() {
  const [isEditing, setIsEditing] = useState(false);
  const [childInfo, setChildInfo] = useState({
    name: "Emma",
    birthDate: "2024-11-15",
    weight: "4.2",
    height: "53",
  });

  const [age, setAge] = useState("");

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedChildInfo = localStorage.getItem("childInfo");
    if (savedChildInfo) {
      setChildInfo(JSON.parse(savedChildInfo));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("childInfo", JSON.stringify(childInfo));
  }, [childInfo]);

  useEffect(() => {
    // Calculate age in months based on birth date
    if (childInfo.birthDate) {
      const birthDate = new Date(childInfo.birthDate);
      const today = new Date();
      const ageInMonths =
        (today.getFullYear() - birthDate.getFullYear()) * 12 +
        (today.getMonth() - birthDate.getMonth());
      setAge(`${ageInMonths} months`);
    }
  }, [childInfo.birthDate]);

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChildInfo({
      ...childInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto text-black">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-black">{childInfo.name}'s Summary</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className="text-white"
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4 mr-2" /> Save
            </>
          ) : (
            <>
              <Edit2 className="h-4 w-4 mr-2" /> Edit
            </>
          )}
        </Button>
      </div>

      {isEditing ? (
        <Card className="p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-white">
                Child's Name
              </Label>
              <Input
                id="name"
                name="name"
                value={childInfo.name}
                onChange={handleChange}
                className="text-black bg-white"
              />
            </div>
            <div>
              <Label htmlFor="birthDate" className="text-white">
                Birth Date
              </Label>
              <Input
                id="birthDate"
                name="birthDate"
                type="date"
                value={childInfo.birthDate}
                onChange={handleChange}
                className="text-black bg-white"
              />
            </div>
            <div>
              <Label htmlFor="weight" className="text-white">
                Weight (kg)
              </Label>
              <Input
                id="weight"
                name="weight"
                type="number"
                step="0.1"
                value={childInfo.weight}
                onChange={handleChange}
                className="text-black bg-white"
              />
            </div>
            <div>
              <Label htmlFor="height" className="text-white">
                Height (cm)
              </Label>
              <Input
                id="height"
                name="height"
                type="number"
                step="0.1"
                value={childInfo.height}
                onChange={handleChange}
                className="text-black bg-white"
              />
            </div>
          </div>
        </Card>
      ) : (
        <Card className="p-6 bg-white shadow-sm">
          <h3 className="font-bold mb-4 text-lg text-black">Basic Information</h3>
          <div className="space-y-2 text-black">
            <p>
              <span className="font-medium text-black">Age:</span> {age}
            </p>
            <p>
              <span className="font-medium text-black">Birth Date:</span>{" "}
              {new Date(childInfo.birthDate).toLocaleDateString()}
            </p>
            <p>
              <span className="font-medium text-black">Latest Weight:</span> {childInfo.weight} kg
            </p>
            <p>
              <span className="font-medium text-black">Latest Height:</span> {childInfo.height} cm
            </p>
          </div>
        </Card>
      )}

      {/* Upcoming Vaccinations */}
      <Card className="p-6 mt-6 bg-white shadow-sm">
        <h3 className="font-bold mb-4 text-lg text-black">Upcoming Vaccinations</h3>
        <VaccinationScheduler age={parseInt(age)} />
      </Card>
    </div>
  );
}