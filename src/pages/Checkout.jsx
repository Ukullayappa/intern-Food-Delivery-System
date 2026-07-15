import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatINR } from '../lib/currency';

const ORDERS_KEY = 'tastygo_orders';

export default function Checkout() {
  const { items, subtotal, deliveryFee, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.user_metadata?.full_name || '',
    phone: '',
    address: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!/^\+?[0-9]{7,15}$/.test(form.phone.trim())) e.phone = 'Enter a valid phone number';
    if (!form.address.trim() || form.address.trim().length < 10) e.address = 'Enter a complete delivery address';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate() || items.length === 0) return;
    setSubmitting(true);

    // Saved straight to LocalStorage — no backend involved. Orders are
    // scoped to the signed-in user's id so "My Orders" only shows their
    // own history; a guest checkout still saves, just under no user id.
    const order = {
      id: 'ORD-' + Date.now(),
      user_id: user?.id ?? null,
      customer_name: form.name,
      phone: form.phone,
      address: form.address,
      items: items.map((i) => ({ food_name: i.name, price: i.price, quantity: i.qty })),
      total_amount: total,
      status: 'pending',
      created_at: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
      localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...existing]));
    } catch (err) {
      console.warn('Could not save order to LocalStorage:', err);
    }

    navigate('/order-success', { state: { order, items } });
    clearCart();
    setSubmitting(false);
  };

  return (
    <div className="container py-5">
      <h1 className="h2 display-font mb-4">Checkout</h1>
      <div className="row g-4">
        <div className="col-lg-7">
          <form className="bg-white rounded-4 shadow-sm p-4" onSubmit={handleSubmit} noValidate>
            <h5 className="fw-bold mb-3">Delivery details</h5>

            <div className="mb-3">
              <label className="form-label">Full name</label>
              <input
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Phone number</label>
              <input
                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                placeholder="e.g. +91 98765 43210"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Delivery address</label>
              <textarea
                className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                rows="3"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
              {errors.address && <div className="invalid-feedback">{errors.address}</div>}
            </div>

            <button className="btn btn-chili w-100" disabled={submitting}>
              {submitting ? 'Placing order…' : `Place order · ${formatINR(total)}`}
            </button>
          </form>
        </div>

        <div className="col-lg-5">
          <div className="bg-white rounded-4 shadow-sm p-4">
            <h5 className="fw-bold mb-3">Order summary</h5>
            {items.map((i) => (
              <div key={i.id} className="d-flex justify-content-between small mb-2">
                <span>{i.qty} × {i.name}</span>
                <span>{formatINR(i.price * i.qty)}</span>
              </div>
            ))}
            <hr />
            <div className="d-flex justify-content-between small mb-2">
              <span>Subtotal</span><span>{formatINR(subtotal)}</span>
            </div>
            <div className="d-flex justify-content-between small mb-2">
              <span>Delivery fee</span><span>{formatINR(deliveryFee)}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold">
              <span>Total</span><span>{formatINR(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
