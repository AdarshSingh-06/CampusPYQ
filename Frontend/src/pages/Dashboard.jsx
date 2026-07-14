import { Link } from "react-router-dom";
import {
  FaCodeBranch,
  FaBook,
  FaFolder,
  FaFilePdf,
  FaArrowRight
} from "react-icons/fa";

function Dashboard() {
  return (
    <div className="dashboard-page">

      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Manage your Campus PYQ platform from one place.</p>
      </div>

      <div className="dashboard-grid">

        <Link to="/manage-branch" className="dashboard-card">
          <div className="dashboard-icon">
            <FaCodeBranch />
          </div>

          <h2>Branches</h2>

          <p>Manage all branches.</p>

          <span>
            Open <FaArrowRight />
          </span>
        </Link>

        <Link to="/manage-semester" className="dashboard-card">
          <div className="dashboard-icon">
            <FaBook />
          </div>

          <h2>Semesters</h2>

          <p>Manage semesters.</p>

          <span>
            Open <FaArrowRight />
          </span>
        </Link>

        <Link to="/manage-subject" className="dashboard-card">
          <div className="dashboard-icon">
            <FaFolder />
          </div>

          <h2>Subjects</h2>

          <p>Manage subjects.</p>

          <span>
            Open <FaArrowRight />
          </span>
        </Link>

        <Link to="/manage-pyq" className="dashboard-card">
          <div className="dashboard-icon">
            <FaFilePdf />
          </div>

          <h2>PYQs</h2>

          <p>Upload & manage papers.</p>

          <span>
            Open <FaArrowRight />
          </span>
        </Link>

      </div>

    </div>
  );
}

export default Dashboard;