export default function CategoryPills({ categories, active, onSelect }) {
  return (
    <div className="d-flex gap-2 overflow-auto pb-2">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`category-pill border-0 ${active === cat ? 'active' : ''}`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
