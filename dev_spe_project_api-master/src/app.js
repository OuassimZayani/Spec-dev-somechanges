const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const cors = require('cors');
const app = express();

// Configure Express to serve static files from the 'public' directory
app.use(express.static('public'))

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const database = 'Foodtastic';

// Connection String
const connectionString = `mongodb://127.0.0.1:27017/${database}`;

// Connect to MongoDB
mongoose.connect(connectionString);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB connection established successfully');
});

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
