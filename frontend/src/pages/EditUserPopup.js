import React, { useState, useEffect } from 'react';
import '../style/EditUserPopup.css'; // reuse existing styling

const EditUserPopup = ({ user, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    address: '',
    city: '',
    country: '',
    avatar: '',
    role: '',
    description: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        email: user.email || '',
        password: '',
        address: user.address || '',
        city: user.city || '',
        country: user.country || '',
        avatar: user.avatar || '',
        role: user.role || '',
        description: user.description || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:5000/api/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update user');
      }

      onUpdate(); // Refresh user list
      onClose();  // Close modal
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Edit User</h2>
        <div className="form">
          <div className="form-row">
            <input type="text" name="name" placeholder="Full name *" value={formData.name} onChange={handleChange} />
            <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
          </div>
          <div className="form-row">
            <input type="email" name="email" placeholder="Email *" value={formData.email} onChange={handleChange} />
            <input type="password" name="password" placeholder="Password *" value={formData.password} onChange={handleChange} />
          </div>
          <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
          <div className="form-row">
            <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} />
            <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} />
          </div>
          <div className="form-row">
            <input type="text" name="avatar" placeholder="Avatar" value={formData.avatar} onChange={handleChange} />
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="sale">Sale</option>
              <option value="user">User</option>
              <option value="super admin">Super admin</option>
            </select>
          </div>
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange}></textarea>
          <div className="form-actions">
            <button onClick={onClose}>Close</button>
            <button className="save-btn" onClick={handleSubmit}>Save</button>
          </div>
          <p className="required-note">* indicates required field</p>
        </div>
      </div>
    </div>
  );
};

export default EditUserPopup;
