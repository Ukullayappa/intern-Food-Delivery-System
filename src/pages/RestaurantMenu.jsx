import { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { restaurants } from '../data/restaurants';
import { foods } from '../data/foods';
import FoodCard from '../components/FoodCard';
import CategoryPills from '../components/CategoryPills';
import { formatINR } from '../lib/currency';

export default function RestaurantMenu() {
  const { id } = useParams();
  const restaurant = restaurants.find((r) => r.id === Number(id));
  const menu = foods.filter((f) => f.restaurantId === Number(id));
  const categories = ['All', ...new Set(menu.map((f) => f.category))];

  const [active, setActive] = useState('All');
  const [query, setQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(400);

  const filtered = useMemo(() => {
    return menu.filter((f) => {
      const matchesCategory = active === 'All' || f.category === active;
      const matchesQuery = f.name.toLowerCase().includes(query.toLowerCase());
      const matchesPrice = f.price <= maxPrice;
      return matchesCategory && matchesQuery && matchesPrice;
    });
  }, [menu, active, query, maxPrice]);

  if (!restaurant) {
    return (
      <div className="container py-5 text-center">
        <h2>Restaurant not found</h2>
        <Link to="/restaurants" className="btn btn-chili mt-3">Back to restaurants</Link>
      </div>
    );
  }

  return (
    <>
      <div className="hero-section py-5">
        <div className="container py-3 text-white">
          <span className="badge bg-white text-charcoal mb-2">{restaurant.cuisine}</span>
          <h1 className="display-font mb-1">{restaurant.name}</h1>
          <p className="text-white-50 mb-0">★ {restaurant.rating} · 🕒 {restaurant.deliveryTime}</p>
        </div>
      </div>

      <div className="container py-4">
        <div className="row g-3 align-items-center mb-3">
          <div className="col-md-6">
            <input
              className="form-control rounded-pill"
              placeholder="Search this menu…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label small mb-0">Max price: {formatINR(maxPrice)}</label>
            <input
              type="range"
              min="100"
              max="400"
              step="10"
              className="form-range"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="mb-4">
          <CategoryPills categories={categories} active={active} onSelect={setActive} />
        </div>

        {filtered.length === 0 ? (
          <p className="text-muted">No dishes match your filters.</p>
        ) : (
          <div className="row g-4">
            {filtered.map((f) => (
              <div className="col-6 col-md-4 col-lg-3" key={f.id}>
                <FoodCard food={f} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
