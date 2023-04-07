import {check} from 'express-validator'
import User from '../models/user';
import bcrypt from 'bcryptjs';

const checksEdit  = [
    check('name')
        .notEmpty().withMessage('El campo name es obligatorio')
        .isString().withMessage('El campo name debe ser de tipo string'),
    check('email')
        .notEmpty().withMessage('El campo email es obligatorio')
        .isString().withMessage('El campo tipo debe ser de email string')
        .isEmail().withMessage('El string ingresado debe ser un email'),
    check('oldPassword')
        .notEmpty().withMessage('El campo oldPassword es obligatorio')
        .isString().withMessage('El campo oldPassword debe ser de tipo string'),
    check('password')
        .notEmpty().withMessage('El campo password es obligatorio')
        .isString().withMessage('El campo password debe ser de tipo string')
        .custom((value, { req }) => {
            return value == req.body.repeatpassword
        }).withMessage('Las contraseñas no coinciden')
        .custom(value=>{
            //RegEx o expresion regular
            const validar = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
            return validar.test(value)
        }).withMessage('La contraseña debe contar con al menos 8 caracteres , una mayuscula (A-Z), un numero (0-9) y un caracter ( #?!@$%^&* )')
        .custom((value , {req} )=> {
            return User.findOne({ email: req.body.email } 
            ).then((user:any)=> {
                if (bcrypt.compareSync(req.body.oldPassword, user.password)) {
                return Promise.reject('La ingresada no puede ser la misma que la antigua contraseña');
                }
            })
        }),
    check('repeatpassword')
        .notEmpty().withMessage('Debes repetir tu contraseña')
]
export default checksEdit