import DataTable from "react-data-table-component";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function JobList() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5191/api/Jobs")
      .then((response) => setJobs(response.data))
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  const handleApply = (id) => {
    const token = localStorage.getItem("token");
    if (token) {
      alert(`Applied for job ID: ${id}`);
    } else {
      navigate("/login");
    }
  };

  const columns = [
    { name: "Title", selector: (row) => row.title, sortable: true },
    { name: "Company", selector: (row) => row.companyName, sortable: true },
    { name: "Location", selector: (row) => row.location, sortable: true },
    { name: "Type", selector: (row) => row.jobType },
    {
      name: "Posted",
      selector: (row) => new Date(row.postedDate).toLocaleString(),
    },
    { name: "Description", selector: (row) => row.description },
    {
      name: "Actions",
      cell: (row) => (
        <div className="space-x-2">
          <Link
            to={`/jobs/${row.id}`}
            className="text-blue-600 font-semibold hover:underline"
          >
            View
          </Link>
          <button
            onClick={() => handleApply(row.id)}
            className="text-green-600 font-semibold hover:underline"
          >
            Apply
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Job Listings</h1>
      <DataTable
        columns={columns}
        data={jobs}
        pagination
        highlightOnHover
        responsive
      />
    </div>
  );
}
export default JobList;
