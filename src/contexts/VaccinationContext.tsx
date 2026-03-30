import React, { createContext, useState, useEffect } from 'react';

type Vaccine = {
  name: string;
  date: string;
  nextDue: string;
};

type VaccinationContextType = {
  vaccines: Vaccine[];
  setVaccines: React.Dispatch<React.SetStateAction<Vaccine[]>>;
};

export const VaccinationContext = createContext<VaccinationContextType>({
  vaccines: [],
  setVaccines: () => {},
});

export const VaccinationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [vaccines, setVaccines] = useState<Vaccine[]>(() => {
    const saved = localStorage.getItem('vaccines');
    return saved 
      ? JSON.parse(saved) 
      : [{ name: "Hepatitis B", date: "2024-02-01", nextDue: "2024-05-01" }];
  });

  useEffect(() => {
    localStorage.setItem('vaccines', JSON.stringify(vaccines));
  }, [vaccines]);

  return (
    <VaccinationContext.Provider value={{ vaccines, setVaccines }}>
      {children}
    </VaccinationContext.Provider>
  );
};