import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatINR } from '../lib/currency';

export default function Cart() {
  const { items, subtotal, deliveryFee, total, increase, decrease, removeItem } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2 className="display-font mb-3">Your cart is empty</h2>
        <p className="text-muted mb-4">Looks like you haven't added any dishes yet.</p>
        <Link to="/restaurants" className="btn btn-chili btn-lg">Browse restaurants</Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="h2 display-font mb-4">Your cart</h1>
      <div className="row g-4">
        <div className="col-lg-8">
          {items.map((item) => (
            <div key={item.id} className="d-flex align-items-center gap-3 bg-white rounded-4 shadow-sm p-3 mb-3">
              <img src={item.image} alt={item.name} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 12 }} />
              <div className="flex-grow-1">
                <h6 className="fw-bold mb-1">{item.name}</h6>
                <p className="small text-muted mb-0">{formatINR(item.price)} each</p>
              </div>
              <div className="d-flex align-items-center gap-2">
                <button className="qty-btn" onClick={() => decrease(item.id)}>−</button>
                <span className="fw-semibold" style={{ minWidth: 20, textAlign: 'center' }}>{item.qty}</span>
                <button className="qty-btn" onClick={() => increase(item.id)}>+</button>
              </div>
              <div className="fw-bold" style={{ minWidth: 70, textAlign: 'right' }}>
                {formatINR(item.price * item.qty)}
              </div>
              <button className="btn btn-sm text-danger" onClick={() => removeItem(item.id)}>✕</button>
            </div>
          ))}
        </div>

        <div className="col-lg-4">
          <div className="bg-white rounded-4 shadow-sm p-4">
            <h5 className="fw-bold mb-3">Order summary</h5>
            <div className="d-flex justify-content-between small mb-2">
              <span>Subtotal</span><span>{formatINR(subtotal)}</span>
            </div>
            <div className="d-flex justify-content-between small mb-2">
              <span>Delivery fee</span><span>{formatINR(deliveryFee)}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold mb-4">
              <span>Total</span><span>{formatINR(total)}</span>
            </div>
            <button className="btn btn-chili w-100" onClick={() => navigate('/checkout')}>
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
