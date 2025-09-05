const express = require('express');
const cors = require('cors');

const authRoutes = require('./src/routes/authRoutes');
const productRoutes = require('./src/routes/productRoutes');
const cartRoutes = require('./src/routes/cartRoutes');
const orderRoutes = require('./src/routes/orderRoutes.js')

const { authMiddleware } = require('./src/middleware/authMiddleware');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
// Routes
app.use('/v1/auth', authRoutes);
app.use('/v1/products', productRoutes);
app.use('/v1/orders',orderRoutes)
app.use('/v1/cart', authMiddleware, cartRoutes);

// Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // Test DB connection
  require('./src/config/config.js');
});

// http://localhost:8000/v1/products/get-products
// http://localhost:8000/v1/auth/register
// http://localhost:8000/v1/auth/login