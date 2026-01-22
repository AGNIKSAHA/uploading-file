import { NavLink } from "react-router-dom";
import { useState } from "react";
import UploadDropdown from "./UploadDropdown";
import { useStorage } from "../hooks/useStorage";

const baseItem =
  "flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-gray-100 transition";

const activeItem =
  "bg-blue-50 text-blue-600 font-medium";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { usedGB, totalGB } = useStorage();

  const percent = Math.min(
    100,
    Math.round((usedGB / totalGB) * 100)
  );

  return (
    <aside
      className={`${
        collapsed ? "w-16" : "w-64"
      } shrink-0 border-r bg-white px-2 py-4 shadow-sm transition-all duration-300 flex flex-col`}
    >
      {/* Toggle */}
      <button
        onClick={() => setCollapsed((v) => !v)}
        className="mb-4 w-full flex justify-center text-gray-500 hover:text-gray-800"
        aria-label="Toggle sidebar"
      >
        {collapsed ? "➡️" : "⬅️"}
      </button>

      {/* Upload */}
      <div className="mb-6">
        <UploadDropdown />
      </div>

      {/* Navigation */}
      <nav className="space-y-1 flex-1">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${baseItem} ${isActive ? activeItem : ""}`
          }
        >
          <span>🏠</span>
          {!collapsed && <span>Home</span>}
        </NavLink>

        <NavLink
          to="/upload"
          className={({ isActive }) =>
            `${baseItem} ${isActive ? activeItem : ""}`
          }
        >
          <span>⬆️</span>
          {!collapsed && <span>Uploads</span>}
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `${baseItem} ${isActive ? activeItem : ""}`
          }
        >
          <span>ℹ️</span>
          {!collapsed && <span>About</span>}
        </NavLink>
      </nav>

      {/* Storage Bar */}
      <div className="mt-4 px-2">
        {!collapsed && (
          <div className="text-xs text-gray-600 mb-2">
            Storage {usedGB} GB of {totalGB} GB used
          </div>
        )}

        <div className="h-2 bg-gray-200 rounded overflow-hidden">
          <div
            className="h-2 bg-blue-600 transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>

        {!collapsed && (
          <div className="mt-1 text-[10px] text-gray-500">
            {percent}% used
          </div>
        )}
      </div>
    </aside>
  );
}
