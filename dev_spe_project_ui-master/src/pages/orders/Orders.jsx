import React, { useState, useEffect } from 'react';
import "./orders.scss";
import Header from '../../components/header/Header';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders data from the server
    const fetchOrders = async () => {
      try {
        // Get user_id from localStorage
        const userData = localStorage.getItem('userData');
        if (!userData) {
          throw new Error('User data not found');
        }
        const userDataObject = JSON.parse(userData);
        const user_id = userDataObject.user._id;

        const response = await fetch(`http://127.0.0.1:5000/myOrders/${user_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch orders data');
        }

        const responseData = await response.json();
        setOrders(responseData.orders);
      } catch (error) {
        console.error('Error fetching orders data:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="orders">
      <Header />
      <div className="orders-content">
        <h1 className="orders-title">Your Orders</h1>
        {orders.length > 0 ? (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order._id} className="order-item">
                <h2>Order ID: {order._id}</h2>
                <p>Total Price: {order.total_price}$</p>
                <p>Order Date: {new Date(order.order_date).toLocaleDateString()}</p>
                <ul>
                  {order.items.map(item => (
                    <li key={item._id}>
                      Product ID: {item.product_id} | Quantity: {item.quantity} | Price: {item.price}$
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p>No orders found</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
