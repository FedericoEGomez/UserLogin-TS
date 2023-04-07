import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user';
import generarToken from '../utils/jwtGenerator';

class ApiController {

    async verUsuarios (req: Request, res: Response) {
        const users = await User.find();
        console.log(users);
        res.status(200).json({users});
    }

    async register (req: Request, res: Response) {
        try {
            let salt = bcrypt.genSaltSync(10)
            let hash = bcrypt.hashSync(req.body.password, salt)
            let usuario = {
                name: req.body.name,
                email: req.body.email,
                password: hash
            }
            const item = new User(usuario)
            await item.save()
            res.status(201).json({item})
        } catch (error) {
            console.log(error)
            res.status(501).json({error})
        }
    }

    async editarUnUsuario (req: Request, res: Response) {
        try {
            await User.findByIdAndUpdate(req.params.id,req.body);
            console.log("ususario editada");
            res.status(201).json(req.body);
        } catch (error) {
            console.log(error);
            res.status(501).json(error);
        }
    }

    async eliminarUsuario (req: Request, res: Response) {
        const user = await User.findByIdAndDelete(req.params.id);
        console.log({msg: "adios usuario", user});
        res.status(200).json({msg: "adios usuario", user});
    }
    async loginToken (req: Request, res: Response) {
        try {
            
            const usuario:any = await User.findOne({email: req.body.email})
            console.log(usuario)
            console.log(usuario.password)
            console.log(usuario._id)
            if (usuario == null ) {
                res.json({msg: "El mail o la contraseña es incorrecto"})     
            }
            
            if (!bcrypt.compareSync(req.body.password, usuario.password)) {
                res.json({msg: "El mail o la contraseña es incorrecto"}) 
            }
            const token = generarToken({id:usuario._id, email:usuario.email})
            res.json({email: req.body.email, token})
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    }
}

export default new ApiController