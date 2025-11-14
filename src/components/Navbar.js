import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path) => pathname === path;

  return (
    <nav
      className="premium-navbar fixed-top"
    >
      <div className="container d-flex align-items-center justify-content-between">

        {/* Brand */}
        <Link to="/" className="brand fw-bold fs-4">
          Choudhary <span className="text-primary">Realties</span>
        </Link>

        {/* Desktop Links */}
        <div className="d-none d-lg-flex gap-3 align-items-center">
          <Link className={`nav-link-custom ${isActive("/") ? "active" : ""}`} to="/">Home</Link>
          <Link className={`nav-link-custom ${isActive("/properties") ? "active" : ""}`} to="/properties">Properties</Link>
          <Link className={`nav-link-custom ${isActive("/contact") ? "active" : ""}`} to="/contact">Contact</Link>
          <Link className="btn btn-primary btn-sm" to="/admin/login">Agent Login</Link>
        </div>

        {/* Mobile Toggle */}
        <button className={`menu-btn d-lg-none ${open ? "open" : ""}`} onClick={() => setOpen(!open)}>
          <span className="menu-line"></span>
          <span className="menu-line"></span>
          <span className="menu-line"></span>
        </button>

      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="mobile-menu card p-3 shadow-sm">
          <Link className="mobile-link" to="/" onClick={()=>setOpen(false)}>Home</Link>
          <Link className="mobile-link" to="/properties" onClick={()=>setOpen(false)}>Properties</Link>
          <Link className="mobile-link" to="/contact" onClick={()=>setOpen(false)}>Contact</Link>
          <Link className="btn btn-primary mt-3" to="/admin/login" onClick={()=>setOpen(false)}>Agent Login</Link>
        </div>
      )}

      <style>{`
        .premium-navbar {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(10px);
          padding: 14px 0;
          box-shadow: 0 6px 20px rgba(0,0,0,0.05);
          z-index: 1000;
        }
        .brand {
          text-decoration: none;
          color: #0b2a4a;
        }
        .nav-link-custom {
          text-decoration: none;
          color: #0b2a4a;
          font-weight: 500;
          padding: 8px 12px;
          border-radius: 8px;
        }
        .nav-link-custom:hover {
          background: #f1f5f9;
        }
        .nav-link-custom.active {
          color: #0d6efd;
          background: #e7f1ff;
        }
        .mobile-menu {
          position: absolute;
          width: 100%;
          left: 0;
          top: 70px;
          background: white;
          border-radius: 0 0 12px 12px;
        }
        .mobile-link {
          display: block;
          padding: 12px;
          font-size: 1.1rem;
          color: #0b2a4a;
          text-decoration: none;
          border-bottom: 1px solid #eee;
        }
        .mobile-link:last-child {
          border-bottom: none;
        }
        .menu-btn {
          width: 40px;
          height: 32px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border: none;
          background: transparent;
          padding: 0;
          cursor: pointer;
        }

        .menu-line {
          width: 100%;
          height: 4px;
          background: #0d6efd; /* your primary blue */
          border-radius: 10px;
          transition: all 0.35s ease;
        }

        /* ANIMATION FOR OPEN STATE */
        .menu-btn.open .menu-line:nth-child(1) {
          transform: translateY(12px) rotate(45deg);
        }

        .menu-btn.open .menu-line:nth-child(2) {
          opacity: 0;
        }

        .menu-btn.open .menu-line:nth-child(3) {
          transform: translateY(-12px) rotate(-45deg);
        }

      `}</style>
    </nav>
  );
}
