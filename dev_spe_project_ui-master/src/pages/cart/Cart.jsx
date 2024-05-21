import React, { useState, useEffect } from 'react';
import "./cart.scss";
import Header from '../../components/header/Header';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Fetch cart data from the server
    const fetchCartData = async () => {
      try {
        // Get user_id from localStorage
        const userData = localStorage.getItem('userData');
        if (!userData) {
          throw new Error('User data not found');
        }
        const userDataObject = JSON.parse(userData);
        const user_id = userDataObject.user._id;

        const response = await fetch('http://127.0.0.1:5000/showCart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch cart data');
        }

        const responseData = await response.json();
        setCartData(responseData.cart);
        calculateTotalPrice(responseData.cart.items);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    fetchCartData();
  }, []);

  const calculateTotalPrice = (items) => {
    const totalPrice = items.reduce((total, item) => total + (item.price), 0).toFixed(2);
    setTotalPrice(totalPrice);
  };

  const handleDeleteItem = async (itemId) => {
    try {
      // Get user_id from localStorage
      const userData = localStorage.getItem('userData');
      if (!userData) {
        throw new Error('User data not found');
      }
      const userDataObject = JSON.parse(userData);
      const user_id = userDataObject.user._id;
    
      const response = await fetch('http://127.0.0.1:5000/removeFromCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id,
          product_id: itemId,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to remove item from cart');
      }
    
      // Update cart data after successful removal
      const updatedCartData = await response.json();
      setCartData(updatedCartData.cart);
    
      // Recalculate total price
      calculateTotalPrice(updatedCartData.cart.items);
    } catch (error) {
      console.error('Error deleting item from cart:', error);
    }
  };
  

  const handleCheckout = async () => {
    try {
      // Get user_id from localStorage
      const userData = localStorage.getItem('userData');
      if (!userData) {
        throw new Error('User data not found');
      }
      const userDataObject = JSON.parse(userData);
      const user_id = userDataObject.user._id;
  
      console.log('Initiating checkout...');
  
      const items = cartData.items.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price
      }));
  
      const response = await fetch('http://127.0.0.1:5000/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id,
          items,
          total_price: totalPrice,
          order_date: new Date().toISOString()
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to place order');
      }
  
      console.log('Order placed successfully!');
  
      // Redirect to /orders
      navigate('/orders');
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };  
  
  return (
    <div className="cart">
      <Header />
      <div className="cart-content">
        <h1 className="cart-title">Your Cart</h1>
        {cartData ? (
          <div className="cart-items">
            {cartData.items.map((item) => (
              <div key={item._id} className="cart-item">
                <h2 className="product-id">Product id: {item.product_id}</h2>
                <p className="quantity">Quantity: {item.quantity}</p>
                <p className="price">Price: {item.price}$</p>
                <Button size="small" onClick={() => handleDeleteItem(item.product_id)} className="delete-button" variant="outlined" color="error">
                  remove
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <div className="total-price">Total Price: <span className="total-price_number">{totalPrice}$</span></div>
        <Button 
        size="small" 
        style={{ marginTop: '20px' }} 
        onClick={handleCheckout} 
        className="checkout-button" 
        variant="outlined" 
        color="info"   
        disabled={cartData && cartData.items.length === 0}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
