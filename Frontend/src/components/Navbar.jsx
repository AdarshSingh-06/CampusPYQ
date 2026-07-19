import { Link, useNavigate } from "react-router-dom";
import { FaGraduationCap, FaHome } from "react-icons/fa";
import { isLoggedIn } from "../services/auth";

function Navbar() {

  const navigate = useNavigate();

  const handleAdminClick = () => {

    if (isLoggedIn()) {

      const lastPage =
        sessionStorage.getItem("lastPage") || "/dashboard";

      navigate(lastPage);

    } else {

      navigate("/login");

    }

  };

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

       <button
  onClick={handleAdminClick}
  className="admin-link"
>
  Admin
</button>

      </div>

    </nav>

  );

}

export default Navbar;