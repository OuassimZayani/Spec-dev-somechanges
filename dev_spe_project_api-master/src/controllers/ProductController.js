const Product = require('../models/ProductModel');


exports.createProduct = async (req, res) => {
  try {
    // Extract product data from the request body
    const { name, description, category, price, stock_quantity, producer_id, image, cities_available } = req.body;

    // Create a new product document using the Product model
    const product = new Product({
      name,
      description,
      category,
      price,
      stock_quantity,
      producer_id,
      image,
      cities_available,
    });

    // Save the product to the database
    await product.save();

    // Return a success response
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getProducts = async (req, res) => {
  try {
    // Retrieve all products from the database
    const products = await Product.find();

    // Return the list of products
    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: 'No product found' });
  }
};

exports.getOneProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Retrieve the product by ID from the database
    const product = await Product.findById(productId);

    // Return the product
    res.status(200).json({ product });
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: 'Product not found' });
  }
};

//delete & update product