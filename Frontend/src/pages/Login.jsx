import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { login } from "../services/auth";
import { toast } from "react-toastify";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        try {

            const res = await API.post("/admin/login", {
                username,
                password
            });

            if (res.data.success) {

               login();

toast.success("Login Successful");

const lastPage =
    sessionStorage.getItem("lastAdminPage") || "/dashboard";

navigate(lastPage);
            } else {

              toast.error("Invalid Username or Password");

            }

        } catch (err) {

           toast.error("Server Error");

        }

    };

   return (

<div className="login-page">

<div className="login-card">

<h1>Campus PYQ</h1>

<p>Admin Login</p>

<input
type="text"
placeholder="Username"
value={username}
onChange={(e)=>setUsername(e.target.value)}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<button
className="login-btn"
onClick={handleLogin}
>

Login

</button>

<div className="login-footer">

© 2026 Campus PYQ

</div>

</div>

</div>

);

} 
export default Login;