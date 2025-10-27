import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `block px-3 py-2 rounded-md text-base font-medium transition ${
      isActive
        ? "text-blue-600 font-semibold"
        : "text-gray-700 hover:text-blue-600"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-xl font-bold tracking-tight text-blue-600 hover:text-blue-700"
        >
          David App
        </NavLink>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
          <NavLink to="/aboutme" className={linkClass}>
            About Me
          </NavLink>
          <NavLink to="/contact" className={linkClass}>
            Contact
          </NavLink>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">
                Hallo,&nbsp;
                <strong>{user.name || user.username}</strong>
              </span>
              <button
                onClick={logout}
                className="text-sm text-gray-600 hover:text-blue-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <NavLink to="/login" className={linkClass}>
              Login
            </NavLink>
          )}
        </div>

        {/* Mobile Menü Button */}
        <button
          className="md:hidden text-gray-600 hover:text-blue-600"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menü */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-2">
          <NavLink
            to="/"
            className={linkClass}
            end
            onClick={() => setOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/aboutme"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            About Me
          </NavLink>
          <NavLink
            to="/contact"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            Contact
          </NavLink>

          {user ? (
            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className={linkClass}
              onClick={() => setOpen(false)}
            >
              Login
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
}
