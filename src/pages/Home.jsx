import { useEffect, useState } from "react";
import { api } from "../api";
import PropertyCard from "../components/PropertyCard";
import Loader from "../components/Loader";

export default function Home() {
  const [propsList, setPropsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("properties/")
      .then((res) => {
        const available = res.data.filter((p) => !p.sold_out);
        setPropsList(available);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  // utility to break array into batches of 6
  const chunk = (arr, size) =>
    arr.reduce((acc, _, i) => {
      if (i % size === 0) acc.push(arr.slice(i, i + size));
      return acc;
    }, []);

  const slides = chunk(propsList, 6);

  return (
    <div className="container mt-4">

      {/* ================= HERO SECTION ================= */}
      <section className="hero d-flex flex-column flex-md-row align-items-center py-5">
        
        {/* LEFT TEXT BLOCK */}
        <div className="hero-left">
          <h1 className="fw-bold mb-3" style={{ fontSize: "2.4rem" }}>
            Find Your Dream Home <span className="text-primary">Effortlessly</span>
          </h1>
          <p className="text-muted fs-5" style={{ maxWidth: "550px" }}>
            Explore premium homes, budget-friendly apartments, and trusted real estate listings across the city — curated for your lifestyle.
          </p>

          <div className="mt-4">
            <a href="/properties" className="btn btn-primary btn-lg px-4">
              Browse Properties
            </a>
          </div>
        </div>

        {/* RIGHT ILLUSTRATION */}
        <div className="hero-right mt-4 mt-md-0 text-center">
          <img 
            src="https://img.freepik.com/free-vector/house-searching-concept-illustration_114360-4897.jpg"
            alt="Real estate illustration"
            style={{ width: "85%", maxWidth: "420px" }}
          />
        </div>

      </section>

      {/* ================= FEATURED SECTION ================= */}
      <h3 className="fw-bold mb-3 mt-4">Featured Listings</h3>

      {/* If total properties ≤ 6, show simple grid */}
      {propsList.length <= 6 ? (
        <div className="row">
          {propsList.map((p) => (
            <PropertyCard key={p.id} prop={p} />
          ))}
        </div>
      ) : (
        /* If more than 6 → carousel */
        <div id="featuredCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
          <div className="carousel-inner">

            {slides.map((group, index) => (
              <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                
                <div className="row">
                  {group.map((p) => (
                    <PropertyCard key={p.id} prop={p} />
                  ))}
                </div>

              </div>
            ))}

          </div>

          {/* Controls */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#featuredCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#featuredCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
      )}

    </div>
  );
}
