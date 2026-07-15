import { Link } from "react-router-dom";
import {
    FaHome,
    FaCodeBranch,
    FaBook,
    FaFolder,
    FaFilePdf,
    FaKey,
    FaSignOutAlt
} from "react-icons/fa";

import { logout } from "../services/auth";
import { useNavigate } from "react-router-dom";

function Sidebar(){

    const navigate=useNavigate();

    return(

        <div className="sidebar">

            <h2>Campus PYQ</h2>

            <Link to="/dashboard">
                <FaHome/> Dashboard
            </Link>

            <Link to="/manage-branch">
                <FaCodeBranch/> Branch
            </Link>

            <Link to="/manage-semester">
                <FaBook/> Semester
            </Link>

            <Link to="/manage-subject">
                <FaFolder/> Subject
            </Link>

            <Link to="/manage-pyq">
                <FaFilePdf/> PYQ
            </Link>
            <Link to="/change-password">
    <FaKey/> Change Password
</Link>

            <button
                className="logout-btn"
                onClick={()=>{

                    logout();

                    navigate("/login");

                }}
            >
                <FaSignOutAlt/>

                Logout

            </button>

        </div>

    );

}

export default Sidebar;