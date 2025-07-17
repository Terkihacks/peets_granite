const express = require('express');
const prisma = require('../prismaClient');
const router = express.Router();

// Create an order
router.post('/create-order', async (req, res) => {
    const { customer_id,full_name,email,address,city, zip,payment_method } = req.body;
    if (!customer_id) {
        customer_id = 1; // Replace with an actual customer_id from your DB
    }
    console.log('customer_id from body:', customer_id);


    try {
        const order = await prisma.order.create({
            data: {
                customer: {
                    connect: {
                        customer_id: Number(customer_id )
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

// Read order

router.get('/get-orders', async(req,res) => {
    try {
        const orders = await prisma.order.findMany();
        res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'Failed to fetch orders'})    
    }
})

// Delete an order

router.delete('/delete-order',async(req,res) =>{
    try {
        
    } catch (error) {
        
    }
})
module.exports = router;