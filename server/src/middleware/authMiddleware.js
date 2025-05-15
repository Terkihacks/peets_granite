const jwt = require('jsonwebtoken');
exports.authMiddleware = (req,res,next) => {
    const token = req.headers['authorization']
    if(!token) {return res.status(401).json({message:"No token provided"})}

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) { return res.status(401).json({ message: "Invalid token" }) }

        req.userId = decoded.id
        next()
    })
}

// Add admin authentication

exports.adminMiddleware = (req,res,next) => {
    const token = req.headers['authorization']
    if(!token) {return res.status(401).json({message:"No token provided"})}

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) { return res.status(401).json({ message: "Invalid token" }) }

        if(decoded.role !== 'admin') {
            return res.status(403).json({ message: "Forbidden" })
        }
        req.userId = decoded.id
        next()
    })
}