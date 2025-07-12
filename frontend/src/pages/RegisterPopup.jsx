import React, { useState } from 'react';
import axios from 'axios';
import '../style/popup.css'; // use your existing styles
import logo from '../logo/logo.png';

const RegisterPopup = ({ onClose }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    city: '',
    country: '',
    role: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post(
        'http://localhost:5000/api/users/register',
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Register successful!');
      onClose(); // close the modal
    } catch (err) {
      alert('Register failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <form className="login-form" onSubmit={handleRegister}>
          <img src={logo} alt="Logo" className="logo" />

          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
          />
          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
          />
          <input
            name="country"
            placeholder="Country"
            value={form.country}
            onChange={handleChange}
          />
          <input
            name="role"
            placeholder="Role (e.g., user/admin)"
            value={form.role}
            onChange={handleChange}
          />

          <div className="button-group">
            <button type="submit">Register</button>
            <button type="button" onClick={onClose} className="cancel">
              Cancel
            </button>
          </div>

          <p className="version">© P Tour sale management - V1.3.3</p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPopup;
