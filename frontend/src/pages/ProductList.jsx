import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/UserList.css';
import { IoMenu } from "react-icons/io5";
import logo from '../logo/logo.png';
import { IoIosMore } from "react-icons/io";
import ProductPopup from './ProductPopup';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [dropdownOpenId, setDropdownOpenId] = useState(null);

  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProducts = () => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(() => alert('Failed to load products'));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filtered.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    } catch {
      alert('Delete failed');
    }
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setShowPopup(true);
    setDropdownOpenId(null);
  };

  const handleAddClick = () => {
    setSelectedProduct(null);
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
            <IoMenu /> Products
          </div>
          <img src={logo} alt="Logo" className="minilogo" />
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <p>Dashboard</p><p>/</p><p style={{ color: 'gray' }}>Products</p>
        </div>
      </div>

      <div className="user-list-header">
        <div style={{justifyContent:"space-between", display:"flex"}}>
        <input style={{width: "150px"}}
          type="text"
          className="search-input"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        </div>
        <button className="add-user-btn" onClick={handleAddClick}>
          + Add Product
        </button>
      
      </div>

      <div className="user-table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>SKU</th>
              <th>Pax</th>
              <th>Price</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map(p => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.sku}</td>
                <td>{p.pax}</td>
                <td>${p.price.toFixed(2)}</td>
                <td>{p.category?.name || 'N/A'}</td>
                <td style={{ position: 'relative' }}>
                  <button
                    className="action-btn"
                    onClick={() => setDropdownOpenId(dropdownOpenId === p._id ? null : p._id)}
                  >
                    <IoIosMore />
                  </button>
                  {dropdownOpenId === p._id && (
                    <div className="dropdown-menu">
                      <button onClick={() => handleEditClick(p)}>Update</button>
                      <button onClick={() => handleDelete(p._id)}>Delete</button>
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
        <ProductPopup
          onClose={() => setShowPopup(false)}
          product={selectedProduct}
          onSave={fetchProducts}
        />
      )}
    </div>
  );
};

export default ProductList;
