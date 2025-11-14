// frontend/src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { api } from "../api";
import { Link } from "react-router-dom";

export default function AdminDashboard(){
  const [propsList, setPropsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(null); // {src, title}
  const [confirmDelete, setConfirmDelete] = useState(null); // id

  useEffect(()=> load(), []);

  function load(){
    setLoading(true);
    api.get("properties/").then(r => setPropsList(r.data)).catch(console.error).finally(()=> setLoading(false));
  }

  async function remove(id){
    setConfirmDelete(id);
  }

  async function confirmRemove(){
    try {
      await api.delete(`properties/${confirmDelete}/`);
      setConfirmDelete(null);
      load();
    } catch(err){
      alert("Delete failed. Check permissions.");
    }
  }

  async function toggleSold(id){
    try {
      // backend toggle action is `toggle_sold` as per API (POST)
      await api.post(`properties/${id}/toggle_sold/`);
      load();
    } catch(err){
      alert("Toggle failed.");
    }
  }

  if(loading) return <div className="text-center py-5"><div className="spinner-border text-primary"/></div>;

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Admin Dashboard</h2>
        <Link to="/admin/add" className="btn btn-primary">Add Property</Link>
      </div>

      <div className="row g-4">
        {propsList.map(p => (
          <div key={p.id} className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div style={{height:200, overflow:'hidden', position:'relative', cursor:'pointer'}} onClick={() => setPreview({ src: p.images?.[0]?.image, title: p.title })}>
                {p.images?.[0]?.image ? <img src={p.images[0].image} alt={p.title} className="w-100" style={{objectFit:'cover', height:200}} /> : <div className="bg-light d-flex align-items-center justify-content-center" style={{height:200}}>No image</div>}
                {p.sold_out && <span className="badge bg-danger position-absolute m-2">SOLD</span>}
              </div>

              <div className="card-body d-flex flex-column">
                <h5 className="mb-1">{p.title}</h5>
                <p className="text-muted mb-2">{p.location}</p>
                <div className="mt-auto d-flex gap-2">
                  <Link className="btn btn-sm btn-outline-primary" to={`/admin/edit/${p.id}`}>Edit</Link>
                  <button className="btn btn-sm btn-danger" onClick={()=>remove(p.id)}>Delete</button>
                  <button className="btn btn-sm btn-warning" onClick={()=>toggleSold(p.id)}>{p.sold_out ? "Mark Available":"Mark Sold"}</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Image preview modal */}
      {preview && (
        <div className="modal-backdrop" onClick={()=>setPreview(null)} style={{position:'fixed', inset:0, display:'flex', alignItems:'center', justifyContent:'center', zIndex:2000}}>
          <div className="card p-3" style={{maxWidth:900}}>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="mb-0">{preview.title}</h5>
              <button className="btn btn-sm btn-outline-secondary" onClick={()=>setPreview(null)}>Close</button>
            </div>
            <img src={preview.src} alt={preview.title} style={{width:'100%', maxHeight:600, objectFit:'cover'}}/>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {confirmDelete && (
        <div className="modal-backdrop" style={{position:'fixed', inset:0, display:'flex', alignItems:'center', justifyContent:'center', zIndex:2000}}>
          <div className="card p-3" style={{width:420}}>
            <h5>Confirm Delete?</h5>
            <p className="text-muted">This will permanently delete the property and all images.</p>
            <div className="d-flex gap-2 justify-content-end">
              <button className="btn btn-outline-secondary" onClick={()=>setConfirmDelete(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={confirmRemove}>Delete</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
