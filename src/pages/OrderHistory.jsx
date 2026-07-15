import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { formatINR } from '../lib/currency';

const ORDERS_KEY = 'tastygo_orders';

export default function OrderHistory() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const all = JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
      setOrders(all.filter((o) => o.user_id === user.id));
    } catch (err) {
      console.warn('Could not read orders from LocalStorage:', err);
    }
  }, [user.id]);

  return (
    <div className="container py-5">
      <h1 className="h2 display-font mb-4">My orders</h1>

      {orders.length === 0 && (
        <div className="text-center py-5">
          <p className="text-muted mb-3">You haven't placed any orders yet.</p>
          <Link to="/restaurants" className="btn btn-chili">Start ordering</Link>
        </div>
      )}

      {orders.map((order) => (
        <div key={order.id} className="bg-white rounded-4 shadow-sm p-4 mb-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h6 className="fw-bold mb-0">Order #{order.id}</h6>
            <span className="badge bg-charcoal text-capitalize">{order.status}</span>
          </div>
          <p className="small text-muted mb-2">{new Date(order.created_at).toLocaleString()}</p>
          {order.items?.map((i, idx) => (
            <div key={idx} className="d-flex justify-content-between small">
              <span>{i.quantity} × {i.food_name}</span>
              <span>{formatINR(i.price * i.quantity)}</span>
            </div>
          ))}
          <hr />
          <div className="d-flex justify-content-between fw-bold">
            <span>Total</span><span>{formatINR(order.total_amount)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
