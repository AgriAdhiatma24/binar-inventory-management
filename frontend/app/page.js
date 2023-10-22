import Image from 'next/image';
import styles from './page.module.css';
import Sidebar from '@/components/sidebar';
import { Package, DollarSign, Sun, Moon, Plus } from 'lucide-react';

export default function Home() {
  return (
    <div className='container'>
      <Sidebar />
      <main>
        <h1>Dashboard</h1>

        <div className='month-dropdown'>
          <select name='month' id='month'>
            <option value='current'>Current Month</option>
            <option value='January'>January</option>
            <option value='February'>February</option>
            <option value='March'>March</option>
            <option value='April'>April</option>
            <option value='May'>May</option>
            <option value='June'>June</option>
            <option value='July'>July</option>
            <option value='August'>August</option>
            <option value='September'>September</option>
            <option value='October'>October</option>
            <option value='November'>November</option>
            <option value='December'>December</option>
          </select>
        </div>

        <div className='insight'>
          <div className='balance' id='balance'>
            <span className='dashboard-card-icon'>
              <Package />
            </span>
            <div className='info' id='info-balance'>
              <h3>Total Items</h3>
              <h1>Rp.-10.000</h1>
            </div>
            <small className='text-muted'>Last 30 days</small>
          </div>
          <div className='income' id='income'>
            <span className='dashboard-card-icon'>
              <DollarSign />
            </span>
            <div className='info' id='info-income'>
              <h3>Total Value</h3>
              <h1>Rp.10.000</h1>
            </div>
            <small className='text-muted'>Last 30 days</small>
          </div>
        </div>

        <div id='transaction-table' className='transaction-table'>
          <h2>Recent Activity</h2>
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id='table-body'></tbody>
          </table>
          <a href='#'>Show All</a>
        </div>
      </main>

      <div className='right-side'>
        <div className='top'>
          <button id='menu-btn'>
            <span className='material-symbols-outlined'> menu </span>
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
              <span className='material-symbols-outlined'>
                <Plus />
              </span>
              <h3>Add Transaction</h3>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
