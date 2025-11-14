export default function Footer(){
  return (
    <footer className="footer-section mt-5 pt-5 pb-4">
      <div className="container">

        <div className="row g-4 align-items-start">

          <div className="col-md-5">
            <h4 className="fw-bold">Choudhary Realties</h4>
            <p className="text-muted">Trusted real estate services — buy, sell and explore verified listings.</p>
            <div className="d-flex gap-2 mt-3">
              <a className="btn btn-outline-primary btn-sm" href="/properties">Browse</a>
            </div>
          </div>

          <div className="col-md-3">
            <h6 className="mb-2">Quick Links</h6>
            <ul className="list-unstyled text-muted">
              <li><a href="/" className="footer-link">Home</a></li>
              <li><a href="/properties" className="footer-link">Properties</a></li>
              <li><a href="/contact" className="footer-link">Contact</a></li>
            </ul>
          </div>

          <div className="col-md-4">
            <h6 className="mb-2">Contact</h6>
            <p className="mb-1 text-muted">Phone: <a href="tel:+919993045616">+91-9993045616</a></p>
            <p className="mb-1 text-muted">Email: <a href="mailto:realtorchoudhary@gmail.com">gschoudhary1175@gmail.com</a></p>

            <div className="mt-3 d-flex gap-2">
              <a className="btn btn-primary btn-sm" href="tel:+919993045616">Call Us Now</a>
              <a className="btn btn-outline-secondary btn-sm" href="/contact#inquiry">Inquiry Now</a>
              <a className="btn btn-success btn-sm" href="https://wa.me/919993045616" target="_blank" rel="noreferrer">Chat on WhatsApp</a>
            </div>
          </div>

        </div>

        <hr className="my-4" />

        <div className="d-flex justify-content-between">
          <small className="text-muted">© {new Date().getFullYear()} Choudhary Realties. All rights reserved.</small>
          <small className="text-muted">Designed with ❤️</small>
        </div>

      </div>

      <style>{`
        .footer-section { background: #f8fafc; }
        .footer-link { color: #6b7280; text-decoration: none; }
        .footer-link:hover { color: var(--color-primary); }
      `}</style>
    </footer>
  );
}
