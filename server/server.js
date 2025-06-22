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
app.use(express.urlencoded({ extended: true }));
 
// Routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/orders',orderRoutes)
app.use('/cart', authMiddleware, cartRoutes);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // Test DB connection
  require('./src/config/config.js');
});

// http://localhost:5004/products/get-products
// http://localhost:5004/auth/register