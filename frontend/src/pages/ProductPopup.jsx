import React, { useEffect, useState } from 'react';
import '../style/RegisterPopup.css'; // Already used in your project
import axios from 'axios';

const ProductPopup = ({ product, onClose, onSave }) => {
  const [form, setForm] = useState({
    name: '',
    sku: '',
    pax: '',
    price: '',
    category: ''
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || '',
        sku: product.sku || '',
        pax: product.pax || '',
        price: product.price || '',
        category: product.category?._id || ''
      });
    } else {
      setForm({ name: '', sku: '', pax: '', price: '', category: '' });
    }

    axios.get('http://localhost:5000/api/categories')
      .then(res => setCategories(res.data))
      .catch(() => alert('Failed to load categories'));
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: form.name,
      sku: form.sku,
      pax: Number(form.pax),
      price: Number(form.price),
      category: form.category
    };

    try {
      if (product) {
        await axios.put(`http://localhost:5000/api/products/${product._id}`, data);
      } else {
        await axios.post('http://localhost:5000/api/products', data);
      }
      onSave();
      onClose();
    } catch (err) {
      alert('Failed to save product');
    }
  };

  return (
    <div className="popup-backdrop">
      <div className="popup">
        <h3>{product ? 'Edit Item' : 'Add Product'}</h3>
        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-group">
            <label>Name<span className="required">*</span></label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>SKU</label>
            <input
              type="text"
              name="sku"
              value={form.sku}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Price<span className="required">*</span></label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Pax</label>
            <input
              type="number"
              name="pax"
              value={form.pax}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Category<span className="required">*</span></label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              {categories.map(c => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="form-full">
            <label>Description</label>
            <textarea disabled placeholder="Not used yet" />
          </div>

          <div className="form-full">
            <label>Note</label>
            <textarea disabled placeholder="Not used yet" />
          </div>

          <div className="popup-actions">
            <span className="required-note">* indicates required field</span>
            <div>
              <button type="button" onClick={onClose}>Close</button>
              <button style={{backgroundColor:'#3b82f6',}} type="submit" className="save-btn">Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductPopup;
