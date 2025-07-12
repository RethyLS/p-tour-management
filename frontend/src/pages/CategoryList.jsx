import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/UserList.css';
import { IoMenu } from "react-icons/io5";
import logo from '../logo/logo.png';
import { IoIosMore } from "react-icons/io";
import CategoryPopup from './CategoryPopup';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [showPopup, setShowPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dropdownOpenId, setDropdownOpenId] = useState(null);

  // Pagination
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchCategories = () => {
    axios.get('http://localhost:5000/api/categories')
      .then(res => {
        setCategories(res.data);
        setFilteredCategories(res.data); // initialize filtered
      })
      .catch(() => alert('Failed to load categories'));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const filtered = categories.filter(cat =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
    setCurrentPage(1); // reset to first page on search
  }, [searchTerm, categories]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this category?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      fetchCategories();
    } catch {
      alert('Delete failed');
    }
  };

  const handleEditClick = (cat) => {
    setSelectedCategory(cat);
    setShowPopup(true);
    setDropdownOpenId(null);
  };

  const handleAddClick = () => {
    setSelectedCategory(null);
    setShowPopup(true);
  };

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="user-list-container">
      <div className="top">
        <div className='title'>
          <div style={{ display: "flex", gap: "12px" }}>
            <IoMenu /> Categories
          </div>
          <img src={logo} alt="Logo" className="minilogo" />
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <p>Dashboard</p><p>/</p><p style={{ color: 'gray' }}>Categories</p>
        </div>
      </div>

      <div className="user-list-header">
        <div style={{justifyContent:"space-between"}}>
        <input style={{width: "150px"}}
          type="text"
          className="search-input"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        </div>
        <button className="add-user-btn" onClick={handleAddClick}>
          + Add Category
        </button>
      </div>

      <div className="user-table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th style={{textAlign:"right"}}>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentCategories.map(cat => (
              <tr key={cat._id}>
                <td>{cat.name}</td>
                <td style={{ position: 'relative', textAlign:"right" }}>
                  <button
                    className="action-btn"
                    onClick={() => setDropdownOpenId(dropdownOpenId === cat._id ? null : cat._id)}
                  >
                    <IoIosMore />
                  </button>
                  {dropdownOpenId === cat._id && (
                    <div className="dropdown-menu">
                      <button onClick={() => handleEditClick(cat)}>Update</button>
                      <button onClick={() => handleDelete(cat._id)}>Delete</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        

        <div className="pagination">
          <div>
            Items per page:
            <select
              className="pagination-select"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>
          <div className="pagination-controls">
            <button onClick={() => changePage(1)} disabled={currentPage === 1}>{'<<'}</button>
            <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>{'<'}</button>
            <span>Page {currentPage} of {totalPages || 1}</span>
            <button onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>{'>'}</button>
            <button onClick={() => changePage(totalPages)} disabled={currentPage === totalPages}>{'>>'}</button>
          </div>
        </div>
      </div>

      {showPopup && (
        <CategoryPopup
          onClose={() => setShowPopup(false)}
          onSave={fetchCategories}
          category={selectedCategory}
        />
      )}
    </div>
  );
};

export default CategoryList;
