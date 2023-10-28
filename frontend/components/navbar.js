import { Sun, Moon, Menu, Plus } from 'lucide-react';

const Navbar = () => {
  return (
    <div className='navbar py-8 mt-0 flex justify-between'>
      <h1 className='hidden md:block'>Dashboard</h1>

      <div className='top'>
        <button id='menu-btn'>
          <Menu />
        </button>
        <div className='theme-toggler'>
          <span className='material-symbols-outlined active light-mode'>
            <Sun size={16} />
          </span>
          <span className='material-symbols-outlined dark-mode'>
            <Moon size={16} />
          </span>
        </div>
        <div className='account-info'>
          <div className='profile'>
            <p>
              Hi, <b>Guest</b>
            </p>
            <small className='text-muted'>Admin</small>
          </div>
        </div>
        <div className='profile-photo'></div>
      </div>
    </div>
  );
};

export default Navbar;
