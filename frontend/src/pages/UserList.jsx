import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/UserList.css';
import { IoMenu } from "react-icons/io5";
import logo from '../logo/logo.png';
import RegisterPopup from './RegisterPopup';
import EditUserPopup from './EditUserPopup';
import { IoIosMore } from "react-icons/io";


const UserList = () => {
  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [dropdownOpenId, setDropdownOpenId] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  // token
  const fetchUsers = () => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/api/users', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => setUsers(res.data))
    .catch(() => alert('Auth failed or error loading users'));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = roleFilter ? users.filter(u => u.role === roleFilter) : users;

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers(); // Refresh list
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setShowEdit(true);
    setDropdownOpenId(null);
  };

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="user-list-container">
      <div className="top">
        <div className='title'>
            <div style={{ display: "flex", gap: "12px" }}>
             <IoMenu /> Employees
            </div>
            <img src={logo} alt="Logo" className="minilogo" />
        </div>
          <div style={{ display: "flex", gap: "12px" }}>
           <p>Dashboard</p><p>/</p><p style={{ color: 'gray' }}>Users</p>
          </div>
      </div>
      <div className="user-list-header">
        <select
          className="role-select"
          value={roleFilter}
          onChange={e => {
            setRoleFilter(e.target.value);
            setCurrentPage(1); // Reset page on filter
          }}
        >
          <option value="">All</option>
          <option value="admin">Admin</option>
          <option value="editor">Editor</option>
          <option value="sale">Sale</option>
          <option value="user">User</option>
        </select>

        <button className="add-user-btn" onClick={() => setShowRegister(true)}>
          + Add User
        </button>
      </div>

      <div className="user-table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>City</th>
              <th>Country</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((u, i) => (
              <tr key={i}>
                <td>
                  <div className="name-cell">
                    <span className="avatar">{u.name.charAt(0)}</span>
                    {u.name}
                  </div>
                </td>
                <td>{u.email}</td>
                <td>{u.phone || '-'}</td>
                <td>{u.city || '-'}</td>
                <td>{u.country || '-'}</td>
                <td>
                  <span className="role-badge">{u.role || '-'}</span>
                </td>
                <td style={{ position: 'relative' }}>
                  <button
                    className="action-btn"
                    onClick={() => setDropdownOpenId(dropdownOpenId === u._id ? null : u._id)}
                  >
                    <IoIosMore />
                  </button>
                  {dropdownOpenId === u._id && (
                    <div className="dropdown-menu">
                      <button onClick={() => handleEditClick(u)}>Update</button>
                      <button onClick={() => handleDelete(u._id)}>Delete</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Section */}
        <div className="pagination">
          <div>
            Items per page:
            <select
              className="pagination-select"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1); // Reset to first page
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>
          <div className="pagination-controls">
            <button onClick={() => goToPage(1)} disabled={currentPage === 1}>{'<<'}</button>
            <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>{'<'}</button>
            <span>Page {currentPage} of {totalPages || 1}</span>
            <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>{'>'}</button>
            <button onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages}>{'>>'}</button>
          </div>
        </div>
      </div>

      {/* Popups */}
      {showRegister && <RegisterPopup onClose={() => setShowRegister(false)} />}
      {showEdit && selectedUser && (
        <EditUserPopup user={selectedUser} onClose={() => setShowEdit(false)} onUpdate={fetchUsers} />
      )}
    </div>
  );
};

export default UserList;
