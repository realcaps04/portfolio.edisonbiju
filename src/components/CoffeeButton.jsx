import { useLocation } from 'react-router-dom';
import './CoffeeButton.css';

export default function CoffeeButton() {
  const { pathname } = useLocation();
  if (pathname === '/admin') return null;

  return (
    <a
      className="bmc-fab"
      href="https://buymeacoffee.com/realcaps"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Buy me a coffee"
    >
      <CoffeeIcon />
    </a>
  );
}

function CoffeeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
      <path
        fill="currentColor"
        d="M5 7h11a1 1 0 0 1 1 1v5.2A4.8 4.8 0 0 1 12.2 18H9.8A4.8 4.8 0 0 1 5 13.2V8a1 1 0 0 1 1-1Zm12 .8h.7A3.3 3.3 0 0 1 21 11.1a3.3 3.3 0 0 1-3.3 3.3H17v-1.5h.7a1.8 1.8 0 0 0 1.8-1.8 1.8 1.8 0 0 0-1.8-1.8H17V7.8ZM7.2 20h8.6v1.5H7.2V20Z"
      />
    </svg>
  );
}
