import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer pt-5 pb-4 mt-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <h5 className="text-white navbar-brand-food">Tasty<span className="text-saffron">Go</span></h5>
            <p className="small mt-3">
              Fresh meals from your favourite local restaurants, delivered fast.
              Built as part of the Sqrock IT Solutions Web Development Internship.
            </p>
          </div>
          <div className="col-md-2">
            <h6 className="text-white mb-3">Explore</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/restaurants">Restaurants</Link></li>
              <li><Link to="/cart">Cart</Link></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h6 className="text-white mb-3">Contact</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2">
              <li>support@tastygo.example</li>
              <li>+91 98765 43210</li>
              <li>Anantapur, Andhra Pradesh, IN</li>
            </ul>
          </div>
          <div className="col-md-3">
            <h6 className="text-white mb-3">Follow us</h6>
            <div className="d-flex gap-3">
              <a href="#" aria-label="Instagram">Instagram</a>
              <a href="#" aria-label="Twitter">Twitter</a>
            </div>
          </div>
        </div>
        <hr className="border-secondary mt-4" />
        <p className="small text-center mb-0">© {new Date().getFullYear()} TastyGo. Internship demo project — not a real service.</p>
      </div>
    </footer>
  );
}
