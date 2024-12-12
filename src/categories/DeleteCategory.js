import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DeleteCategory = ({ categoryId }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this category?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://192.168.1.18/midtermNew/category_api.php${categoryId}`);
        alert('Category deleted successfully');
        navigate('/categories/CategoryList'); // Redirect to categories list after deletion
      } catch (error) {
        console.error('Error deleting category:', error); 
        alert('Error deleting category');
      }
    }
  };

  return <button onClick={handleDelete}>Delete </button>;
};

export default DeleteCategory;
