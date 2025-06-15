import React from "react";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";

const AddTeamLeader = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow mt-8 relative">
      {/* Header with title and close icon in one row */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Create New Team Leader</h2>
        <button
          onClick={() => navigate(-1)}
          aria-label="Close"
          className="text-gray-600 hover:text-black text-3xl font-bold"
        >
          <IoClose />
        </button>
      </div>

      <p className="mb-6 text-gray-600">
        Add a new team leader to the system. They will receive a confirmation email.
      </p>

      {/* Form */}
      <form>
        <label className="block mb-2 font-semibold" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter email"
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
        />

        <label className="block mb-2 font-semibold" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter password"
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
        />

        <label className="block mb-2 font-semibold" htmlFor="firstName">
          First Name
        </label>
        <input
          id="firstName"
          type="text"
          placeholder="Enter first name"
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
        />

        <label className="block mb-2 font-semibold" htmlFor="lastName">
          Last Name
        </label>
        <input
          id="lastName"
          type="text"
          placeholder="Enter last name"
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
        />

        <label className="block mb-2 font-semibold" htmlFor="companyName">
          Company Name
        </label>
        <input
          id="companyName"
          type="text"
          placeholder="Enter company name"
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
        />

        <label className="block mb-2 font-semibold" htmlFor="position">
          Position
        </label>
        <input
          id="position"
          type="text"
          placeholder="Enter position"
          className="w-full mb-6 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded hover:bg-gray-900 transition"
        >
          Create Team Leader
        </button>
      </form>
    </div>
  );
};

export default AddTeamLeader;
