import { Link } from 'react-router-dom';
import { restaurants } from '../data/restaurants';
import { foods } from '../data/foods';
import RestaurantCard from '../components/RestaurantCard';
import FoodCard from '../components/FoodCard';

const categoryIcons = [
  { name: 'Pizza', emoji: '🍕' },
  { name: 'Burgers', emoji: '🍔' },
  { name: 'Biryani', emoji: '🍛' },
  { name: 'Desserts', emoji: '🍰' },
  { name: 'Pasta', emoji: '🍝' },
  { name: 'Rice Bowls', emoji: '🥗' },
];

export default function Home() {
  const featuredFoods = foods.slice(0, 4);
  const topRestaurants = [...restaurants].sort((a, b) => b.rating - a.rating).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="hero-section py-5 px-3">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <span className="badge bg-white text-charcoal fw-semibold mb-3 px-3 py-2 rounded-pill">
                🔥 Delivering to your door in under 30 min
              </span>
              <h1 className="display-4 display-font mb-3">
                Real food, fast. From your city's <span className="text-saffron">best kitchens.</span>
              </h1>
              <p className="lead text-white-50 mb-4">
                Browse restaurants, build your cart, and get a hot meal delivered —
                without leaving the couch.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link to="/restaurants" className="btn btn-chili btn-lg">Order now</Link>
                <a href="#categories" className="btn btn-lg btn-outline-light rounded-pill">
                  Browse categories
                </a>
              </div>
            </div>
            <div className="col-lg-5 d-none d-lg-block text-center">
              <img
                src="https://foodish-api.com/images/pizza/pizza5.jpg"
                alt="Fresh pizza ready for delivery"
                className="rounded-4 shadow-lg"
                style={{ width: '100%', maxWidth: 380, aspectRatio: '4/3', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="container py-5">
        <h2 className="h3 display-font mb-4">Order by craving</h2>
        <div className="row g-3">
          {categoryIcons.map((c) => (
            <div className="col-4 col-md-2" key={c.name}>
              <Link
                to="/restaurants"
                className="d-flex flex-column align-items-center text-decoration-none text-reset p-3 rounded-4 bg-white shadow-sm h-100"
              >
                <span style={{ fontSize: '2rem' }}>{c.emoji}</span>
                <span className="small fw-semibold mt-2 text-center">{c.name}</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Popular restaurants */}
      <section className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="h3 display-font mb-0">Popular restaurants</h2>
          <Link to="/restaurants" className="fw-semibold text-decoration-none">See all →</Link>
        </div>
        <div className="row g-4">
          {topRestaurants.map((r) => (
            <div className="col-md-4" key={r.id}>
              <RestaurantCard restaurant={r} />
            </div>
          ))}
        </div>
      </section>

      {/* Featured foods */}
      <section className="container py-5">
        <h2 className="h3 display-font mb-4">Featured dishes</h2>
        <div className="row g-4">
          {featuredFoods.map((f) => (
            <div className="col-6 col-md-3" key={f.id}>
              <FoodCard food={f} />
            </div>
          ))}
        </div>
      </section>

      {/* Promo banner */}
      <section className="container pb-5">
        <div className="bg-charcoal text-white rounded-4 p-5 d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div>
            <h3 className="display-font text-saffron mb-2">First order? Get 20% off.</h3>
            <p className="mb-md-0 text-white-50">Use code WELCOME20 at checkout.</p>
          </div>
          <Link to="/restaurants" className="btn btn-chili btn-lg mt-3 mt-md-0">Claim offer</Link>
        </div>
      </section>
    </>
  );
}
