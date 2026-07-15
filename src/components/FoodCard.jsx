import { useCart } from '../context/CartContext';
import { formatINR } from '../lib/currency';

export default function FoodCard({ food }) {
  const { addItem } = useCart();

  return (
    <div className="card card-food h-100">
      <img src={food.image} alt={food.name} loading="lazy" />
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between">
          <h6 className="card-title fw-bold">{food.name}</h6>
          <span className="fw-bold text-nowrap ms-2">{formatINR(food.price)}</span>
        </div>
        <p className="small text-muted flex-grow-1">{food.description}</p>
        <button className="btn btn-chili btn-sm mt-2" onClick={() => addItem(food)}>
          Add to cart
        </button>
      </div>
    </div>
  );
}
