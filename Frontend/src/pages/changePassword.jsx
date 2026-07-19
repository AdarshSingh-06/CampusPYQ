import { useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { toast } from "react-toastify";


function ChangePassword() {
    useEffect(() => {
    sessionStorage.setItem("lastPage", "/change-password");
}, []);


    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const changePassword = async () => {

        if (
            currentPassword === "" ||
            newPassword === "" ||
            confirmPassword === ""
        ) {
            toast.warning("Fill all fields");
            return;
        }

        try {

            const res = await API.post("/admin/change-password", {
                username: "admin",
                currentPassword,
                newPassword,
                confirmPassword
            });

            if (res.data.success) {

                toast.success(res.data.message);

                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");

            } else {

                toast.error(res.data.message);

            }

        } catch (err) {

            toast.error("Server Error");

        }

    };

    return (

        <div className="admin-container">

            <Sidebar />

            <div className="content">

                <Topbar />

                <div className="card">

                    <h2>Change Password</h2>

                    <input
                        type="password"
                        placeholder="Current Password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />

                    <br /><br />

                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />

                    <br /><br />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <br /><br />

                    <button
                        className="primary-btn"
                        onClick={changePassword}
                    >
                        Change Password
                    </button>

                </div>

            </div>

        </div>

    );

}

export default ChangePassword;