import React, { useState, useEffect } from 'react';
import './home.scss';
import Header from '../../components/header/Header';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  // State to store the retrieved products
  const [products, setProducts] = useState([]);
  // State to store the selected city
  const [selectedCity, setSelectedCity] = useState("all_cities");
  // State to store filtered products
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data.products);
        setFilteredProducts(data.products);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  // Function to handle click on city links
  const handleCityClick = (city) => {
    setSelectedCity(city);
    filterProducts(city); // Filter products based on the selected city
  };

  // Function to capitalize the first letter of a string
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Function to filter products based on selected city
  const filterProducts = (city) => {
    // Capitalize the first letter of the city
    const capitalizedCity = city === "all_cities" ? city : capitalizeFirstLetter(city);

    if (city === "all_cities") {
      // If "All cities" is selected, show all products
      setFilteredProducts(products);
    } else {
      // Otherwise, filter products based on selected city
      const filtered = products.filter(product => product.cities_available.includes(capitalizedCity));
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className='home_container'>
      <Header />
      <div className="cities_links_container">
        <ul className="cities_links">
          <li className="all_cities">
            <a href="#" onClick={() => handleCityClick("all_cities")} className={selectedCity === "all_cities" ? "link_selected" : ""}>All cities</a>
          </li>
          <li className="paris">
            <a href="#" onClick={() => handleCityClick("paris")} className={selectedCity === "paris" ? "link_selected" : ""}>Paris</a>
          </li>
          <li className="montreal">
            <a href="#" onClick={() => handleCityClick("montreal")} className={selectedCity === "montreal" ? "link_selected" : ""}>Montreal</a>
          </li>
          <li className="berlin">
            <a href="#" onClick={() => handleCityClick("berlin")} className={selectedCity === "berlin" ? "link_selected" : ""}>Berlin</a>
          </li>
          <li className="rome">
            <a href="#" onClick={() => handleCityClick("rome")} className={selectedCity === "rome" ? "link_selected" : ""}>Rome</a>
          </li>
          <li className="casablanca">
            <a href="#" onClick={() => handleCityClick("casablanca")} className={selectedCity === "casablanca" ? "link_selected" : ""}>Casa</a>
          </li>
        </ul>
      </div>
      <div className="products_container">
        <div className="title">
          <h3>Our Products</h3>
        </div>
        <div className="products">
          {filteredProducts.map(product => (
            <Card key={product._id} sx={{ maxWidth: 220 }}>
              <Link to={`/product/${product._id}`} className='productCardLink'>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={"http://localhost:5000/" + product.image}
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.name}
                    </Typography>
                    <Typography variant="body2">
                      {product.description}
                    </Typography>
                    <Typography gutterBottom variant="h7" component="div">
                      Category: {product.category}
                    </Typography>
                    <Typography gutterBottom variant="h7" component="div">
                      Stock Quantity: {product.stock_quantity}
                    </Typography>
                    <Typography gutterBottom variant="h7" component="div">
                      Cities Available: {product.cities_available.join(', ')}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                      Price: <span>{product.price}$</span>
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
              <CardActions>
                <Link to={`/product/${product._id}`}>
                  <Button size="small" color="primary">
                    See details
                  </Button>
                </Link>
              </CardActions>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
