"use client";
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const COLORS = ["#10B981", "#EF4444"];
const recruiterOptions = ["All", "Rec A", "Rec B", "TL"];

const pieData = [
  { name: "Success", value: 70 },
  { name: "Failure", value: 30 },
];

const barData = [
  { name: "Rec A", success: 40, failure: 10 },
  { name: "Rec B", success: 30, failure: 20 },
  { name: "TL", success: 25, failure: 5 },
];

const lineData = [
  { month: "Jan", processed: 30 },
  { month: "Feb", processed: 45 },
  { month: "Mar", processed: 60 },
  { month: "Apr", processed: 50 },
];

export default function Analytics() {
  const [recruiter, setRecruiter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const handleExport = async () => {
    const node = document.getElementById("analytics-export");
    const canvas = await html2canvas(node);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("analytics_report.pdf");
  };

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white transition-colors">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          Activity Logs & Performance Analytics
        </h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          >
            Switch to {theme === "dark" ? "Light" : "Dark"} Mode
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          >
            Export as PDF
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <div className="space-y-1">
          <label className="text-sm font-medium">Recruiter</label>
          <select
            value={recruiter}
            onChange={(e) => setRecruiter(e.target.value)}
            className="w-[150px] p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          >
            {recruiterOptions.map((rec) => (
              <option key={rec} value={rec.toLowerCase()}>
                {rec}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-[150px] p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-[150px] p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      {/* Charts Section */}
      <div id="analytics-export" className="space-y-10">
        {/* Pie Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          <h3 className="text-lg font-medium mb-4">Success vs Failure Rate</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          <h3 className="text-lg font-medium mb-4">
            Recruiter/Team Lead Performance
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="success" stackId="a" fill="#10B981" />
              <Bar dataKey="failure" stackId="a" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          <h3 className="text-lg font-medium mb-4">
            Monthly Resume Processing Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="processed"
                stroke="#3B82F6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
