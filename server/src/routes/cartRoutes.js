 const express = require('express');
const prisma = require('../prismaClient');
const router = express.Router();


//Create a cart item
router.post('/create-cart-item', async (req, res) => {
    const { product_id, customer_id, quantity } = req.body;

    try {
        const cartItem = await prisma.cart.create({
            data: {
                product_id,
                customer_id,
                quantity
            }
        });
        res.status(201).json(cartItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create cart item' });
    }
});

// Update a cart item
router.put('/update-cart-item/:id', async (req, res) => {
    const { id } = req.params;
    const { product_id, customer_id, quantity } = req.body;

    try {
        const updatedCartItem = await prisma.cart.update({
            where: { id: parseInt(id) },
            data: {
                product_id,
                customer_id,
                quantity
            }
        });
        res.status(200).json(updatedCartItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update cart item' });
    }
});

// Get all cart items
router.get('/get-cart-items', async (req, res) => {
    try {
        const cartItems = await prisma.cart.findMany();
        res.status(200).json(cartItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch cart items' });
    }
});


// Delete a cart item
router.delete('/delete-cart-item/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCartItem = await prisma.cart.delete({
            where: { id: parseInt(id) }
        });
        res.status(200).json(deletedCartItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete cart item' });
    }
});

module.exports = router;