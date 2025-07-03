import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5191/api/Jobs")
      .then((response) => setJobs(response.data))
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  const handlePostJob = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/post-job");
    } else {
      navigate("/login");
    }
  };
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-blue-700 mb-8 text-center">
        Welcome to Job Portal!
      </h1>
      <div className="flex justify-center mb-8">
        <button
          onClick={handlePostJob}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
        >
          Post a Job
        </button>
      </div>
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by title, company, location, or type..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded-lg p-2 w-full max-w-lg"
        />
      </div>
      <h2 className="text-2xl font-bold mb-4">Available Jobs</h2>
      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="border rounded-lg p-4 shadow flex flex-col gap-2"
          >
            <h3 className="text-xl font-semibold">{job.title}</h3>
            <p>
              <strong>Company:</strong> {job.companyName}
            </p>
            <p>
              <strong>Location:</strong> {job.location}
            </p>
            <p>
              <strong>Type:</strong> {job.jobType}
            </p>
            <p>
              <strong>Posted:</strong>{" "}
              {new Date(job.postedDate).toLocaleString()}
            </p>
            <p>{job.description}</p>

            <div className="flex gap-4 mt-3">
              <Link
                to={`/jobs/${job.id}`}
                className="text-blue-600 font-semibold hover:underline"
              >
                View Details
              </Link>
              <button
                onClick={() => {
                  const token = localStorage.getItem("token");
                  if (token) {
                    alert("Applied Successfully!");
                  } else {
                    navigate("/login");
                  }
                }}
                className="text-green-600 font-semibold hover:underline"
              >
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
