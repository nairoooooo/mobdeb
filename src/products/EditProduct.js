import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles.css';

const EditProduct = () => {
  const { product_id } = useParams(); // Get the product ID from the URL params
  const navigate = useNavigate(); // Used to navigate back to the Product List

  const [productData, setProductData] = useState({
    product: '',
    category_id: '',
    product_stock: '',
    buying_price: '',
    selling_price: '',
    created: '',
  });

  // Fetch product data based on the product ID
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`http://192.168.1.18/midtermNew/api.php?id=${product_id}`);
        setProductData(response.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, [product_id]);

  // Handle form input changes
  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission to update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://192.168.1.18/midtermNew/api.php', { product_id, ...productData });
      alert('Product updated successfully!');
      navigate('/ProductList'); // Navigate back to the Product List
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product.');
    }
  };

  return (
    <div className="edit-product-container">
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="product"
          placeholder="Product Name"
          value={productData.product}
          onChange={handleChange}
        />
        <input
          type="number"
          name="category_id"
          placeholder="Category ID"
          value={productData.category_id}
          onChange={handleChange}
        />
        <input
          type="number"
          name="product_stock"
          placeholder="Product Stock"
          value={productData.product_stock}
          onChange={handleChange}
        />
        <input
          type="number"
          name="buying_price"
          placeholder="Buying Price"
          value={productData.buying_price}
          onChange={handleChange}
        />
        <input
          type="number"
          name="selling_price"
          placeholder="Selling Price"
          value={productData.selling_price}
          onChange={handleChange}
        />
        <input
          type="date"
          name="created"
          placeholder="Created Date"
          value={productData.created}
          onChange={handleChange}
        />
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
