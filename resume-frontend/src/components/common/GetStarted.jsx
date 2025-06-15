import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBrain,
  FaBriefcase,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";
import {ExternalLink } from "lucide-react"; // for nav icons


const features = [
  {
    icon: <FaBrain size={32} />,
    title: "Smart Parsing",
    desc: "Extract key information from resumes automatically with our advanced AI parsing technology.",
  },
  {
    icon: <FaBriefcase size={32} />,
    title: "Job Matching",
    desc: "Match candidates with job position using intelligent algorithms and skill analysis.",
  },
  {
    icon: <FaUsers size={32} />,
    title: "Talent Pool",
    desc: "Build and manage your talent pool with organised candidate profiles and rankings.",
  },
  {
    icon: <FaChartLine size={32} />,
    title: "AI Analysis",
    desc: "Get insights into your hiring process with detailed analytics and recommendations.",
  },
];

const GetStarted = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl w-full text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md flex items-start gap-4 text-left"
            >
              <div className="text-indigo-600">{feature.icon}</div>
              <div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className=" pt-2 text-sm text-gray-700">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold">
            Ready to Transform Your Hiring?
          </h2>
          <p className="text-gray-600 mt-2">
            Join thousands of companies that have streamlined their recruitment
            process.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Get Started Now
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded flex items-center gap-2"  onClick={() => navigate("/candidate-auth")}>
            Candidate
            <ExternalLink size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
