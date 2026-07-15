import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container py-5 text-center">
      <h1 className="display-font display-1">404</h1>
      <p className="text-muted mb-4">This page wandered off the delivery route.</p>
      <Link to="/" className="btn btn-chili">Back home</Link>
    </div>
  );
}
