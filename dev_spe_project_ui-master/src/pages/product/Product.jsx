import React, { useState, useEffect } from 'react';
import "./product.scss";
import Header from '../../components/header/Header';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
//notification
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    //notification function
    const errorNotify = () => toast.error("You have to login first !");
    const successNotify = () => toast.success("Product added to cart successfully !");

    useEffect(() => {
        fetch(`http://localhost:5000/products/${productId}`)
            .then(response => response.json())
            .then(data => setProduct(data.product))
            .catch(error => console.error('Error fetching product:', error));
    }, [productId]);

    const handleAddToCart = () => {
        // Check if userData exists in localStorage
        const userData = localStorage.getItem('userData');
        if (!userData) {
            // Show notification to prompt user to login first
            errorNotify();
            return;
        }

        // Parse userData from localStorage
        const parsedUserData = JSON.parse(userData);
        // Prepare request data
        const requestData = {
            user_id: parsedUserData.user._id,
            product_id: productId,
            quantity: 1,
            price: product.price,
        };

        // Make the request to add the product to the cart
        fetch('http://127.0.0.1:5000/addToCart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
        .then(response => {
            if (response.ok) {
                // Show success message
                successNotify();
            } else {
                throw new Error('Failed to add product to cart');
            }
        })
        .catch(error => {
            console.error('Error adding product to cart:', error);
            // Show error message
            alert('Failed to add product to cart');
        });
    };

    return (
        <div className="product">
            <ToastContainer />
            <Header />
            {product && (
                <div className="product_details">
                    <div className="product_details_img_container">
                      <img src={`http://localhost:5000/${product.image}`} alt={product.name} />
                    </div>

                    <div className="product_details_info_container">
                      <div className="product_details_text_container">
                        <h2>{product.name}</h2>
                        <p>Description: {product.description}</p>
                        <p>Category: {product.category}</p>
                        <p>Price: {product.price}$</p>
                        <p>Stock Quantity: {product.stock_quantity}</p>
                        <p>Cities Available: {product.cities_available.join(', ')}</p>
                      </div>
                      <div className="product_details_buttons_container">
                        <Stack direction="row" spacing={2}>
                          <Button variant="contained" startIcon={<ShoppingCartIcon />} onClick={handleAddToCart}>
                            Add to cart
                          </Button>
                        </Stack>
                      </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Product;
