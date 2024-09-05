import { CustomerI } from "../interfaces/customers";
import { Customer } from "../models/customer";

/** Create mock data simuliating a data base*/
const mockDB: CustomerI[] = [
                            new Customer( '8e051e93-6d98-403c-b2ff-d8b03d9826c9', 'John Doe',   '502-1234-56789', 'premium',  0, '28' ),
                            new Customer( 'b5d45027-7c9c-49f0-9f87-25a7dd32729d', 'Tommy Boy',  '503-4321-98745', 'standar',  0, '20' ),
                            new Customer( '9c865bc7-b2aa-4772-b828-03b6c6265640', 'Sally Girl', '504-6789-56789', 'basic',  0, '30' ),
                          ];


export default mockDB;
