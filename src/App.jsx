import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import JobList from "./Pages/JobList";
import PostJob from "./Pages/PostJob";
import Login from "./Pages/Login";
// (Optional) import JobDetails if you add it later
import JobDetails from "./Pages/JobDetails";
import Register from "./Pages/Register";

function App() {
  return (
    <Router>
      {/* Navbar visible on all pages */}
      <Navbar />

      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/job-list" element={<JobList />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/login" element={<Login />} />
        (Optional)
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
