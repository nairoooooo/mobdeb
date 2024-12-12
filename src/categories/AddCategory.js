import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://192.168.1.18/midtermNew/category_api.php', { category });
      alert('Category added successfully');
      setCategory('');
      navigate('/CategoryList'); // Navigate back to the category list
    } catch (error) {
      console.error('Error adding category:', error);
      alert('Error adding category');
    }
  };

  return (
    <div className="add-category-container">
      <h1>Add New Category</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category Name"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
};

export default AddCategory;