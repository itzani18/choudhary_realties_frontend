import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api";
import Loader from "../components/Loader";
import PropertyCarousel from "../components/PropertyCarousel";

export default function PropertyDetail() {
  const { id } = useParams();
  const [prop, setProp] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: ""
  });

  useEffect(() => {
    api.get(`properties/${id}/`)
      .then((res) => setProp(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  function submitInquiry(e) {
    e.preventDefault();
    api.post("inquiries/", { ...form, property: id })
      .then(() => {
        alert("Inquiry submitted!");
        setForm({ name: "", phone: "", message: "" });
      })
      .catch(() => alert("Failed to send!"));
  }

  if (loading) return <Loader />;
  if (!prop) return <div className="container mt-5"><p>Property not found.</p></div>;

  return (
    <div className="container mt-4 mb-5">

      {/* =================== CAROUSEL =================== */}
      <div className="detail-carousel">
        <PropertyCarousel
          images={prop.images}
          carouselId={`detail-${prop.id}`}
          fullSize={true}
        />

      </div>

      {/* =================== TITLE & PRICE =================== */}
      <div className="mt-4">
        <h2 className="fw-bold">{prop.title}</h2>
        <p className="text-muted mb-1">
          <i className="bi bi-geo-alt-fill text-danger me-1"></i>
          {prop.location}
        </p>
        <h3 className="text-primary fw-bold">₹{prop.price}</h3>
      </div>

      {/* =================== LAYOUT =================== */}
      <div className="row mt-4">

        {/* LEFT SIDE CONTENT */}
        <div className="col-lg-8">

          {/* Description */}
          <section className="mb-4">
            <h5 className="fw-bold">Property Description</h5>
            <p className="text-muted">{prop.description || "No description available."}</p>
          </section>

          {/* Key Details */}
          <section className="mb-4">
            <h5 className="fw-bold">Key Details</h5>

            <div className="key-grid mt-3">
              <div className="key-box">
                <i className="bi bi-building fs-3 text-primary"></i>
                <p className="key-title">Type</p>
                <p className="key-value">{prop.property_type}</p>
              </div>

              <div className="key-box">
                <i className="bi bi-door-open fs-3 text-primary"></i>
                <p className="key-title">Bedrooms</p>
                <p className="key-value">{prop.bedrooms}</p>
              </div>

              <div className="key-box">
                <i className="bi bi-droplet fs-3 text-primary"></i>
                <p className="key-title">Bathrooms</p>
                <p className="key-value">{prop.bathrooms}</p>
              </div>

              <div className="key-box">
                <i className="bi bi-aspect-ratio fs-3 text-primary"></i>
                <p className="key-title">Area</p>
                <p className="key-value">{prop.area} sq.ft</p>
              </div>
            </div>

          </section>

        </div>

        {/* RIGHT SIDE ENQUIRY CARD */}
        <div className="col-lg-4">
          <div className="enquiry-card shadow-sm p-4 rounded-4 position-sticky" style={{ top: "90px" }}>
            <h5 className="fw-bold mb-3">Enquire Now</h5>

            <form onSubmit={submitInquiry}>

              <input
                className="form-control mb-2"
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />

              <input
                className="form-control mb-2"
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />

              <textarea
                className="form-control mb-3"
                placeholder="Message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows="3"
              />

              <button className="btn btn-primary w-100 mb-2">Send Inquiry</button>

              <a
                href={`https://wa.me/919304090717?text=Hi, I'm interested in ${prop.title}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-success w-100"
              >
                <i className="bi bi-whatsapp me-1"></i> WhatsApp
              </a>

            </form>
          </div>
        </div>

      </div>

      {/* =================== CSS =================== */}
      <style>{`
        .detail-carousel img {
          border-radius: 16px;
        }
        
        .key-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 18px;
        }

        .key-box {
          background: #ffffff;
          border-radius: 12px;
          padding: 16px;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.06);
        }

        .key-title {
          font-size: 0.9rem;
          margin: 4px 0;
          color: #6b7280;
        }

        .key-value {
          font-size: 1rem;
          font-weight: 600;
        }

        .enquiry-card {
          background: #ffffff;
          border-radius: 16px;
        }
      `}</style>
    </div>
  );
}
