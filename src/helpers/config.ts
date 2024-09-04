/*Import dotenv that a libare tha helps with the enviroment variables*/
import dotenv from 'dotenv';
/*initialize enviroment viablems */
dotenv.config();
/*Define and export the eniroments (Test and Development)*/
export const DEVELOPMENT = process.env.NODE_ENV === 'development';
export const TEST = process.env.NODE_ENV === 'test';
/*Define and export the server virables*/
export const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
export const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 8080;
/*Exporting the server object*/
export const serverObject = {
    SERVER_HOSTNAME,
    SERVER_PORT
};
