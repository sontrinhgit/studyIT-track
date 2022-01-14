const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next) =>  {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1] //khi split xong roi thi lay phan tu thu 2 trong array chinh la token dang sau Bearer

    if(!token)
    return res.status(401).json({success: false, message: 'Access token not found'})

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        //gan nguoc lai decode.userId vao request vi res cung gan mot userId vao object do 
        req.userId = decoded.userId
        next()
    } catch(error) {
        console.log(error)
        return res.status(403).json({success: false, message: 'Invalid token'})
    }

} 

module.exports = verifyToken