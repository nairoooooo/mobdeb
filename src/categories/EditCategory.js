import '../styles.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditCategory = () => {
  const { id } = useParams(); // Get the category ID from the URL
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(`http://192.168.1.1/midtermNew/category_api.php ${id}`);
        setCategoryName(response.data.name); // Set the initial category name
      } catch (error) {
        console.error('Error fetching category:', error);
        alert('Error fetching category');
      }
    };

    fetchCategoryData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://192.168.1.1/midtermNew/category_api.php${id}`, { name: categoryName });
      alert('Category updated successfully');
      navigate('/categories'); // Navigate back to the list of categories
    } catch (error) {
      console.error('Error updating category:', error);
      alert('Error updating category');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Category Name"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
      />
      <button type="submit">Update Category</button>
    </form>
  );
};

export default EditCategory;
