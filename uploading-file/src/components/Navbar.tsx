import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const baseLink =
  "relative text-sm font-medium text-gray-600 hover:text-gray-900 px-2 py-1 transition";

const activeLink =
  "text-blue-600 after:absolute after:left-0 after:-bottom-2 after:w-full after:h-[2px] after:bg-blue-600 after:shadow-md";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // later this can call API or filter files
    navigate(`/upload?search=${encodeURIComponent(query)}`);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between gap-6">

        {/* Left: Tabs */}
        <div className="flex gap-6 shrink-0">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : ""}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/upload"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : ""}`
            }
          >
            Upload
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : ""}`
            }
          >
            About
          </NavLink>
        </div>

        {/* Center: Search */}
        <form
          onSubmit={onSearch}
          className="flex-1 max-w-md"
        >
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search files"
              className="w-full rounded-full border bg-gray-50 px-4 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </form>

        {/* Right: Auth */}
        <div className="flex gap-3 shrink-0">
          <NavLink
            to="/login"
            className="text-sm px-3 py-1.5 rounded-md border shadow-sm hover:shadow-md transition"
          >
            Login
          </NavLink>

          <NavLink
            to="/signup"
            className="text-sm px-3 py-1.5 rounded-md bg-blue-600 text-white shadow-md hover:shadow-lg transition"
          >
            Sign up
          </NavLink>
        </div>

      </div>
    </nav>
  );
}
