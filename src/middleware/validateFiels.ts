/*
    Middleware to validate that there are no errors 
*/

import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validateFields = async(req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    logging.error(errors)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors});
    }
    next();
}
