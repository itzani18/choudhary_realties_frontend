import { useState } from "react";
import { api } from "../api";

export default function Contact() {

  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    message: ""
  });

  async function submitForm(e) {
    e.preventDefault();
    setLoading(true);
    setNotice(null);

    try {
      await api.post("inquiries/", form);
      setNotice({ type: "success", text: "Inquiry sent successfully!" });
      setForm({ name: "", phone: "", email: "", location: "", message: "" });
    } catch (err) {
      setNotice({ type: "error", text: "Failed to send. Try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-5">

      {/* Page Title */}
      <div className="text-center mb-4">
        <h2 className="fw-bold">Contact Us</h2>
        <p className="text-muted" style={{ maxWidth: 500, margin: "0 auto" }}>
          Call, WhatsApp, or submit an inquiry—our team will reach out instantly.
        </p>
      </div>

      {/* LEFT–RIGHT GRID */}
      <div className="row g-4">

        {/* LEFT = FORM */}
        <div className="col-lg-5">
          <div className="card shadow-sm p-4 rounded-4">

            <h4 className="fw-semibold mb-3">Get In Touch</h4>

            {notice && (
              <div className={`alert ${notice.type === "success" ? "alert-success" : "alert-danger"}`}>
                {notice.text}
              </div>
            )}

            <form onSubmit={submitForm}>
              
              <label className="small">Full Name</label>
              <input
                className="form-control mb-3"
                value={form.name}
                onChange={(e)=>setForm({...form, name:e.target.value})}
                required
              />

              <label className="small">Phone</label>
              <input
                className="form-control mb-3"
                value={form.phone}
                onChange={(e)=>setForm({...form, phone:e.target.value})}
                required
              />

              <label className="small">Email (optional)</label>
              <input
                className="form-control mb-3"
                value={form.email}
                onChange={(e)=>setForm({...form, email:e.target.value})}
              />

              <label className="small">Location (optional)</label>
              <input
                className="form-control mb-3"
                value={form.location}
                onChange={(e)=>setForm({...form, location:e.target.value})}
              />

              <label className="small">Message</label>
              <textarea
                className="form-control mb-3"
                rows="4"
                value={form.message}
                onChange={(e)=>setForm({...form, message:e.target.value})}
              ></textarea>

              <div className="d-flex gap-2">
                <button className="btn btn-primary" disabled={loading}>
                  {loading ? "Sending..." : "Send Inquiry"}
                </button>
                <a className="btn btn-success" href="tel:+919304090717">Call Now</a>
              </div>

            </form>

          </div>
        </div>

        {/* RIGHT = OFFICE IMAGE + INFO */}
        <div className="col-lg-7">
          <div className="card shadow-sm rounded-4 overflow-hidden">

            {/* OFFICE PHOTO */}
            <div style={{ height: 380 }}>
              <img
                src="https://drive.google.com/file/d/1_YfKDLeZvp8GL2ZnPvg_sJMoJwiMiDBt/view?usp=sharing"
                className="w-100 h-100"
                style={{ objectFit: "cover" }}
                alt="office"
              />
            </div>

            <div className="p-4">
              <h4 className="fw-bold">Our Office</h4>
              <p className="text-muted mb-1">Shop No. ,RDA Complex</p>
              <p className="text-muted mb-1">New Rajendra Nagar, Raipur</p>
              <p className="text-muted mb-3">Chhattisgarh, India</p>

              {/* ONLY GOOGLE MAP BUTTON — all others removed */}
              <a
                className="btn btn-success w-100 py-2"
                href="https://www.google.com/maps/place/RDA+Complex/@21.2253757,81.6580507,17z/data=!3m2!4b1!5s0x3a28dd03340c50d9:0x5a37dd35240f00f!4m6!3m5!1s0x3a28dd93c7a3719f:0xb0b6d3e70c9bd26f!8m2!3d21.2253757!4d81.6580507!16s%2Fg%2F1tf6_c3s?entry=ttu&g_ep=EgoyMDI1MTExMC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
              >
                📍 View on Google Maps
              </a>
            </div>

          </div>
        </div>

      </div>

      <div style={{ height: "60px" }}></div>
    </div>
  );
}
