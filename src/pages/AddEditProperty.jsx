import { useState, useEffect } from "react";
import { api } from "../api";
import { useNavigate, useParams } from "react-router-dom";

export default function AddEditProperty() {
  const { id } = useParams();
  const nav = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    property_type: "",

    bedrooms: "",
    bathrooms: "",

    plot_area: "",
    carpet_area: "",
    super_builtup_area: "",
  });

  const [loading, setLoading] = useState(false);

  // Load existing property on edit
  useEffect(() => {
    if (id) {
      setLoading(true);
      api.get(`properties/${id}/`)
        .then(res => {
          setForm({
            title: res.data.title,
            description: res.data.description,
            price: res.data.price,
            location: res.data.location,
            property_type: res.data.property_type,

            bedrooms: res.data.bedrooms || "",
            bathrooms: res.data.bathrooms || "",

            plot_area: res.data.plot_area || "",
            carpet_area: res.data.carpet_area || "",
            super_builtup_area: res.data.super_builtup_area || "",
          });
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  // CLEANER FUNCTION → convert "" → null
  function cleanFormData(obj) {
    const clean = {};
    Object.keys(obj).forEach(key => {
      clean[key] = obj[key] === "" ? null : obj[key];
    });
    return clean;
  }

  // Submit handler
  async function submit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const cleaned = cleanFormData(form);

      let res;
      if (id) {
        res = await api.put(`properties/${id}/`, cleaned);
      } else {
        res = await api.post("properties/", cleaned);
      }

      const propId = res.data.id;
      nav(`/admin/property/${propId}/images`);
    } catch (error) {
      console.error(error);
      alert("Failed to save property. Check required fields.");
    }

    setLoading(false);
  }

  return (
    <div className="container mt-5" style={{ maxWidth: 900 }}>
      <h3>{id ? "Edit Property" : "Add Property"}</h3>

      <form onSubmit={submit} className="mt-3">
        <div className="row g-3">

          {/* Title */}
          <div className="col-md-8">
            <input
              className="form-control"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>

          {/* Location */}
          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Location"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              required
            />
          </div>

          {/* Price */}
          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Price (₹)"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
            />
          </div>

          {/* Property Type */}
          <div className="col-md-4">
            <select
              className="form-control"
              value={form.property_type}
              onChange={(e) => setForm({ ...form, property_type: e.target.value })}
              required
            >
              <option value="">Select Property Type</option>
              <option value="House">House</option>
              <option value="Flat">Flat</option>
              <option value="Villa">Villa</option>
              <option value="Office">Office</option>
              <option value="Shop">Shop</option>
              <option value="Showroom">Showroom</option>
              <option value="Plot">Plot</option>
            </select>
          </div>

          {/* AREA FIELDS — ALWAYS SHOW */}

          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Plot Area (sq.ft)"
              value={form.plot_area}
              onChange={(e) => setForm({ ...form, plot_area: e.target.value })}
            />
          </div>

          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Carpet Area (sq.ft)"
              value={form.carpet_area}
              onChange={(e) => setForm({ ...form, carpet_area: e.target.value })}
            />
          </div>

          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Super Built-up Area (sq.ft)"
              value={form.super_builtup_area}
              onChange={(e) => setForm({ ...form, super_builtup_area: e.target.value })}
            />
          </div>

          {/* HOUSE-ONLY FIELDS */}

          {["House", "Flat", "Villa"].includes(form.property_type) && (
            <>
              <div className="col-md-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Bedrooms"
                  value={form.bedrooms}
                  onChange={(e) => setForm({ ...form, bedrooms: e.target.value })}
                />
              </div>

              <div className="col-md-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Bathrooms"
                  value={form.bathrooms}
                  onChange={(e) => setForm({ ...form, bathrooms: e.target.value })}
                />
              </div>
            </>
          )}

          {/* Description */}
          <div className="col-12">
            <textarea
              className="form-control"
              placeholder="Description"
              rows={5}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          {/* Buttons */}
          <div className="col-12 d-flex gap-2">
            <button className="btn btn-primary" disabled={loading}>
              {loading ? "Saving..." : id ? "Update Property" : "Create Property"}
            </button>

            {id && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => nav(`/admin/property/${id}/images`)}
              >
                Manage Images
              </button>
            )}

            <button type="button" className="btn btn-outline-secondary" onClick={() => nav(-1)}>
              Cancel
            </button>
          </div>

        </div>
      </form>
    </div>
  );
}
