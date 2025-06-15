import React, { useState } from "react";

const ToggleSwitch = ({ label, checked, onChange }) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-800 font-medium">{label}</span>
      <button
        onClick={onChange}
        className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
          checked ? "bg-green-500" : "bg-gray-300"
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
            checked ? "translate-x-6" : "translate-x-0"
          }`}
        ></div>
      </button>
    </div>
  );
};

const SystemSettings = () => {
  const [uploadPaused, setUploadPaused] = useState(false);
  const [websiteEnabled, setWebsiteEnabled] = useState(true);
  const [aiScreening, setAiScreening] = useState(true);
  const [betaFeatures, setBetaFeatures] = useState(false);
  const [notificationsAllowed, setNotificationsAllowed] = useState(true);
  const [autoApproval, setAutoApproval] = useState(false);

  const handleSave = () => {
    alert("Settings saved successfully!");
    console.log({
      uploadPaused,
      websiteEnabled,
      aiScreening,
      betaFeatures,
      notificationsAllowed,
      autoApproval,
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">System Settings</h2>

      <div className="space-y-6">

        <ToggleSwitch
          label="Pause Resume Uploads"
          checked={uploadPaused}
          onChange={() => setUploadPaused(!uploadPaused)}
        />

        <ToggleSwitch
          label="Website Status (Enabled)"
          checked={websiteEnabled}
          onChange={() => setWebsiteEnabled(!websiteEnabled)}
        />

        <ToggleSwitch
          label="Enable AI Screening"
          checked={aiScreening}
          onChange={() => setAiScreening(!aiScreening)}
        />

        <ToggleSwitch
          label="Enable Beta Features"
          checked={betaFeatures}
          onChange={() => setBetaFeatures(!betaFeatures)}
        />

        <ToggleSwitch
          label="Allow Email Notifications"
          checked={notificationsAllowed}
          onChange={() => setNotificationsAllowed(!notificationsAllowed)}
        />

        <ToggleSwitch
          label="Auto-Approve Job Applications"
          checked={autoApproval}
          onChange={() => setAutoApproval(!autoApproval)}
        />
      </div>

      <div className="text-right mt-8">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default SystemSettings;
