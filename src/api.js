// frontend/src/api.js
import axios from "axios";

export const api = axios.create({
  baseURL: "https://choudhary-realties-backend.onrender.com/api/",// adjust if you deploy to other base url
  headers: { "Accept": "application/json" },
});

// attach token on each request if present
api.interceptors.request.use(config => {
  const token = localStorage.getItem("admin_token");

  // Only skip token for GET requests to public endpoints
  const publicGET = [
    "properties/",
    "properties",
  ];

  if (config.method === "get" &&
      publicGET.some(ep => config.url.includes(ep))) {
    return config;
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});



