import axios from 'axios';
import React, { useState } from 'react';
import '../style/CategoryPopup.css';

const CategoryPopup = ({ category, onClose, onSave }) => {
  const [name, setName] = useState(category?.name || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (category) {
        await axios.put(
          `http://localhost:5000/api/categories/${category._id}`,
          { name },
          config
        );
      } else {
        await axios.post(
          'http://localhost:5000/api/categories',
          { name },
          config
        );
      }

      onSave();
      onClose();
    } catch (err) {
      alert('Failed to save category');
    }
  };

  return (
    <div className="popup-backdrop">
      <div className="popup">
        <h3>{category ? 'Edit Category' : 'Add Category'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              Name<span className="required">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="popup-actions">
            <span className="required-note">* indicates required field</span>
            <div className="popup-buttons">
              <button type="button" onClick={onClose}>
                Close
              </button>
              <button
                style={{ backgroundColor: '#3b82f6' }}
                type="submit"
                className="save-btn"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryPopup;
