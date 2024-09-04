/*
    Method Loging: we import the functions required to handle middleware
*/
import { Request, Response, NextFunction } from 'express';

export const loggingHandler = async(req: Request, res: Response, next: NextFunction) => {
    //loggin the impocme methode and ip of request
    logging.info(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
    //log the end of the income method request
    res.on('finish', () => {
        logging.warn(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
    });

    next();
}
