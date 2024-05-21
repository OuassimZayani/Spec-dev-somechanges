import React from 'react';
import "./header.scss"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Person2Icon from '@mui/icons-material/Person2';
import { Link } from 'react-router-dom'; 
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  // Check if userData exists in localStorage
  const userData = JSON.parse(localStorage.getItem('userData'));

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('userData');
    navigate('/');
  };

  return (
    <div className="header_container"> 
        <div className="logo_container">
            <Link to="/">
                <img src={process.env.PUBLIC_URL + '/images/foodtasticLogo1.png'} alt="" />
            </Link>
        </div>
        {/* Conditional rendering based on the presence of userData */}
        {userData ? (
          <div className="user_info_container">
            <Link to="/orders">
              <Button variant="text">orders</Button>
            </Link>
            <Button variant="text" onClick={handleLogout}>Logout</Button>
          </div>
        ) : (
          <div className="login_register_container">
            <Link to="/login">
                <Button variant="text">Login</Button>
            </Link>
            <span>/</span>
            <Link to="/register">
                <Button variant="text">Register</Button>
            </Link>
          </div>
        )}
        <div className="links_container">
          <Link to="/cart">
            <span className="cart">
                <ShoppingCartIcon />
            </span>
          </Link>
          <Link to="/profile">
            <span className="profile">
                <Person2Icon />
            </span>
          </Link>
        </div>
    </div>
  )
}

export default Header;
