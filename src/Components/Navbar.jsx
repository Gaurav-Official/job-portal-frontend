import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white flex items-center justify-between px-6 py-4 shadow-md">
      <div className="text-2xl font-bold">
        <Link to="/">JobPortal</Link>
      </div>
      <div className="space-x-6 text-lg">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/job-list" className="hover:underline">
          Jobs
        </Link>
        <Link to="/post-job" className="hover:underline">
          Post Job
        </Link>
        {token ? (
          <button onClick={handleLogout} className="hover:underline">
            Logout
          </button>
        ) : (
          <Link to="/login" className="hover:underline">
            Login
          </Link>
        )}
        <Link to="/register" className="hover:underline">
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
