const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// API CRUD FUNCTIONALITIES
// READ
router.get('/', async (req,res) => {
  const products = await Product.find();
  res.json(products);
});

//CREATE
router.post('/', async (req,res) => {
  console.log(req.body);

  //insert in database
  const {name} = req.body;
  const newProduct = new Product({name});
  await newProduct.save();
  res.json('Successfully created');
});

//UPDATE
router.put('/:id',async (req,res) => {
  const {id} = req.params;
  const {name} = req.body;

  //UPDATING IN DATABASE
  const updateProduct = await Product.findById(id);
  updateProduct.name = name;
  await updateProduct.save();
  console.log(updateProduct);
  res.json("Successfully updated");
});

router.delete('/:id', async (req,res) => {
  const {id} = req.params;

  //DELETING IN DATABASE
  await Product.findByIdAndDelete(id);
  res.json("Successfully deleted");
})

module.exports = router;
