import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/LoginPage.css';
import logo from '../logo/logo.png';

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    city: '',
    country: '',
    role: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/register', form);
      localStorage.setItem('token', res.data.token);
      alert('Register successful!');
      navigate('/'); // go to after register
    } catch (err) {
      alert('Register failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className='log'>
    <div className="login-container">
      <form className="login-form" onSubmit={handleRegister}>
        <img src={logo} alt="Logo" className="logo" />
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
        <input name="city" placeholder="City" value={form.city} onChange={handleChange} />
        <input name="country" placeholder="Country" value={form.country} onChange={handleChange} />
        <input name="role" placeholder="Role (e.g., user/admin)" value={form.role} onChange={handleChange} />

        <button type="submit">Register</button>
        <p className="version">© P Tour sale management - V1.3.3</p>
      </form>
    </div>
    </div>
  );
};

export default RegisterPage;
