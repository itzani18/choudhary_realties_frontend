import { Link } from "react-router-dom";
import PropertyCarousel from "../components/PropertyCarousel";


export default function PropertyCard({ prop }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="property-card-ui">

        {/* SOLD Badge */}
        {prop.sold_out && (
          <span className="sold-badge">SOLD</span>
        )}

        {/* Image */}
        <div className="property-img-container">
          <PropertyCarousel
            images={prop.images}
            carouselId={`card-${prop.id}`}
          />
        </div>


        {/* Content */}
        <div className="property-content">
          <h5 className="property-title">{prop.title}</h5>

          <p className="property-location">
            <i className="bi bi-geo-alt-fill text-danger me-1"></i>
            {prop.location}
          </p>

          <p className="property-price">₹{prop.price}</p>

          <Link to={`/property/${prop.id}`} className="btn btn-outline-primary w-100">
            View Details
          </Link>
        </div>
      </div>

      {/* --- CSS --- */}
      <style>{`
        .property-card-ui {
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 6px 20px rgba(0,0,0,0.08);
          transition: transform .3s ease, box-shadow .3s ease;
          position: relative;
        }

        .property-card-ui:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.12);
        }

        .property-img-container {
          height: 230px;
          overflow: hidden;
        }

        .property-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform .4s ease;
        }

        .property-card-ui:hover .property-img {
          transform: scale(1.08);
        }

        .property-content {
          padding: 16px 18px;
        }

        .property-title {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 6px;
        }

        .property-location {
          margin: 0;
          font-size: 0.9rem;
          color: #6b7280;
        }

        .property-price {
          color: #0d6efd;
          font-size: 1.1rem;
          font-weight: 700;
          margin: 12px 0 18px 0;
        }

        .sold-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: #dc3545;
          color: white;
          padding: 6px 12px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;
          z-index: 10;
        }
      `}</style>
    </div>
  );
}
