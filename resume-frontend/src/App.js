import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/common/Login";
import Signup from "./components/common/Signup";
import GetStarted from "./components/common/GetStarted";
import AdminDashboard from "./components/admin/AdminDashboard";
import AddTeamLeader from "./components/admin/AddTeamLeader";
import AddRecruiter from "./components/admin/AddRecruiter";
import TeamLeaderDashboard from "./components/teamlead/TeamLeaderDashboard";
import TeamLeaderProfileSetup from "./components/teamlead/TeamLeaderProfileSetup";
import TeamLeaderMainDashboard from "./components/teamlead/TeamLeaderMainDashboard";
import RecruiterDashboard from "./components/recruiter/RecruiterDashboard";
import CandidatesApplied from "./components/recruiter/CandidatesApplied";
import RecruiterDashboardMain from "./components/recruiter/RecruiterDashboardMain";
import TotalJobs from "./components/recruiter/TotalJobsR";
import ResumeUpload from "./components/recruiter/ResumeUpload";
import AllResumes from "./components/AllResumes";
import AIShortlist from "./components/AIShortlist";
import PipelinePage from "./components/recruiter/PipelinePage";

import OfficialLandingPage from "./components/OfficialLandingPage";

import CandAuth from "./components/candidate/CandAuth";
import CandDashboard from "./components/candidate/CandDashboard";
import CandidateForm from "./components/candidate/CandidateForm";

import ArchivedCandidates from "./components/ArchivedCandidates";

import AddJob from "./components/AddJob";
import JobBoard from "./components/JobBoard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/signup" element={<Signup />} /> */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add-team-leader" element={<AddTeamLeader />} />
        <Route path="/admin/add-recruiter" element={<AddRecruiter />} />
        {/* <Route path="/team-leader" element={<TeamLeaderDashboard />} /> */}
        {/* <Route path="/team-leader/setup-profile" element={<TeamLeaderProfileSetup />} /> */}
        <Route path="/team-leader/home" element={<TeamLeaderMainDashboard />} />
        {/* <Route path="/recruiter" element={<RecruiterDashboard />} /> */}
        <Route path="/recruiter/candidates-applied" element={<CandidatesApplied />} />
        <Route path="/recruiter/home" element={<RecruiterDashboardMain />} />
        <Route path="/recruiter/total-jobs" element={<TotalJobs />} />
        <Route path="/upload-resume" element={<ResumeUpload />} />
        <Route path="/all-resumes" element={<AllResumes />} />
        <Route path="/ai-shortlist" element={<AIShortlist />} />
        <Route path="/recruiter/pipeline" element={<PipelinePage />} />

        <Route path="/officialpage" element={<OfficialLandingPage />} />

        <Route path="/candidate-auth" element={<CandAuth />} />
        <Route path="/candidate-dashboard" element={<CandDashboard />} />
        <Route path="/candidate-form" element={<CandidateForm />} />

        <Route path="/archived-candidates" element={<ArchivedCandidates />} />

        <Route path="/recruiter/add-job" element={<AddJob />} />
        <Route path="/job-board" element={<JobBoard />} />



        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
