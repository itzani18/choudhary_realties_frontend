// frontend/src/pages/AdminLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

export default function AdminLogin(){
  const [u, setU] = useState(""); const [p, setP] = useState("");
  const nav = useNavigate();

  async function submit(e){
    e.preventDefault();
    try {
      const res = await api.post("token/", { username: u, password: p });
      localStorage.setItem("admin_token", res.data.access);
      nav("/admin/dashboard");
    } catch(err){
      alert("Login failed - check username/password or backend JWT endpoint.");
    }
  }

  return (
    <div className="container mt-5" style={{maxWidth:420}}>
      <h3 className="mb-3">Agent Login</h3>
      <form onSubmit={submit}>
        <input className="form-control mb-2" placeholder="username" value={u} onChange={e=>setU(e.target.value)} />
        <input type="password" className="form-control mb-2" placeholder="password" value={p} onChange={e=>setP(e.target.value)} />
        <button className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
}
