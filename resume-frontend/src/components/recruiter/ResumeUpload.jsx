// import React, { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const ResumeUpload = () => {
//   const [candidateName, setCandidateName] = useState("");
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [recentUploads, setRecentUploads] = useState([]);
//   const fileInputRef = useRef(null);

//   const navigate = useNavigate();

//   const fetchRecent = async () => {
//     try {
//       const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/records`);
//       const data = await res.json();
//       setRecentUploads(data);
//     } catch (err) {
//       console.error("Fetch failed:", err);
//     }
//   };

//   useEffect(() => {
//     fetchRecent();
//   }, []);

//   const handleFiles = (e) => {
//     setSelectedFiles([...e.target.files]);
//   };

//   const handleUpload = async (e) => {
//     e.preventDefault();
//     if (!selectedFiles.length || candidateName.trim() === "") {
//       alert("Enter name and select file(s)");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("name", candidateName);
//     for (let i = 0; i < selectedFiles.length; i++) {
//       formData.append("resumes", selectedFiles[i]);
//     }

//     try {
//       const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/upload`, {
//         method: "POST",
//         body: formData,
//       });

//       const contentType = response.headers.get("content-type");
//       const result =
//         contentType && contentType.includes("application/json")
//           ? await response.json()
//           : null;

//       if (response.ok) {
//         alert("Upload successful!");
//         setCandidateName("");
//         setSelectedFiles([]);
//         fileInputRef.current.value = null;
//         fetchRecent(); // Refresh recent uploads
//       } else {
//         alert("Upload failed: " + (result?.message || "Unknown error"));
//       }
//     } catch (error) {
//       console.error("Error uploading:", error);
//       alert("Error uploading resumes.");
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto mt-10 p-4 border rounded shadow">
//       <h2 className="text-xl text-center font-bold mb-4">Upload Resume</h2>

//       <form onSubmit={handleUpload}>
//         <input
//           type="text"
//           placeholder="Candidate Name"
//           value={candidateName}
//           onChange={(e) => setCandidateName(e.target.value)}
//           className="block w-full mb-3 px-3 py-2 border rounded"
//         />

//         <input
//           type="file"
//           name="resumes"
//           multiple
//           accept=".pdf,.doc,.docx"
//           onChange={handleFiles}
//           ref={fileInputRef}
//           className="mb-4"
//         />
//         <br />

//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Upload
//         </button>

//         <button
//           type="button"
//           onClick={() => navigate(-1)}
//           className="mt-4 ml-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
//         >
//           Back to Dashboard
//         </button>
//       </form>

//       <div className="mt-10">
//         <h3 className="text-lg font-semibold mb-3">Recent Uploads</h3>

//         {recentUploads.length === 0 ? (
//           <p>No uploads yet.</p>
//         ) : (
//           <table className="w-full border-collapse border border-gray-400">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border border-gray-300 px-2 py-1">S.No</th>
//                 <th className="border border-gray-300 px-2 py-1">Name</th>
//                 <th className="border border-gray-300 px-2 py-1">Resume(s)</th>
//                 <th className="border border-gray-300 px-2 py-1">Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {recentUploads.map((upload, idx) => (
//                 <tr key={upload.id || idx} className="text-center">
//                   <td className="border border-gray-300 px-2 py-1">
//                     {idx + 1}
//                   </td>
//                   <td className="border border-gray-300 px-2 py-1">
//                     {upload.name}
//                   </td>
//                   <td className="border border-gray-300 px-2 py-1">
//                     {upload.files && upload.files.length > 0 ? (
//                       upload.files.map((filename, i) => (
//                         <div key={i}>
//                           <a
//                             href={`${process.env.REACT_APP_API_BASE_URL}/api/uploads/${filename}`}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-600 underline"
//                           >
//                             {filename}
//                           </a>
//                         </div>
//                       ))
//                     ) : (
//                       <span>No files</span>
//                     )}
//                   </td>
//                   <td className="border border-gray-300 px-2 py-1">
//                     {new Date(upload.timestamp).toLocaleString()}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ResumeUpload;

//CORRECTED



// import React, { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const ResumeUpload = () => {
//   const [formData, setFormData] = useState({});
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [recentUploads, setRecentUploads] = useState([]);
//   const fileInputRef = useRef(null);

//   const navigate = useNavigate();

//   const fetchRecent = async () => {
//     try {
//       const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/records`);
//       const data = await res.json();
//       setRecentUploads(data);
//     } catch (err) {
//       console.error("Fetch failed:", err);
//     }
//   };

//   useEffect(() => {
//     fetchRecent();
//   }, []);

//   const handleFiles = (e) => {
//     setSelectedFiles([...e.target.files]);
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleUpload = async (e) => {
//     e.preventDefault();
//     if (!selectedFiles.length || !formData.name?.trim()) {
//       alert("Enter name and select file(s)");
//       return;
//     }

//     const uploadData = new FormData();
//     Object.entries(formData).forEach(([key, value]) => uploadData.append(key, value));
//     for (let i = 0; i < selectedFiles.length; i++) {
//       uploadData.append("resumes", selectedFiles[i]);
//     }

//     try {
//       const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/upload`, {
//         method: "POST",
//         body: uploadData,
//       });

//       const contentType = response.headers.get("content-type");
//       const result = contentType && contentType.includes("application/json") ? await response.json() : null;

//       if (response.ok) {
//         alert("Upload successful!");
//         setFormData({});
//         setSelectedFiles([]);
//         fileInputRef.current.value = null;
//         fetchRecent();
//       } else {
//         alert("Upload failed: " + (result?.message || "Unknown error"));
//       }
//     } catch (error) {
//       console.error("Error uploading:", error);
//       alert("Error uploading resumes.");
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto mt-10 p-8 border rounded shadow">
//       <h2 className="text-xl text-center font-bold mb-4">Upload Candidate Details & Resume</h2>

//       <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <Input label="Candidate Name" name="name" value={formData.name || ""} onChange={handleChange} />
//         <Input label="Phone" name="phone" value={formData.phone || ""} onChange={handleChange} />
//         <Input label="Alternate Phone" name="alt_phone" value={formData.alt_phone || ""} onChange={handleChange} />
//         <Input label="Primary Email" name="email" value={formData.email || ""} onChange={handleChange} />
//         <Input label="Secondary Email" name="sec_email" value={formData.sec_email || ""} onChange={handleChange} />
//         <Input label="LinkedIn" name="linkedin" value={formData.linkedin || ""} onChange={handleChange} />
//         <Input label="Portfolio" name="portfolio" value={formData.portfolio || ""} onChange={handleChange} />
//         <Input label="GitHub" name="github" value={formData.github || ""} onChange={handleChange} />
//         <Input label="Current Company" name="current_company" value={formData.current_company || ""} onChange={handleChange} />
//         <Input label="Current Designation" name="current_designation" value={formData.current_designation || ""} onChange={handleChange} />
//         <Input label="Total Experience" name="total_experience" value={formData.total_experience || ""} onChange={handleChange} />
//         <Input label="Primary Skills" name="skills" value={formData.skills || ""} onChange={handleChange} />
//         <Input label="Secondary Skills" name="sec_skills" value={formData.sec_skills || ""} onChange={handleChange} />



//         <div className="col-span-2">
//           <label className="block text-sm font-medium mb-1">Upload Resume</label>
//           <input
//             type="file"
//             name="resumes"
//             multiple
//             accept=".pdf,.doc,.docx"
//             onChange={handleFiles}
//             ref={fileInputRef}
//             className="mb-4"
//           />
//         </div>

//         <div className="col-span-2 flex gap-4">
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             Upload
//           </button>

//           <button
//             type="button"
//             onClick={() => navigate(-1)}
//             className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
//           >
//             Back to Dashboard
//           </button>
//         </div>
//       </form>

//       <div className="mt-10">
//         <h3 className="text-lg font-semibold mb-3">Recent Uploads</h3>

//         {recentUploads.length === 0 ? (
//           <p>No uploads yet.</p>
//         ) : (
//           <table className="w-full border-collapse border border-gray-400">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border border-gray-300 px-2 py-1">S.No</th>
//                 <th className="border border-gray-300 px-2 py-1">Name</th>
//                 <th className="border border-gray-300 px-2 py-1">Resume(s)</th>
//                 <th className="border border-gray-300 px-2 py-1">Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {recentUploads.map((upload, idx) => (
//                 <tr key={upload.id || idx} className="text-center">
//                   <td className="border border-gray-300 px-2 py-1">{idx + 1}</td>
//                   <td className="border border-gray-300 px-2 py-1">{upload.name}</td>
//                   <td className="border border-gray-300 px-2 py-1">
//                     {upload.files?.length > 0 ? (
//                       upload.files.map((filename, i) => (
//                         <div key={i}>
//                           <a
//                             href={`${process.env.REACT_APP_API_BASE_URL}/api/uploads/${filename}`}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-600 underline"
//                           >
//                             {filename}
//                           </a>
//                         </div>
//                       ))
//                     ) : (
//                       <span>No files</span>
//                     )}
//                   </td>
//                   <td className="border border-gray-300 px-2 py-1">
//                     {new Date(upload.timestamp).toLocaleString()}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// const Input = ({ label, name, value, onChange, type = "text" }) => (
//   <div>
//     <label className="block text-sm font-medium mb-1">{label}</label>
//     <input
//       type={type}
//       name={name}
//       value={value}
//       onChange={onChange}
//       className="w-full border px-3 py-2 rounded"
//     />
//   </div>
// );

// export default ResumeUpload;