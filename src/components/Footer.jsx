import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="flex flex-col sm:flex-row items-center justify-between px-0 sm:px-16 lg:px-24 py-4 shadow-sm">
      <div>
        <p className="text-xs">2022 Propiedades</p>
      </div>
      <div className="flex items-center gap-6 mt-2 sm:mt-0">
        <Link to="/" className="text-xs">
          Privacidad
        </Link>
        <Link to="/" className="text-xs">
          Privacidad
        </Link>
        <Link to="/" className="text-xs">
          Privacidad
        </Link>
        <Link to="/" className="text-xs">
          Privacidad
        </Link>
      </div>
    </footer>
  );
}
