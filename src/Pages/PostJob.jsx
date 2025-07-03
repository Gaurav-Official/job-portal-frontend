import { useState } from "react";
import axios from "axios";

function PostJob() {
  // Declare state variables for form inputs
  const [title, setTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [description, setDescription] = useState("");

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newJob = {
      title,
      companyName,
      location,
      jobType,
      description,
      postedDate: new Date(),
    };

    try {
      await axios.post("http://localhost:5191/api/Jobs", newJob);
      alert("Job posted successfully!");
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Failed to post job.");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow mt-6">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Post a New Job</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-medium text-gray-700">Job Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border rounded p-2 mt-1"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">
            Company Name:
          </label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            className="w-full border rounded p-2 mt-1"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="w-full border rounded p-2 mt-1"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Job Type:</label>
          <input
            type="text"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            required
            className="w-full border rounded p-2 mt-1"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">
            Description:
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full border rounded p-2 mt-1"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
        >
          Post Job
        </button>
      </form>
    </div>
  );
}

export default PostJob;
