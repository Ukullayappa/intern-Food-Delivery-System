import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { itemCount } = useCart();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white sticky-top shadow-sm py-3">
      <div className="container">
        <Link className="navbar-brand navbar-brand-food text-charcoal" to="/">
          Tasty<span className="text-saffron">Go</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMain"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navMain">
          <ul className="navbar-nav mx-auto gap-3 mt-3 mt-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link fw-semibold" to="/" end>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link fw-semibold" to="/restaurants">Restaurants</NavLink>
            </li>
            {user && (
              <li className="nav-item">
                <NavLink className="nav-link fw-semibold" to="/orders">My Orders</NavLink>
              </li>
            )}
          </ul>
          <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
            {user ? (
              <>
                <span className="small text-muted d-none d-lg-inline">
                  Hi, {user.user_metadata?.full_name?.split(' ')[0] || user.email.split('@')[0]}
                </span>
                <button className="btn btn-outline-chili btn-sm" onClick={handleSignOut}>
                  Sign out
                </button>
              </>
            ) : (
              <Link className="btn btn-outline-chili btn-sm" to="/login">Log in</Link>
            )}
            <Link to="/cart" className="btn btn-chili btn-sm position-relative">
              Cart
              {itemCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
