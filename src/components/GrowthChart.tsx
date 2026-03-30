import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function GrowthChart() {
  const data = {
    labels: ["0M", "1M", "2M", "3M", "4M"],
    datasets: [
      {
        label: "Weight (kg)",
        data: [3.2, 3.8, 4.5, 5.2, 6.0],
        borderColor: "pink",
        backgroundColor: "rgba(255, 182, 193, 0.5)",
      },
      {
        label: "Height (cm)",
        data: [50, 52, 55, 58, 62],
        borderColor: "blue",
        backgroundColor: "rgba(135, 206, 250, 0.5)",
      },
    ],
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Growth Chart</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <Line data={data} />
      </div>
    </div>
  );
}
