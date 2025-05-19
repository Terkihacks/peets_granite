const express = require('express');
const prisma = require('../prismaClient');
const router = express.Router();

// CRUD Operations for Payment

// Create a payment
router.post('/create-payment', async (req, res) => {
    const { customer_id, amount, payment_method } = req.body;

    try {
        const payment = await prisma.payment.create({
            data: {
                customer_id,
                amount,
                payment_method
            }
        });
        res.status(201).json(payment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create payment' });
    }
});
