

import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import PageTransition from "@/components/PageTransition";
import Overview from "@/components/Overview";
import Vaccinations from "@/components/Vaccinations";
import Milestones from "@/components/Milestones";
import GrowthChart from "@/components/GrowthChart";

export default function BabyCare() {
  const [activeTab, setActiveTab] = useState("Overview");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <PageTransition>
      <Navigation />
      <div className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-5xl font-extrabold mb-6 text-pink text-center">Baby Care</h1>
          <p className="text-center text-gray-600 mb-6">Track your baby's milestones, vaccinations, and growth with ease.</p>
          <div className="bg-pink-100 shadow-xl rounded-2xl p-8">
            <div className="flex border-b mb-6 justify-center space-x-6">
              {["Overview", "Vaccinations", "Milestones", "Growth Chart"].map((tab) => (
                <button
                  key={tab}
                  className={`px-6 py-3 text-lg transition-all duration-300 rounded-full ${activeTab === tab ? "bg-pink-500 text-white font-semibold" : "text-gray-700 hover:text-black hover:bg-pink-300"}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="text-black p-6 bg-white rounded-xl shadow-md">
              {activeTab === "Overview" && <Overview />}
              {activeTab === "Vaccinations" && <Vaccinations />}
              {activeTab === "Milestones" && <Milestones />}
              {activeTab === "Growth Chart" && <GrowthChart />}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}


