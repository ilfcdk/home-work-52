// NotFoundPage
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>404 – Сторінка не знайдена</h2>
      <p>На жаль, такої сторінки немає.</p>
      <Link to="/">Перейти на головну</Link>
    </div>
  );
}
