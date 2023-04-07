import { Request, Response, NextFunction } from 'express';
import {validationResult} from 'express-validator';

const validarCheck = (req: Request, res: Response, next: NextFunction) =>{
    const err = validationResult(req);
    if (err.isEmpty()) {
        next();
    } else {
       console.log(err) 
       res.status(400).json(err);
    }  
}

export default validarCheck;