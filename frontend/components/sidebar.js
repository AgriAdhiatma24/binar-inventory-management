'use client';

import {
  LayoutGrid,
  Package,
  Folder,
  PieChart,
  User2,
  LogOut,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  {
    label: 'Dashboard',
    icon: <LayoutGrid size={20} />,
    href: '/',
  },
  {
    label: 'Inventory',
    icon: <Package size={20} />,
    href: '/inventory',
  },
  {
    label: 'Categories',
    icon: <Folder size={20} />,
    href: '/categories',
  },
  {
    label: 'Analytics',
    icon: <PieChart size={20} />,
    href: '/analytics',
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside>
      <div className='top'>
        <div className='logo'>
          <div className='text-2xl font-bold'>Expenses App</div>
        </div>
        <div className='close' id='close-btn'>
          <span className='material-symbols-outlined'> close </span>
        </div>
      </div>

      <div className='sidebar'>
        {items.map((item) => (
          <Link
            href={item.href}
            className={`btn ${pathname === item.href && 'active'}`}>
            {item.icon}
            <h3>{item.label}</h3>
          </Link>
        ))}

        <div className='sidebar-bottom'>
          <Link href='/profile' className='btn'>
            <User2 size={20} />
            <h3>Profile</h3>
          </Link>
          <a href='#' className='btn'>
            <LogOut size={20} />
            <h3>Logout</h3>
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
