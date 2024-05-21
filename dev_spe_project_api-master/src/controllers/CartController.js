const Cart = require('../models/CartModel');

exports.addToCart = async (req, res) => {
  try {
    const { user_id, product_id, quantity, price } = req.body;

    // Find the cart for the user
    let cart = await Cart.findOne({ user_id });

    // If cart doesn't exist, create a new one
    if (!cart) {
      cart = new Cart({ user_id, items: [] });
    }

    // Check if the product already exists in the cart
    const existingItem = cart.items.find(item => item.product_id === product_id);

    if (existingItem) {
      // Update quantity and price of existing item
      existingItem.quantity += quantity;
      existingItem.price += price;
    } else {
      // Add new item to cart
      cart.items.push({ product_id, quantity, price });
    }

    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: 'Product added to cart', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { user_id, product_id } = req.body;

    // Find the cart for the user
    const cart = await Cart.findOne({ user_id });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Filter out the item to remove from the cart
    cart.items = cart.items.filter(item => item.product_id !== product_id);

    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: 'Product removed from cart', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.showCart = async (req, res) => {
  try {
    const { user_id } = req.body;

    // Find the cart for the user
    const cart = await Cart.findOne({ user_id });

    // Return the cart
    res.status(200).json({ cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Cart not found' });
  }
};

