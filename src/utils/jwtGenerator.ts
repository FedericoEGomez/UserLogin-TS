import jwt from 'jsonwebtoken'
require('dotenv').config()

const generarToken = ( body: any ) =>{
    const payload = {body}
    return jwt.sign(payload, process.env.JWT_SECRET || '',{
        expiresIn: '4h'
    })
    
}

export default generarToken