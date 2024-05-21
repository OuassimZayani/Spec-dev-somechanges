import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.scss';
import Header from '../../components/header/Header';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [region, setRegion] = useState('all_regions');

  useEffect(() => {
    fetchProducts();
  }, [region]);// Add inside Array for Automatic Filtering:  category, minPrice, maxPrice 


  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products', {
        params: {
          category,
          minPrice,
          maxPrice,
          region,
        },
      });
      setProducts(response.data.products);
      setFilteredProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products', error);
    }
  };

  const handleFilterChange = () => {
    fetchProducts();
  };

  return (
    <div className='home_container'>
      <Header />
      <div className="filter_container">
        <div className="filter">
          <label>
            Region:
            <select value={region} onChange={(e) => setRegion(e.target.value)}>
              <option value="all_regions">All Regions</option>
              <option value="Casablanca">Casablanca</option>
              <option value="Paris">Paris</option>
              <option value="Montreal">Montreal</option>
              <option value="Berlin">Berlin</option>
              <option value="Rome">Rome</option>
              {/* Add more regions as needed */}
            </select>
          </label>
        </div>
        <div className="filter">
          <label>
            Category:
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">All</option>
              <option value="Fruits">Fruits</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Dairy">Dairy</option>
              <option value="Meat">Meat</option>
              <option value="Pantry">Pantry</option>
              <option value="Bakery">Bakery</option>
              <option value="Grains">Grains</option>
              <option value="Sweets">Sweets</option>
              {/* Add more categories as needed */}
            </select>
          </label>
        </div>
        <div className="filter">
          <label>
            Min Price:
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </label>
        </div>
        <div className="filter">
          <label>
            Max Price:
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </label>
        </div>

        <Button onClick={handleFilterChange}>Apply Filters</Button>
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
