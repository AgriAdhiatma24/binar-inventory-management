import {
  LayoutGrid,
  Package,
  Folder,
  LineChart,
  User2,
  LogOut,
} from 'lucide-react';

const Sidebar = () => {
  return (
    <aside>
      <div className='top'>
        <div className='logo'>
          <h2>Expenses App</h2>
        </div>
        <div className='close' id='close-btn'>
          <span className='material-symbols-outlined'> close </span>
        </div>
      </div>

      <div className='sidebar'>
        <a href='#' className='btn active'>
          <span className='material-symbols-outlined'>
            <LayoutGrid />
          </span>
          <h3>Dashboard</h3>
        </a>
        <a href='#' className='btn'>
          <span className='material-symbols-outlined'>
            <Package />
          </span>
          <h3>Inventory Management</h3>
        </a>
        <a href='#' className='btn'>
          <span className='material-symbols-outlined'>
            <Folder />
          </span>
          <h3>Categories</h3>
        </a>
        <a href='#' className='btn'>
          <span className='material-symbols-outlined'>
            <LineChart />
          </span>
          <h3>Reports and Analytics</h3>
        </a>
        <div className='sidebar-bottom'>
          <a href='#' className='btn'>
            <span className='material-symbols-outlined'>
              <User2 />
            </span>
            <h3>Profile</h3>
          </a>
          <a href='#' className='btn'>
            <span className='material-symbols-outlined'>
              <LogOut />
            </span>
            <h3>Logout</h3>
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
