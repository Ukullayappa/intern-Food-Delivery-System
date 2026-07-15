import { Link, useLocation, Navigate } from 'react-router-dom';
import { formatINR } from '../lib/currency';

export default function OrderSuccess() {
  const { state } = useLocation();
  if (!state?.order) return <Navigate to="/" replace />;
  const { order, items } = state;

  return (
    <div className="container py-5">
      <div className="bg-white rounded-4 shadow-sm p-5 mx-auto text-center" style={{ maxWidth: 560 }}>
        <div style={{ fontSize: '3rem' }}>✅</div>
        <h2 className="display-font mt-2">Order confirmed!</h2>
        <p className="text-muted">Order #{order.id} — we're preparing your food.</p>

        <div className="text-start mt-4">
          <h6 className="fw-bold">Items</h6>
          {items.map((i) => (
            <div key={i.id} className="d-flex justify-content-between small mb-1">
              <span>{i.qty} × {i.name}</span>
              <span>{formatINR(i.price * i.qty)}</span>
            </div>
          ))}
          <hr />
          <div className="d-flex justify-content-between fw-bold">
            <span>Total paid</span>
            <span>{formatINR(order.total_amount)}</span>
          </div>
        </div>

        <div className="d-flex gap-3 justify-content-center mt-4">
          <Link to="/restaurants" className="btn btn-outline-chili">Order more</Link>
          <Link to="/orders" className="btn btn-chili">View my orders</Link>
        </div>
      </div>
    </div>
  );
}
