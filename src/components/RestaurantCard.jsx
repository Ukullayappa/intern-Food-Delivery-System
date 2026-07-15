import { Link } from 'react-router-dom';

export default function RestaurantCard({ restaurant }) {
  return (
    <Link to={`/restaurants/${restaurant.id}`} className="text-decoration-none text-reset">
      <div className="card card-restaurant h-100">
        <div className="position-relative">
          <img src={restaurant.image} alt={restaurant.name} loading="lazy" />
          <span
            className={`badge position-absolute top-0 end-0 m-2 ${restaurant.isOpen ? 'badge-open' : 'badge-closed'}`}
          >
            {restaurant.isOpen ? 'Open' : 'Closed'}
          </span>
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start">
            <h5 className="card-title mb-1">{restaurant.name}</h5>
            <span className="small fw-semibold text-saffron">★ {restaurant.rating}</span>
          </div>
          <p className="small text-muted mb-1">{restaurant.cuisine}</p>
          <p className="small text-muted mb-0">🕒 {restaurant.deliveryTime}</p>
        </div>
      </div>
    </Link>
  );
}
