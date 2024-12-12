import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SalesReport = () => {
  const [sales, setSales] = useState([]);

  // Fetch sales data from the API
  const fetchSales = async () => {
    try {
      const response = await axios.get('/api/sales_report');
      setSales(response.data);
    } catch (error) {
      console.error('Error fetching sales report:', error);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  // Handle deleting a sale
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this sale?');
    if (confirmDelete) {
      try {
        await axios.delete(`/api/sales_report/${id}`);
        fetchSales(); // Refresh sales list after deletion
      } catch (error) {
        console.error('Error deleting sale:', error);
      }
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar/Navbar */}
      <aside className="sidebar">
        <h2>INVENTORY SYSTEM</h2>
        <ul>
        <li><a href="/">Dashboard</a></li>
          <li><a href="/UserManagement">User Management</a></li>
          <li><a href="/CategoryList">Categories</a></li>
          <li><a href="/ProductList">Products</a></li>
          <li><a href="/Sales">Sales</a></li>
          <li><a href="/SalesReport">Sales Report</a></li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <h1>Sales Report</h1>

        {/* Sales Report Table */}
        {sales.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => (
                <tr key={sale.id}>
                  <td>{sale.product_name}</td>
                  <td>{sale.quantity}</td>
                  <td>{sale.total}</td>
                  <td>{sale.date}</td>
                  <td>
                    <Link to={`/EditSale/${sale.id}`}>
                      <button className="action-btn">Edit</button>
                    </Link>
                    <button
                      className="action-btn delete"
                      onClick={() => handleDelete(sale.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No sales found.</p>
        )}
      </main>
    </div>
  );
};

export default SalesReport;
