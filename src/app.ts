/*Imporing the class that creates the express server*/
import {Server} from './models/server'
/*Cretate a nuew server instans*/
const server: Server = new Server();
/*Star the new server instans*/
server.listen();

export default server;