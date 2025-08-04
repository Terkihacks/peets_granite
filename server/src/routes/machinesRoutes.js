const express = require('express')
const prisma = require('../prismaClient')
const router = express.Router
const multer = require('multer')
const cloudinary = require('../config/cloudinary')

//Create a machine product

router.post('/create-machine',upload.single('image'), async(req,res) =>{
    const {} = req.body
    try {
        if(!req.file){
            return res.status(400).json({error:'Image is required'})
        }

        // Upload the image to cloudinary
        const res = await cloudinary.uploader.upload(req.file.path)

        // Save to the database

        const machine = await prisma.machine.create({
            data: {
                category,
                img_url: res.secure_url,
                brand,
                model,
                kva,
                kw,
                voltage,
                price
            }
        });
        res.status(201).json({message:'Mahine created successfully'})
    } catch (error) {
        console.error(error)
        res.status(500).json({error:'Failed to create machine'})
    }
})

//Get all products
router.get('/get-machines', async(req,res) =>{
    try {
        const machines = await prisma.machines.product.findMany();
        res.status(500).json({error:'Failed to fetch products'})
    } catch (error) {
        console.error(error)
        res.status(500).json({error:'Failed to fetch all the products'})
    }
})