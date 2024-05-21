import React, { useState, useEffect } from 'react';
import "./orders.scss";
import Header from '../../components/header/Header';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';

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

  // Function to generate PDF for a given order
  const generatePDF = (order) => {
    const userData = localStorage.getItem('userData');
    if (!userData) {
      throw new Error('User data not found');
    }
    const userDataObject = JSON.parse(userData);
    const user_data = userDataObject.user;
    const doc = new jsPDF();

    // User information
    doc.setFontSize(12);
    doc.text(`Compagny: Foodtastic `, 85, 10);
    doc.text(`First Name: ${user_data.firstname}`, 30, 30);
    doc.text(`Last Name: ${user_data.lastname}`, 30, 40);
    doc.text(`Email: ${user_data.email}`, 30, 50);
    doc.text(`Phone: ${user_data.phone_number}`, 30, 60);

    // Order information
    doc.text(`Order ID: ${order._id}`, 30, 80);
    doc.text(`Order Date: ${new Date(order.order_date).toLocaleDateString()}`, 30, 90);

    // Items
    let y = 120; // Initial y-position for items
    order.items.forEach((item) => {
      doc.text(`Product ID: ${item.product_id}`, 20, y);
      doc.text(`Quantity: ${item.quantity}`, 110, y);
      doc.text(`Price: ${item.price}$`, 160, y);
      y += 10;
    });
    doc.text(`Total Price: ${order.total_price}$`, 150, 160);
    doc.save(`${order._id}.pdf`);
  };



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
                <button onClick={() => generatePDF(order)}>Download PDF</button>
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
