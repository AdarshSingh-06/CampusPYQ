import axios from "axios";

const API = axios.create({
    baseURL: "https://campuspyq.onrender.com/api"
});

export default API;