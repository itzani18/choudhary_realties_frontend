import React from "react";

export default function PropertyCarousel({ images = [], carouselId, fullSize = false }) {
  if (!images || images.length === 0) return null;

  const id = carouselId || "carousel-" + Math.random().toString(36).substring(2, 9);

  // Different sizes for cards vs detail page
  const imageStyle = fullSize
    ? { width: "100%", height: "500px", objectFit: "contain", background: "#000" }
    : { width: "100%", height: "230px", objectFit: "cover" };

  return (
    <div
      id={id}
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="3000"
    >
      <div className="carousel-inner">
        {images.map((img, i) => (
          <div
            className={`carousel-item ${i === 0 ? "active" : ""}`}
            key={i}
          >
            <img
              src={img.image}
              className="d-block w-100"
              style={imageStyle}
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target={`#${id}`}
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target={`#${id}`}
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
          </button>
        </>
      )}
    </div>
  );
}
