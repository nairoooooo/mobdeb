import '../styles.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  // Fetch products from the API
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://192.168.1.18/midtermNew/api.php');
      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        console.error('Expected an array, but got:', response.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Handle product deletion
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://192.168.1.18/midtermNew/api.php?id=${id}`);
        fetchProducts(); // Refresh product list after deletion
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
        <h1>Product List</h1>

        {/* Button to navigate to AddProduct page */}
        <button onClick={() => navigate('/AddProduct')} className="action-btn">
          Add New Product
        </button>

        {/* Product Table */}
        {products.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Category ID</th>
                <th>Stock</th>
                <th>Buying Price</th>
                <th>Selling Price</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.product}</td>
                  <td>{product.category_id}</td>
                  <td>{product.product_stock}</td>
                  <td>{product.buying_price}</td>
                  <td>{product.selling_price}</td>
                  <td>{product.created}</td>
                  <td>
                  <Link to={`/EditProduct/${product.id}`}>
  <button className="action-btn">Edit</button>
</Link>

                    <button className="action-btn delete" onClick={() => handleDelete(product.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No products found.</p>
        )}
      </main>
    </div>
  );
};

export default ProductList;
