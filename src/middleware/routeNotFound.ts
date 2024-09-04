/*
    Middleware function to manages the URL not found (404)
*/
import { Request, Response, NextFunction } from 'express';

export const  routeNotFound = async(req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`URL Not found || 404 || METHOD: [${req.method}] - URL: [${req.url}]`); //Define ar new Error Class
    logging.error(error); //log the error 
    /*Returning the URL not found request*/
    return res.status(404).json({
        error: { message: error.message }
    });
}
