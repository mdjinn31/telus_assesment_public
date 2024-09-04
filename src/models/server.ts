import express, { Express, Request, Response , Application } from 'express';
import cors from 'cors';

//import swagger utilities 
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

//import loggin helper functions
import '../helpers/logging';
//import configuration variables
import { serverObject } from '../helpers/config';
import { corsHandler } from '../middleware/corsHandler'
import { loggingHandler } from '../middleware/loggingHandler'
import { routeNotFound } from '../middleware/routeNotFound'

import  mockDB  from '../db/customers'

/*
Server class
*/
export class Server{

    // defition of the class properties 
    app: Application;
    port: Number;
    server: String;
    swaggerDocument = YAML.load(path.join(__dirname, '../../docs','swagger.yaml'));

    /*
        Constructor for the Server class
    */
    constructor(){
        logging.log('----------------------------------------');
        logging.log('Initializing API constructor');
        logging.log('----------------------------------------');
        this.app = express(); // create a express app and asigt it to a variable isntace
        this.port = serverObject.SERVER_PORT; //seting the por where the server will be listening
        this.server = serverObject.SERVER_HOSTNAME; // seting the host name of the server 
        this.db();
        this.middlewares(); // calling the middlewaer initiation method
        this.routes(); //calling the routes definition method
    }

    db(){
        this.app.locals.db = [...mockDB];
    }
    /*
        Method to define the middleware user by express
    */    
    middlewares(){
        logging.log('----------------------------------------');
        logging.log('Initializing API Middlewares');
        logging.log('----------------------------------------');
        this.app.use(cors()); // define the use of cors
        this.app.use(express.json()); //define the out of json response
        this.app.use(express.static('public')); // defining where the statinc content will be placed
        this.app.use(loggingHandler); // calling the middle ware funtion to hande the loggin of the requests
        this.app.use(corsHandler); // calling the middleware function that sets the headers for CORS and defines de allow methods
    }

    /*
        Class method where the endpoint routes are defined
    */    
    routes(){
        logging.log('----------------------------------------');
        logging.log('Initializing API Routes');
        logging.log('----------------------------------------');        
        // defing the url for the swagger documentation endpoint
        this.app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(this.swaggerDocument)); 
        this.app.use('/api/v1/customers',require('../routes/customers'));
        //calling the middleware that handels the 404 error (url not found)
        this.app.use(routeNotFound);
    }

    /*
        Class method that fires up the server 
    */    
    listen(){
        logging.log('----------------------------------------');
        logging.log('Initializing API server');
        logging.log('----------------------------------------');     
        this.app.listen(
            this.port,
            () => {
                logging.log('----------------------------------------');
                logging.log(`Server is Fire at http://${this.server}:${this.port}`);
                logging.log('----------------------------------------');                
            }
        )      
    }

};
