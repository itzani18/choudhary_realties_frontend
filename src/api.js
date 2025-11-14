// frontend/src/api.js
import axios from "axios";

export const api = axios.create({
  baseURL: "https://choudhary-realties-backend.onrender.com/api/",// adjust if you deploy to other base url
  headers: { "Accept": "application/json" },
});

// attach token on each request if present
api.interceptors.request.use(config => {
  const token = localStorage.getItem("admin_token");

  // PUBLIC ENDPOINTS (GET + POST both allowed)
  const publicEndpoints = [
    "properties/",
    "properties",
    "inquiries/",
    "inquiries",
  ];

  // If endpoint is PUBLIC → do NOT attach token
  if (publicEndpoints.some(ep => config.url.includes(ep))) {
    return config;
  }

  // Admin endpoints → attach token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


