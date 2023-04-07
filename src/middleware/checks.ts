import {check} from 'express-validator'
import User from '../models/user';

const checks  = [
    check('name')
        .notEmpty().withMessage('El campo name es obligatorio')
        .isString().withMessage('El campo name debe ser de tipo string'),
    check('email')
        .notEmpty().withMessage('El campo email es obligatorio')
        .isString().withMessage('El campo tipo debe ser de email string')
        .isEmail().withMessage('El string ingresado debe ser un email')
        .custom(value => {
            return User.findOne({ email: value }
            ).then(user => {
                if (user) {
                    return Promise.reject('El email ya se encuentra registrado');
                }
            })
        }),
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
        }).withMessage('La contraseña debe contar con al menos 8 caracteres , una mayuscula (A-Z), un numero (0-9) y un caracter ( #?!@$%^&* )'),
    check('repeatpassword')
        .notEmpty().withMessage('Debes repetir tu contraseña')
]
export default checks