const Order = require('../models/OrderModel');
const Cart = require('../models/CartModel');

exports.createOrder = async (req, res) => {
  try {
    // Extract order data from the request body
    const { user_id, items, total_price, order_date } = req.body;

    // Create a new order document using the Order model
    const order = new Order({
      user_id,
      items,
      total_price,
      order_date,
    });

    // Save the order to the database
    await order.save();

    // Empty the user's cart
    await Cart.findOneAndUpdate(
      { user_id },
      { $set: { items: [] } }
    );

    // Return a success response
    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getOrders = async (req, res) => {
    try {
      // Retrieve all orders from the database
      const orders = await Order.find();
  
      // Return the list of orders
      res.status(200).json({ orders });
    } catch (error) {
      console.error(error);
      res.status(404).json({ error: 'No orders found' });
    }
  };
  
exports.getOneOrder = async (req, res) => {
    try {
      const orderId = req.params.id;
  
      // Retrieve the order by ID from the database
      const order = await Order.findById(orderId);

      // Return the order
      res.status(200).json({ order });
    } catch (error) {
      console.error(error);
      res.status(404).json({ error: 'Order not found' });
    }
};

exports.getMyOrders = async (req, res) => {
    try {
      const { user_id } = req.params;
  
      // Retrieve orders for the specified user
      const orders = await Order.find({ user_id });
  
      // Return the list of orders
      res.status(200).json({ orders });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
};