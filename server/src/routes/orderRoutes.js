const express = require('express');
const prisma = require('../prismaClient');
const router = express.Router();

// Create an order
router.post('/create-order', async (req, res) => {
    const { customer_id,full_name,email,address,city, zip,payment_method } = req.body;
    console.log('customer_id from body:', customer_id);


    try {
        const order = await prisma.order.create({
            data: {
                customer: {
                    connect: {
                        customer_id: customer_id  // Connect to existing customer
                    }
                },
                full_name,
                email,
                address,
                city,
                zip,
                payment_method
            },
            include: {
                customer: true  // Optional: Include customer details in response
            }
        });
        
        res.status(201).json({ 
            message: 'Order created successfully', 
            order 
        });
    } catch (error) {
        console.error('Order creation error:', error);
        res.status(500).json({ 
            error: 'Failed to create order',
            details: error.message 
        });
    }
});

module.exports = router;