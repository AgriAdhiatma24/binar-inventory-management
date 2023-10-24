'use client';

import {
  LayoutGrid,
  Folder,
  PieChart,
  User2,
  LogOut,
  PackagePlus,
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
    label: 'Add Product',
    icon: <PackagePlus size={20} />,
    href: '/inventory/product/add',
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
    <aside className='w-64'>
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
