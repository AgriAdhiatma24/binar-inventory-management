"use client";

import {
  LayoutGrid,
  Folder,
  PieChart,
  User2,
  LogOut,
  PackagePlus,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logout from "../utils/logout.js";

const items = [
  {
    label: "Dashboard",
    icon: <LayoutGrid size={20} />,
    href: "/",
  },
  {
    label: "Add Product",
    icon: <PackagePlus size={20} />,
    href: "/product/add",
  },
  {
    label: "Categories",
    icon: <Folder size={20} />,
    href: "/categories",
  },
  {
    label: "Analytics",
    icon: <PieChart size={20} />,
    href: "/analytics",
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");

    if (confirmed) {
      logout();
    }
  };

  return (
    <aside className="w-64">
      <div className="top">
        <div className="logo">
          <div className="text-2xl font-bold">Binar Inventory</div>
        </div>
        <div className="close" id="close-btn">
          <span className="material-symbols-outlined"> close </span>
        </div>
      </div>

      <div className="sidebar">
        {items.map((item) => (
          <Link key={item.href} href={item.href} legacyBehavior>
            <a className={`btn ${pathname === item.href ? "active" : ""}`}>
              {item.icon}
              <h3>{item.label}</h3>
            </a>
          </Link>
        ))}

        <div className="sidebar-bottom">
          <Link href="/profile" legacyBehavior>
            <a className={`btn ${pathname === "/profile" ? "active" : ""}`}>
              <User2 size={20} />
              <h3>Profile</h3>
            </a>
          </Link>
          <a className="btn" onClick={handleLogout}>
            <LogOut size={20} />
            <h3>Logout</h3>
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
