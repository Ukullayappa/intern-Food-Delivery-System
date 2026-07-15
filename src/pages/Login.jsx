import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await signIn(form.email, form.password);
    setLoading(false);
    if (error) setError(error.message);
    else navigate(location.state?.from?.pathname || '/');
  };

  return (
    <div className="container py-5">
      <div className="bg-white rounded-4 shadow-sm p-5 mx-auto" style={{ maxWidth: 440 }}>
        <h2 className="display-font mb-1">Welcome back</h2>
        <p className="text-muted mb-4">Log in to track your orders.</p>
        {error && <div className="alert alert-danger small">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email" required className="form-control"
              value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password" required minLength={6} className="form-control"
              value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <button className="btn btn-chili w-100" disabled={loading}>
            {loading ? 'Logging in…' : 'Log in'}
          </button>
        </form>
        <p className="text-center small mt-4 mb-0">
          New here? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
