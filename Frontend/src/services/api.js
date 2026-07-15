import axios from "axios";

const API = axios.create({
  baseURL: "https://campuspyq-production.up.railway.app/api"
});

export default API;