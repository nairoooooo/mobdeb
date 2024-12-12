import './styles.css';
import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>INVENTORY SYSTEM</h2>
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/UserManagement">User Management</Link></li>
          <li><Link to="/CategoryList">Categories</Link></li>
          <li><Link to="/ProductList">Product</Link></li>
          <li><Link to="/Sales">Sales</Link></li>
          <li><Link to="/SalesReport">Sales Report</Link></li>
        </ul>
      </aside>

      <main className="main-content">
        <h1>HOME</h1>
        <div className="card-container">
          <Link to="/UserManagement" className="card">
            <div className="card-icon">👤</div>
            <p>User Management</p>
          </Link>
          <Link to="/CategoryList" className="card">
            <div className="card-icon">📋</div>
            <p>Categories</p>
          </Link>
          <Link to="/ProductList" className="card">
            <div className="card-icon">📦</div>
            <p>Products</p>
          </Link>
          <Link to="/Sales" className="card">
            <div className="card-icon">💰</div>
            <p>Sales</p>
          </Link>
          <Link to="/SalesReport" className="card">
            <div className="card-icon">📈</div>
            <p>Sales Report</p>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
