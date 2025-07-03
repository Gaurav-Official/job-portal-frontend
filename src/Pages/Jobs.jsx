import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5191/api/Jobs")
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  }, []);

  const deleteJob = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await axios.delete(`http://localhost:5191/api/Jobs/${id}`);
        // Remove job from state without reloading
        setJobs(jobs.filter((job) => job.id !== id));
      } catch (error) {
        console.error("Error deleting job:", error);
        alert("Failed to delete job.");
      }
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Available Job Listings
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              {job.title}
            </h3>
            <p className="text-gray-700">
              <strong>Company:</strong> {job.companyName}
            </p>
            <p className="text-gray-700">
              <strong>Location:</strong> {job.location}
            </p>
            <p className="text-gray-700">
              <strong>Type:</strong> {job.jobType}
            </p>
            <p className="text-gray-600">
              <strong>Posted:</strong>{" "}
              {new Date(job.postedDate).toLocaleString()}
            </p>
            <p className="text-gray-800 mt-2">{job.description}</p>
            <Link
              to={`/jobs/${job.id}`}
              className="text-blue-600 font-semibold mt-3 inline-block hover:underline"
            >
              View Details
            </Link>
            <button
              onClick={() => deleteJob(job.id)}
              className="mt-3 text-red-600 font-semibold hover:underline ml-4"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Jobs;
