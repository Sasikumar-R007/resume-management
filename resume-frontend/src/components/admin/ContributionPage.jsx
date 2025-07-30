// src/components/admin/ContributionPage.jsx
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

const ContributionPage = () => {
  const navigate = useNavigate();
  const teamLeaders = ["Leader 1", "Leader 2", "Leader 3"];
  const contributors = ["Alice", "Bob", "Charlie", "David", "Emma"];
  const schemeOptions = ["0-30L", "30L-50L", "50L+"];

  const [contributions, setContributions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    leader: "",
    quarter: "",
    contributor: "",
    revenue: "",
    client: "",
    position: "",
    offerDate: "",
    joiningDate: "",
    scheme: "",
    incentive: "",
  });

  const openModal = (index = null) => {
    if (index !== null) {
      const selected = contributions[index];
      setFormData(selected);
      setIsEditMode(true);
      setEditId(selected._id); // Use _id instead of array index
    } else {
      setFormData({
        leader: "",
        quarter: "",
        contributor: "",
        revenue: "",
        client: "",
        position: "",
        offerDate: "",
        joiningDate: "",
        scheme: "",
        incentive: "",
      });
      setIsEditMode(false);
      setEditId(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrEdit = async () => {
    try {
      if (isEditMode) {
        await axios.put(
          `http://localhost:5000/api/contributions/${editId}`,
          formData
        );
      } else {
        await axios.post("http://localhost:5000/api/contributions", formData);
      }

      const response = await axios.get(
        "http://localhost:5000/api/contributions"
      );
      setContributions(response.data);
      closeModal();
    } catch (error) {
      console.error("Error saving contribution:", error);
    }
  };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/contributions/${id}`);
//       setContributions((prev) => prev.filter((item) => item._id !== id));
//     } catch (error) {
//       console.error("Error deleting contribution:", error);
//     }
//   };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/contributions/${deleteId}`);
      setContributions(prev => prev.filter(item => item._id !== deleteId));
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setShowConfirm(false);
      setDeleteId(null);
    }
  };
  

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/contributions"
        );
        setContributions(response.data);
      } catch (err) {
        console.error("Failed to fetch contributions:", err);
      }
    };
    fetchContributions();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Contributions</h1>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Contribution
        </button>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-200 text-black hover:bg-gray-300 rounded"
      >
        ← Back to Dashboard
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              {[
                "Team Leader",
                "Quarter",
                "Contributor",
                "Revenue",
                "Client",
                "Position",
                "Offer Date",
                "Joining Date",
                "Scheme",
                "Incentive",
                "Actions",
              ].map((head) => (
                <th key={head} className="p-2 border">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {contributions.map((item, index) => (
              <tr key={item._id || index} className="text-center">
                <td className="p-2 border">{item.leader}</td>
                <td className="p-2 border">{item.quarter}</td>
                <td className="p-2 border">{item.contributor}</td>
                <td className="p-2 border">{item.revenue}</td>
                <td className="p-2 border">{item.client}</td>
                <td className="p-2 border">{item.position}</td>
                <td className="p-2 border">
                  {item.offerDate
                    ? new Date(item.offerDate).toLocaleDateString()
                    : ""}
                </td>
                <td className="p-2 border">
                  {item.joiningDate
                    ? new Date(item.joiningDate).toLocaleDateString()
                    : ""}
                </td>
                <td className="p-2 border">{item.scheme}</td>
                <td className="p-2 border">{item.incentive}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => openModal(index)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    // onClick={() => handleDelete(item._id)}
                    className="text-red-600 hover:text-red-800 ml-2"
                  >
                    <Trash2
                      className="text-red-600 cursor-pointer"
                      size={18}
                      onClick={() => {
                        setDeleteId(item._id); // Store the selected ID
                        setShowConfirm(true); // Open the confirmation modal
                      }}
                    />
                  </button>
                </td>
              </tr>
            ))}

            {contributions.length === 0 && (
              <tr>
                <td colSpan="11" className="p-4 text-center text-gray-500">
                  No contributions added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="bg-white p-6 rounded shadow-md max-w-xl mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <h2 className="text-xl font-bold mb-4">
          {isEditMode ? "Edit Contribution" : "Add Contribution"}
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block">Team Leader</label>
            <select
              name="leader"
              value={formData.leader}
              onChange={handleChange}
              className="w-full border p-2"
            >
              <option value="">Select</option>
              {teamLeaders.map((name) => (
                <option key={name}>{name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block">Quarter</label>
            <input
              type="text"
              name="quarter"
              value={formData.quarter}
              onChange={handleChange}
              className="w-full border p-2"
            />
          </div>

          <div>
            <label className="block">Contributor</label>
            <select
              name="contributor"
              value={formData.contributor}
              onChange={handleChange}
              className="w-full border p-2"
            >
              <option value="">Select</option>
              {contributors.map((name) => (
                <option key={name}>{name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block">Revenue</label>
            <input
              type="text"
              name="revenue"
              value={formData.revenue}
              onChange={handleChange}
              className="w-full border p-2"
            />
          </div>

          <div>
            <label className="block">Client</label>
            <input
              type="text"
              name="client"
              value={formData.client}
              onChange={handleChange}
              className="w-full border p-2"
            />
          </div>
          <div>
            <label className="block">Position</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="w-full border p-2"
            />
          </div>

          <div>
            <label className="block">Offer Date</label>
            <input
              type="date"
              name="offerDate"
              value={formData.offerDate}
              onChange={handleChange}
              className="w-full border p-2"
            />
          </div>
          <div>
            <label className="block">Joining Date</label>
            <input
              type="date"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleChange}
              className="w-full border p-2"
            />
          </div>

          <div>
            <label className="block">Scheme</label>
            <select
              name="scheme"
              value={formData.scheme}
              onChange={handleChange}
              className="w-full border p-2"
            >
              <option value="">Select</option>
              {schemeOptions.map((scheme) => (
                <option key={scheme}>{scheme}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block">Incentive</label>
            <input
              type="text"
              name="incentive"
              value={formData.incentive}
              onChange={handleChange}
              className="w-full border p-2"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={closeModal}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleAddOrEdit}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {isEditMode ? "Save Changes" : "Add"}
          </button>
        </div>
      </Modal>

      {/* ✅ Modal rendered here — outside the table */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-4">Are you sure you want to delete this record?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  confirmDelete(); // Call actual delete here
                }}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContributionPage;
