import { Link, useLocation } from './Link';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/board', label: 'Board' },
  { to: '/chronicles', label: 'Chronicles' },
  { to: '/roast', label: 'Roast', active: true }
];

export default function Navigation() {
  const location = useLocation();
  
  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="nav-logo">
          <span className="nav-logo-icon">🔥</span>
          <span className="nav-logo-text">HUMBLE CLAW</span>
        </div>
        <ul className="nav-links">
          {NAV_LINKS.map(link => (
            <li key={link.to}>
              <Link 
                to={link.to} 
                className={`nav-link ${link.active ? 'nav-link-active' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
