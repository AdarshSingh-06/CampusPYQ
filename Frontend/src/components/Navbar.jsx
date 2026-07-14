import { Link } from "react-router-dom";
import { FaGraduationCap, FaHome, FaUpload } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="navbar">

      <Link to="/" className="logo">
        <FaGraduationCap />
        <span>Campus PYQ</span>
      </Link>

      <div className="nav-links">

        <Link to="/">
          <FaHome />
          Home
        </Link>

        <Link to="/branches">
          📚 Branches
        </Link>
        
        <Link to="/login">Admin</Link>

      </div>

    </nav>
  );
}

export default Navbar;