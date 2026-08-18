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
        <span><h1>Campus PYQ</h1></span>
      </Link>

      <div className="nav-links">

        <Link to="/">
          <FaHome />
          <h3>Home</h3>
        </Link>

        <Link to="/branches">
           <h3>📚 Branches</h3>
        </Link>

       <button
  onClick={handleAdminClick}
  className="admin-link"
>
   <h3> 🙎Admin</h3>
</button>

      </div>

    </nav>

  );

}

export default Navbar;