import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import User from '../models/user';
require('dotenv').config()

const validarJWT = async (req: Request, res:Response, next: NextFunction) =>{
    const token = req.header('JWTtoken')
    console.log(token)
    if(!token){
        return res.status(401).json({
            msg: "No hay token en esta peticion"
        })
    }
    try {
        const tokenJwt:any = jwt.verify(token,process.env.JWT_SECRET || '')
        const user = await User.findById(tokenJwt.body.id)
        if (!user) {
            return res.status(401).json({
                msg: "Token no valido - DB"
            })
        }
        next()
    } catch (error) {
        res.status(401).json({
            msg: "Token no valido", error
        })
    }
}

export default validarJWT;