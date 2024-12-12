import '../styles.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    product: '',
    category_id: '',
    product_stock: '',
    buying_price: '',
    selling_price: '',
    created: '',
  });

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission to add product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://192.168.1.18/midtermNew/api.php', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert('Product added successfully!');
      navigate('/ProductList');  // Redirect to Product List page after adding
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product: ' + (error.response?.data?.message || 'An error occurred'));
    }
  };

  return (
    <div>
      <h1>Add New Product</h1>
      <form onSubmit={handleAddProduct}>
        <input
          type="text"
          name="product"
          placeholder="Product Name"
          value={formData.product}
          onChange={handleChange}
        />
        <input
          type="number"
          name="category_id"
          placeholder="Category ID"
          value={formData.category_id}
          onChange={handleChange}
        />
        <input
          type="number"
          name="product_stock"
          placeholder="Product Stock"
          value={formData.product_stock}
          onChange={handleChange}
        />
        <input
          type="number"
          name="buying_price"
          placeholder="Buying Price"
          value={formData.buying_price}
          onChange={handleChange}
        />
        <input
          type="number"
          name="selling_price"
          placeholder="Selling Price"
          value={formData.selling_price}
          onChange={handleChange}
        />
        <input
          type="date"
          name="created"
          placeholder="Created Date"
          value={formData.created}
          onChange={handleChange}
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
