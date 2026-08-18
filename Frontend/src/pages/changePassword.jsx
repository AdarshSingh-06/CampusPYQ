import { useState, useEffect } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { toast } from "react-toastify";

function ChangePassword() {

    useEffect(() => {
        sessionStorage.setItem(
            "lastPage",
            "/change-password"
        );
    }, []);


    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const changePassword = async () => {

        /* =========================
           VALIDATION
        ========================= */

        if (
            currentPassword === "" ||
            newPassword === "" ||
            confirmPassword === ""
        ) {
            toast.warning("Fill all fields");
            return;
        }


        if (newPassword !== confirmPassword) {
            toast.error("New password and confirm password do not match");
            return;
        }


        if (newPassword.length < 6) {
            toast.warning(
                "New password must be at least 6 characters"
            );
            return;
        }


        /* =========================
           API REQUEST
        ========================= */

        try {

            const res = await API.post(
                "/admin/change-password",
                {
                    username: "admin",
                    currentPassword: currentPassword,
                    newPassword: newPassword,
                    confirmPassword: confirmPassword
                }
            );


            /* =========================
               SUCCESS
            ========================= */

            if (res.data.success) {

                toast.success(
                    res.data.message || "Password changed successfully"
                );

                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");

            } else {

                toast.error(
                    res.data.message || "Password change failed"
                );

            }

        } catch (err) {

            console.error(
                "Change password error:",
                err
            );

            toast.error(
                err.response?.data?.message ||
                "Server Error"
            );

        }

    };


    return (

        <div className="admin-container">

            {/* SIDEBAR */}

            <Sidebar />


            {/* MAIN CONTENT */}

            <div className="content">

                <Topbar />


                <div
                    className="card"
                    style={{
                        maxWidth: "600px",
                        margin: "30px auto",
                        padding: "30px"
                    }}
                >

                    <h2>
                        🔐 Change Password
                    </h2>


                    <p
                        style={{
                            color: "#6b7280",
                            marginBottom: "25px"
                        }}
                    >
                        Update your admin account password.
                    </p>


                    {/* CURRENT PASSWORD */}

                    <input
                        type="password"
                        placeholder="Current Password"
                        value={currentPassword}
                        onChange={(e) =>
                            setCurrentPassword(e.target.value)
                        }
                        style={{
                            width: "100%",
                            boxSizing: "border-box",
                            padding: "14px",
                            marginBottom: "15px",
                            borderRadius: "10px",
                            border: "1px solid #d1d5db",
                            fontSize: "16px"
                        }}
                    />


                    {/* NEW PASSWORD */}

                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) =>
                            setNewPassword(e.target.value)
                        }
                        style={{
                            width: "100%",
                            boxSizing: "border-box",
                            padding: "14px",
                            marginBottom: "15px",
                            borderRadius: "10px",
                            border: "1px solid #d1d5db",
                            fontSize: "16px"
                        }}
                    />


                    {/* CONFIRM PASSWORD */}

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(e.target.value)
                        }
                        style={{
                            width: "100%",
                            boxSizing: "border-box",
                            padding: "14px",
                            marginBottom: "20px",
                            borderRadius: "10px",
                            border: "1px solid #d1d5db",
                            fontSize: "16px"
                        }}
                    />


                    {/* BUTTON */}

                    <button
                        className="primary-btn"
                        onClick={changePassword}
                        style={{
                            width: "100%"
                        }}
                    >
                        🔑 Change Password
                    </button>

                </div>

            </div>

        </div>

    );
}

export default ChangePassword;