import { Sun, Moon, Menu, Plus } from 'lucide-react';

const RightSide = () => {
  return (
    <div class='right-side'>
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

      <div class='add-new-transaction'>
        <h2>New Transaction</h2>
        <div class='add-transaction' id='add-transaction'>
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
