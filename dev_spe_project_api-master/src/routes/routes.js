const express = require('express');
const AuthController = require('../controllers/AuthController');
const ProductController = require('../controllers/ProductController');
const ProducerController = require('../controllers/ProducerController');
const CartController = require('../controllers/CartController');
const OrderController = require('../controllers/OrderController');

const router = express.Router();

//Auth
router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.loginUser);
router.put('/updateUser', AuthController.updateUser);
//Product
router.post('/product', ProductController.createProduct);
router.get('/products', ProductController.getProducts);
router.get('/products/:id', ProductController.getOneProduct);



//Producer
router.post('/producer', ProducerController.createProducer);
router.get('/producers', ProducerController.getProducers);
router.get('/producers/:id', ProducerController.getOneProducer);

//Cart
router.post('/addToCart', CartController.addToCart);
router.post('/removeFromCart', CartController.removeFromCart);
router.post('/showCart', CartController.showCart);


//Order
router.post('/order', OrderController.createOrder);
router.get('/orders', OrderController.getOrders);
router.get('/orders/:id', OrderController.getOneOrder);
router.get('/myOrders/:user_id', OrderController.getMyOrders);


module.exports = router;