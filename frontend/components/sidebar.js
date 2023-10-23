import {
  LayoutGrid,
  Package,
  Folder,
  PieChart,
  User2,
  LogOut,
} from 'lucide-react';

const Sidebar = () => {
  return (
    <aside>
      <div class='top'>
        <div class='logo'>
          <div className='text-2xl font-bold'>Expenses App</div>
        </div>
        <div class='close' id='close-btn'>
          <span class='material-symbols-outlined'> close </span>
        </div>
      </div>

      <div class='sidebar'>
        <a href='#' class='btn active'>
          <LayoutGrid size={20} />
          <h3>Dashboard</h3>
        </a>
        <a href='#' class='btn'>
          <Package size={20} />
          <h3>Inventory</h3>
        </a>
        <a href='#' class='btn'>
          <Folder size={20} />
          <h3>Categories</h3>
        </a>
        <a href='#' class='btn'>
          <PieChart size={20} />
          <h3>Analytics</h3>
        </a>
        <div class='sidebar-bottom'>
          <a href='#' class='btn'>
            <User2 size={20} />
            <h3>Profile</h3>
          </a>
          <a href='#' class='btn'>
            <LogOut size={20} />
            <h3>Logout</h3>
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
