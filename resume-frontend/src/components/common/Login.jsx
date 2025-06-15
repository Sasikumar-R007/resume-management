import React, { useState } from "react";
import { FaUserTie, FaUsersCog, FaUserShield } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const roles = [
  { id: "recruiter", label: "Recruiter", icon: <FaUserTie size={24} /> },
  { id: "teamlead", label: "Team Leader", icon: <FaUsersCog size={24} /> },
  { id: "admin", label: "Administrator", icon: <FaUserShield size={24} /> },
];

const Login = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedRole) {
      alert("Please select a role!");
      return;
    }

    switch (selectedRole) {
    case "recruiter":
      navigate("/recruiter/home");
      break;
    case "teamlead":
      navigate("/team-leader/home");
      break;
    case "admin":
      navigate("/admin");
      break;
    default:
      alert("Invalid role selected!");
  }
    // For now, just log the data:
    console.log({ role: selectedRole, email, password });
    // TODO: Connect to backend/auth system and route based on role
  };

  // const handleLogin = () => {
  //   // Later you'll add login validation here
  //   navigate("/get-started");
  // };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-xl w-full space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-center">
            AI-Powered Resume Analysis
          </h1>
          <p className="text-center text-gray-600 mt-2 text-sm">
            Transform your hiring process with advanced AI technology that
            matches the right talent with the right opportunities.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-center mt-4">
            Welcome Back
          </h2>
          <p className="text-center text-gray-500 text-sm">
            Sign in to your account
          </p>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">Select your role</p>
          <div className="flex justify-between gap-4">
            {roles.map(({ id, label, icon }) => (
              <div
                key={id}
                onClick={() => setSelectedRole(id)}
                className={`flex flex-col items-center p-4 rounded-xl w-1/3 cursor-pointer transition
                  ${
                    selectedRole === id
                      ? "bg-blue-200 border-2 border-blue-600"
                      : "bg-gray-100 hover:bg-blue-100"
                  }`}
              >
                <div
                  className={`mb-1 ${
                    selectedRole === id ? "text-blue-600" : ""
                  }`}
                >
                  {icon}
                </div>
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm mb-1 font-medium">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1 font-medium">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>

        {/* <p className="text-center mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up here
          </a>
        </p> */}
      </div>
    </div>
  );
};

export default Login;
