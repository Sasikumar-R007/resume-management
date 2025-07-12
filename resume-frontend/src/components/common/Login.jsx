// src/pages/Login.jsx
import React, { useState } from "react";
import { FaUserTie, FaUsersCog, FaUserShield } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const roles = [
  { id: "recruiter", label: "Recruiter", icon: <FaUserTie size={24} /> },
  { id: "teamlead", label: "Team Leader", icon: <FaUsersCog size={24} /> },
  { id: "admin", label: "Administrator", icon: <FaUserShield size={24} /> },
];

const EmpAuth = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedRole) {
      alert("Please select a role!");
      return;
    }

    try {
      if (selectedRole === "recruiter") {
        const res = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/api/recruiters/login`,
          { email, password }
        );

        const recruiterData = res.data.recruiter;

        if (recruiterData) {
          localStorage.setItem("userRole", "recruiter");
          localStorage.setItem("userEmail", recruiterData.email);
          localStorage.setItem(
            "recruiterProfile",
            JSON.stringify(recruiterData)
          );
          navigate("/recruiter/home");
        } else {
          alert("Recruiter not found or invalid credentials");
        }
      } else if (selectedRole === "teamlead") {
        const res = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/api/team-leaders/login`,
          { email, password }
        );

        const teamLeadData = res.data.teamLeader;

        if (teamLeadData) {
          localStorage.setItem("userRole", "teamlead");
          localStorage.setItem("userEmail", teamLeadData.email);
          localStorage.setItem(
            "teamLeaderProfile",
            JSON.stringify(teamLeadData)
          );
          navigate("/team-leader/home");
        } else {
          alert("Team Leader not found or invalid credentials");
        }
      } else if (selectedRole === "admin") {
        localStorage.setItem("userRole", "admin");
        localStorage.setItem("userEmail", email);
        navigate("/admin");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid credentials or login error.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Illustration */}
      <div className="hidden md:flex w-1/2 bg-gray-100 items-center justify-center border-r-2 border-gray-200">
        <img
          src="/assets/signup.jpg"
          alt="Recruitment Illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-6">
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

          {/* Role Selection */}
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

          {/* Login Form */}
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

            {/* Forgot Password Link for Admin only */}
            {selectedRole === "admin" && (
              <div className="text-right">
                <a
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot Password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmpAuth;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const roles = [
//   { id: "recruiter", label: "Recruiter" },
//   { id: "teamlead", label: "Team Leader" },
//   { id: "admin", label: "Administrator" },
// ];

// const EmpAuth = () => {
//   const [selectedRole, setSelectedRole] = useState("recruiter");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     switch (selectedRole) {
//       case "recruiter":
//         navigate("/recruiter/home");
//         break;
//       case "teamlead":
//         navigate("/team-leader/home");
//         break;
//       case "admin":
//         navigate("/admin");
//         break;
//       default:
//         alert("Invalid role selected!");
//     }

//     console.log({ role: selectedRole, email, password });
//   };

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row">
//       {/* Left Illustration */}
//       <div className="hidden md:flex w-1/2 bg-gray-100 items-center justify-center">
//         <img
//           src="/assets/signup.jpg" // 🔁 Update your path
//           alt="Employer Illustration"
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* Right Form */}
//       <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-6">
//         <div className="bg-white shadow-xl rounded-2xl p-8 max-w-xl w-full space-y-6">
//           <div>
//             <h1 className="text-2xl font-bold text-center">
//               AI-Powered Resume Analysis
//             </h1>
//             <p className="text-center text-gray-600 mt-2 text-sm">
//               Transform your hiring process with advanced AI technology that
//               matches the right talent with the right opportunities.
//             </p>
//           </div>

//           <div>
//             <h2 className="text-xl font-semibold text-center mt-4">
//               Welcome Back
//             </h2>
//             <p className="text-center text-gray-500 text-sm">
//               Sign in to your account
//             </p>
//           </div>

//           <form className="space-y-4" onSubmit={handleSubmit}>
//             {/* Email + Role Side by Side */}
//             <div className="flex flex-col md:flex-row gap-4">
//               <div className="flex-1">
//                 <label className="block text-sm mb-1 font-medium">Email</label>
//                 <input
//                   type="email"
//                   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="you@example.com"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="md:w-1/2">
//                 <label className="block text-sm mb-1 font-medium">Role</label>
//                 <select
//                   value={selectedRole}
//                   onChange={(e) => setSelectedRole(e.target.value)}
//                   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 >
//                   {roles.map((role) => (
//                     <option key={role.id} value={role.id}>
//                       {role.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {/* Password */}
//             <div>
//               <label className="block text-sm mb-1 font-medium">Password</label>
//               <input
//                 type="password"
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="••••••••"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>

//             {/* Forgot Password for Admin */}
//             {selectedRole === "admin" && (
//               <div className="text-right">
//                 <a
//                   href="/forgot-password"
//                   className="text-sm text-blue-600 hover:underline"
//                 >
//                   Forgot Password?
//                 </a>
//               </div>
//             )}

//             {/* Submit */}
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
//             >
//               Sign In
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmpAuth;
