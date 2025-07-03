import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5191/api/Jobs/${id}`)
      .then((response) => setJob(response.data))
      .catch((error) => console.error("Error fetching job details:", error));
  }, [id]);

  if (!job)
    return <div className="p-4 text-center">Loading job details...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
      <p className="text-gray-700 mb-2">Company: {job.companyName}</p>
      <p className="text-gray-700 mb-2">Location: {job.location}</p>
      <p className="text-gray-700 mb-2">Type: {job.jobType}</p>
      <p className="text-gray-700 mb-2">
        Posted: {new Date(job.postedDate).toLocaleString()}
      </p>
      <p className="text-gray-700 mb-6">{job.description}</p>

      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Back
      </button>
    </div>
  );
}

export default JobDetails;
