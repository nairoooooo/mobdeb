import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './products/ProductList';
import CategoryList from './categories/CategoryList';
import UserManagement from './user_management/UserManagement';
import SalesReport from './sales_report/SalesReport';
import AddCategory from './categories/AddCategory';
import EditCategory from './categories/EditCategory';
import Dashboard from './Dashboard'; // Import Dashboard component
import AddProduct from './products/AddProduct'; // Import AddProduct component
import EditProduct from './products/EditProduct'; // Import EditProduct component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} /> {/* Default route for Dashboard */}
        <Route path="/ProductList" element={<ProductList />} />
        <Route path="/AddProduct" element={<AddProduct />} /> {/* Add route for AddProduct */}
        <Route path="/EditProduct/:product_id" element={<EditProduct />} /> {/* Corrected route for EditProduct with product_id */}
        <Route path="/CategoryList" element={<CategoryList />} />
        <Route path="/AddCategory" element={<AddCategory />} />
        <Route path="/UserManagement" element={<UserManagement />} />
        <Route path="/SalesReport" element={<SalesReport />} />
        <Route path="/EditCategory/:category_id" element={<EditCategory />} /> {/* Added route for EditCategory with id */}
      </Routes>
    </Router>
  );
};

export default App;  // Ensure this export is here
