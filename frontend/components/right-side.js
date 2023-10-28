import { Sun, Moon, Menu, Plus } from 'lucide-react';

const RightSide = () => {
  return (
    <div className='right-side'>
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

      <div className='add-new-transaction'>
        <h2>New Transaction</h2>
        <div className='add-transaction' id='add-transaction'>
          <a href='form.html'>
            <Plus />
            <h3>Add Transaction</h3>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RightSide;
