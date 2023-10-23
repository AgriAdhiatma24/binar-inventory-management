import { Sun, Moon, Menu, Plus } from 'lucide-react';

const Navbar = () => {
  return (
    <div className='navbar py-8 mt-0 flex justify-between'>
      <h1 className='hidden md:block'>Dashboard</h1>

      <div class='top'>
        <button id='menu-btn'>
          <Menu />
        </button>
        <div class='theme-toggler'>
          <span class='material-symbols-outlined active light-mode'>
            <Sun size={16} />
          </span>
          <span class='material-symbols-outlined dark-mode'>
            <Moon size={16} />
          </span>
        </div>
        <div class='account-info'>
          <div class='profile'>
            <p>
              Hi, <b>Guest</b>
            </p>
            <small class='text-muted'>Admin</small>
          </div>
        </div>
        <div class='profile-photo'></div>
      </div>
    </div>
  );
};

export default Navbar;
