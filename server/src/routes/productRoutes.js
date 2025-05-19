const express = require('express');
const prisma = require('../prismaClient');
const router = express.Router();

// Create a product
router.post('/create-product', async (req, res) => {

    const {product_name, product_price, product_description, product_quantity} = req.body;
    try {
        const product = await prisma.product.create({
            data: {
                product_name,
                product_price,
                product_description,
                product_quantity
            }
        });
        res.status(201).json(product);
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