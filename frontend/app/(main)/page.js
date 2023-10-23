export default function Home() {
  return (
    <main>
      <div class='month-dropdown'>
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

      <div class='insight'>
        <div class='balance' id='balance'>
          <span class='material-symbols-outlined'>account_balance_wallet</span>
          <div class='info' id='info-balance'>
            <h3>Total Balance</h3>
            <h1>Rp.-10.000</h1>
          </div>
          <small class='text-muted'>Last 30 days</small>
        </div>
        <div class='income' id='income'>
          <span class='material-symbols-outlined'> north_east </span>
          <div class='info' id='info-income'>
            <h3>Total Income</h3>
            <h1>Rp.10.000</h1>
          </div>
          <small class='text-muted'>Last 30 days</small>
        </div>
        <div class='expenses' id='expenses'>
          <span class='material-symbols-outlined'> south_west </span>
          <div class='info' id='info-expenses'>
            <h3>Total Expenses</h3>
            <h1>Rp.20.000</h1>
          </div>
          <small class='text-muted'>Last 30 days</small>
        </div>
      </div>

      <div id='transaction-table' class='transaction-table'>
        <h2>List of Transaction</h2>
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
  );
}
