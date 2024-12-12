import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import DeleteCategory from './DeleteCategory'; // Adjust the path if necessary

const CategoryList = ({ categories }) => {
  const [validCategories, setCategories] = useState(Array.isArray(categories) ? categories : []);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://192.168.1.18/midtermNew/category_api.php');
        console.log('Fetched categories:', response.data);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        alert('Error fetching categories');
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>INVENTORY SYSTEM</h2>
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/UserManagement">User Management</Link></li>
          <li><Link to="/CategoryList">Categories</Link></li>
          <li><Link to="/ProductList">Products</Link></li>
          <li><Link to="/Sales">Sales</Link></li>
          <li><Link to="/SalesReport">Sales Report</Link></li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <h1>Category List</h1>
        {validCategories.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {validCategories.map((category) => (
                <tr key={category.category_id}>
                  <td>{category.category}</td>
                  <td>
                    <Link to={`/EditCategory/${category.category_id}`}>
                      <button>Edit</button>
                    </Link>
                    <DeleteCategory categoryId={category.category_id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No categories found.</p>
        )}
        <Link to="/AddCategory">
          <button>Add New Category</button>
        </Link>
      </main>
    </div>
  );
};

export default CategoryList;
