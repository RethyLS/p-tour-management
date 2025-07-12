const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create a product
router.post('/', async (req, res) => {
  const { name, sku, pax, price, category } = req.body;

  try {
    const newProduct = new Product({ name, sku, pax, price, category });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update a product
router.put('/:id', async (req, res) => {
  const { name, sku, pax, price, category } = req.body;

  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { name, sku, pax, price, category },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a product
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
