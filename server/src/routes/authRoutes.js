const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../prismaClient');



const router = express.Router()
// Register a new user endpoint /auth/register
router.post('/register',async(req,res) => {
    const {first_name,last_name,email,address,password,phone_number} = req.body
    const hashedPassword =  bcrypt.hashSync(password,10)
    
    //Save the new user

    try{
        const customer = await prisma.customer.create({
            data:{
                first_name,
                last_name,
                email,
                address,
                phone_number,
                password:hashedPassword
            }
        })
    }
    catch (err) {
    console.log(err.message)
    res.sendStatus(503)
}
})

// Login a user

router.post('/login',async (req,res) => {
    const {email,password} = req.body;

    try {
        const customer = await prisma.customer.findUnique({
            where:{
                email:email
            }
        })
        //If we cant find a customer return
        if(!customer) {return res.status(404).send({message:"User not found"})}
        const passwordIsValid = bcrypt.compareSync(password, customer.password)

        // if the password does not match, return out of the function
        if (!passwordIsValid) { return res.status(401).send({ message: "Invalid password" }) }
        console.log(customer)
       
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' })
        res.json({ token })
    } catch (error) {
         console.log(err.message)
         res.sendStatus(503)
    }
})

module.exports = router