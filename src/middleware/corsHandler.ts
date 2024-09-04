//importing the viables need to work with middleware in express
import { Request, Response, NextFunction } from 'express';

/*
    Middleware function to manages the CORS headers 
    handles the security feature that restricts HTTP requests 
*/
export const corsHandler = async(req: Request, res: Response, next: NextFunction) => {
    /*Setting the CORS headers*/
    res.header('Access-Control-Allow-Origin', req.header('origin'));
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    logging.info('----------------------------------------');
    logging.info('Setting the CORS Headers');
    logging.info('----------------------------------------');

    /*Defining the methons that are allow in the API*/
    if (req.method === 'OPTIONS') {
        logging.info('----------------------------------------');
        logging.info('Setting the Allowd methos for the API');
        logging.info('----------------------------------------');
        res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET');
        return res.status(200).json({}); // return the status if succecsfulr 
    }
    next();//continue to the next middle ware funcition
}
