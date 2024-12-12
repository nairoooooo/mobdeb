import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [userData, setUserData] = useState({ name: '', email: '', role: '' });
  const [users, setUsers] = useState([]);

  // Fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/user_management');
        setUsers(response.data); // Populate the user list
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  // Handle adding a new user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/user_management', userData);
      alert('User added successfully');
      setUserData({ name: '', email: '', role: '' }); // Reset form data
      // Optionally refresh the users list after adding a new user
      const response = await axios.get('/api/user_management');
      setUsers(response.data);
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Error adding user');
    }
  };

  // Handle the user status change (for demonstration purposes)
  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'online' ? 'offline' : 'online';
      await axios.patch(`/api/user_management/status/${userId}`, { status: newStatus });
      // Update the status in the users list locally
      setUsers(users.map(user => 
        user.id === userId ? { ...user, status: newStatus } : user
      ));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
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
        <h1>User Management</h1>
        
        {/* Add User Form */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          />
          <select
            value={userData.role}
            onChange={(e) => setUserData({ ...userData, role: e.target.value })}
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <button type="submit">Add User</button>
        </form>

        {/* User Table */}
        <h2>Existing Users</h2>
        {users.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Created</th>
                <th>Status</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.created}</td>
                  <td>{user.status}</td>
                  <td>{user.email}</td>
                  <td>
                    <button onClick={() => toggleUserStatus(user.id, user.status)}>
                      {user.status === 'online' ? 'Set Offline' : 'Set Online'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No users found.</p>
        )}
      </main>
    </div>
  );
};

export default UserManagement;
