import { useMemo, useState } from 'react';
import { restaurants } from '../data/restaurants';
import RestaurantCard from '../components/RestaurantCard';

export default function Restaurants() {
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  const filtered = useMemo(() => {
    let list = restaurants.filter((r) =>
      r.name.toLowerCase().includes(query.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(query.toLowerCase())
    );
    if (sortBy === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
    if (sortBy === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [query, sortBy]);

  return (
    <div className="container py-5">
      <h1 className="h2 display-font mb-4">All restaurants</h1>

      <div className="row g-3 mb-4">
        <div className="col-md-8">
          <input
            type="search"
            className="form-control form-control-lg rounded-pill px-4"
            placeholder="Search restaurants or cuisine…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select form-select-lg rounded-pill"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="rating">Sort by rating</option>
            <option value="name">Sort by name</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted">No restaurants match "{query}".</p>
      ) : (
        <div className="row g-4">
          {filtered.map((r) => (
            <div className="col-sm-6 col-lg-4" key={r.id}>
              <RestaurantCard restaurant={r} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
