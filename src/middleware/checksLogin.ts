import {check} from 'express-validator'
const checksLogin  = [
    check("email")
        .notEmpty().withMessage("el campo email es obligatorio")
        .isString().withMessage("el campo tipo debe ser de email string")
        .isEmail().withMessage("el string ingresado debe ser un email"),
    check("password")
        .notEmpty().withMessage("el campo password es obligatorio")
        .isString().withMessage("el campo password debe ser de tipo string"),
]

export default checksLogin;