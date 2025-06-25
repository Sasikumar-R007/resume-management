// import React from "react";
// import { useNavigate } from "react-router-dom";

// const RecruiterProfileSetup = () => {
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Form submission logic here...
//     navigate("/recruiter/home");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="bg-white p-8 rounded-lg shadow w-full max-w-2xl">
//         <h1 className="text-2xl font-bold mb-2 text-center">
//           Complete Your Recruiter Profile
//         </h1>
//         <p className="text-gray-600 mb-6 text-center">
//           Please provide your information to get started with recruitment.
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block font-medium mb-1">
//               Company Name <span className="text-red-500">*</span>
//             </label>
//             <input
//               required
//               type="text"
//               className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
//             />
//           </div>

//           <div>
//             <label className="block font-medium mb-1">
//               Position <span className="text-red-500">*</span>
//             </label>
//             <input
//               required
//               type="text"
//               className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
//             />
//           </div>

//           <div className="flex flex-col sm:flex-row gap-4">
//             <div className="w-full">
//               <label className="block font-medium mb-1">
//                 First Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 required
//                 type="text"
//                 className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
//               />
//             </div>
//             <div className="w-full">
//               <label className="block font-medium mb-1">
//                 Last Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 required
//                 type="text"
//                 className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block font-medium mb-1">
//               Phone Number <span className="text-red-500">*</span>
//             </label>
//             <input
//               required
//               type="tel"
//               className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
//             />
//           </div>

//           <div>
//             <label className="block font-medium mb-1">
//               Location <span className="text-red-500">*</span>
//             </label>
//             <input
//               required
//               type="text"
//               className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
//             />
//           </div>

//           <div>
//             <label className="block font-medium mb-1">
//               Joining Date <span className="text-red-500">*</span>
//             </label>
//             <input
//               required
//               type="date"
//               className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
//             />
//           </div>

//           <div>
//             <label className="block font-medium mb-1">
//               Team Leader's Name <span className="text-red-500">*</span>
//             </label>
//             <input
//               required
//               type="text"
//               className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
//           >
//             Complete Setup
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RecruiterProfileSetup;

import React, { useEffect, useState } from "react";

export default function CandidatesApplied() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/candidates`)
      .then((res) => res.json())
      .then((data) => setCandidates(data))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Candidates Applied</h2>

      <div className="overflow-auto">
        <table className="min-w-full border border-gray-300 bg-white shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Mobile</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">LinkedIn</th>
              <th className="p-2 border">Experience</th>
              <th className="p-2 border">Primary Skill</th>
              <th className="p-2 border">Resume</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((cand, idx) => (
              <tr key={idx} className="text-sm text-center">
                <td className="border p-2">
                  {cand.firstName} {cand.lastName}
                </td>
                <td className="border p-2">{cand.mobile}</td>
                <td className="border p-2">{cand.primaryEmail}</td>
                <td className="border p-2">
                  <a
                    href={cand.linkedin}
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    View
                  </a>
                </td>
                <td className="border p-2">{cand.totalExperience}</td>
                <td className="border p-2">{cand.primarySkill}</td>
                <td className="border p-2">
                  {cand.resumeLink ? (
                    <a
                      href={cand.resumeLink}
                      target="_blank"
                      className="text-blue-600 underline"
                    >
                      View Resume
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
