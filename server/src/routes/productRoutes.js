const express = require('express');
const prisma = require('../prismaClient');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const cloudinary = require('../config/cloudinary');

// npx prisma db push

// Create a product
router.post('/create-product',upload.single('image'), async (req, res) => {

    const {product_name, product_price, product_description, product_quantity} = req.body;
    console.log("The received body is:", req.body);
    
    try {
         if (!req.file) {
      return res.status(400).json({ error: 'Image file is required.' });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path)
    console.log("✅ Image uploaded:", result.secure_url);

    // Save to DB
        const product = await prisma.product.create({
            data: {
                product_name,
                product_price,
                product_description,
                product_quantity,
                image_url: result.secure_url, // Store the Cloudinary URL
            }
        });
        // res.status(201).json(product);
         res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create product' });
    }
})

// Get all products
router.get('/get-products', async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

//Update a product
router.put('/update-product/:id', async (req, res) => {
    const { id } = req.params;
    const { product_name, product_price, product_description, product_quantity } = req.body;

    try {
        const updatedProduct = await prisma.product.update({
            where: { id: parseInt(id) },
            data: {
                product_name,
                product_price,
                product_description,
                product_quantity
            }
        });
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update product' });
    }
 
})

// Delete a product
router.delete('/delete-product/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.product.delete({
            where: { id: parseInt(id) }
        });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
});

module.exports = router;