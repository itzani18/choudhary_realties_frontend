// frontend/src/api.js
import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",// adjust if you deploy to other base url
  headers: { "Accept": "application/json" },
});

// attach token on each request if present
api.interceptors.request.use(config => {
  const token = localStorage.getItem("admin_token");

  // PUBLIC GET endpoints (no token required)
  const publicGET = [
    "properties/",
    "properties",
    "inquiries/",
    "inquiries",
  ];

  // If GET + public endpoint → don't attach token
  if (config.method === "get" && publicGET.some(ep => config.url.includes(ep))) {
    return config;
  }

  // For POST/PUT/DELETE → ALWAYS attach admin token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

