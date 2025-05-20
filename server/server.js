const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');
const productRoutes = require('./src/routes/productRoutes');
const { adminMiddleware } = require('./src/middleware/authMiddleware');
const{authMiddleware} = require('./src/middleware/authMiddleware');
const cartRoutes = require('./src/routes/cartRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/products',productRoutes);
app.use('/cart',authMiddleware, cartRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    // Testing the db connection
    require('./src/config/config.js')
});

// http://localhost:5004/products/get-products