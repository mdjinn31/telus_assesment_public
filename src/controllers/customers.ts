import { Request, Response} from 'express';
import { v4 as uuidv4 } from 'uuid';

import '../helpers/logging';
import { Customer } from '../models/customer';
import { CustomerI } from '../interfaces/customers'
import  mockDB  from '../db/customers'


//GET controller to list all Customers
export const getCustomers = async(req : Request, res : Response) => {
    try {
       res.json(mockDB);
    } catch (error: any) {
        logging.error(`Error ${ error}`);
        res.status(400).json({errors: `Error ${error}`});        
    }
}

//GET controller to list a Customer by ID
export const getCustomer = async(req : Request, res : Response) => {
    try {
        const { id } = req.params;
        const result = mockDB.filter((customer: CustomerI) => customer.id === id);
        if(result.length == 0) return res.status(400).json({message: 'Customer does not exists.'});
        res.json(result);
    } catch (error: any) {
        logging.error(`Error ${ error}`);
        res.status(400).json({errors: `Error ${error}`});          
    }
}

//GET controller to list a Customer by ID
export const getCustomerByPlan = async(req : Request, res : Response) => {
    const { plan } = req.params;
    try {
        const result: CustomerI[] = mockDB.filter((customer: CustomerI) => customer.data_plan.toLocaleLowerCase() === plan.toLocaleLowerCase());
        if(result.length == 0) return res.status(400).json({message: 'There are no Customer with that Data Plan.'});
        logging.info('----------------------------------------');
        logging.info(`Retriving customers with Data Plan: ${plan}`)
        logging.warning(result)
        logging.info('----------------------------------------');            
        res.json(result);
    } catch (error: any) {
        logging.error(`Error ${ error}`);
        res.status(400).json({errors: `Error ${error}`});          
    }
}

//DELET controller to delete a product by ID
export const deleteCustomer = async(req : Request, res : Response) => {
    try {
        const { id } = req.params;
        const customerIndex: number = mockDB.findIndex((customer: CustomerI) => customer.id === id);
        const result = mockDB.filter((customer: CustomerI) => customer.id !== id);
        if(result.length == 0) return res.status(400).json({message: 'Customer does not exists.'});
        logging.info('----------------------------------------');
        logging.warning(`Deleting customer with ID: ${customerIndex}`)
        logging.warning(mockDB[customerIndex].toJSON())
        logging.info('----------------------------------------');              
        mockDB.splice(customerIndex,1);
        res.json({message: 'Customer deleted successfully'});
    } catch (error: any) {
        logging.error(`Error ${ error}`);
        res.status(400).json({errors: `Error ${error}`});          
    }
}

//PUT controller to update Customers Data Plan
export const updateCustomerPlan = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { data_plan } = req.body;
        const customerIndex: number = mockDB.findIndex((customer: CustomerI) => customer.id === id);
        if(customerIndex === -1) return res.status(400).json({error:{message: 'Customer does not exists.'}});        
        logging.info('----------------------------------------');
        logging.info(`Updateing Customer ${id} from ${mockDB[customerIndex].data_plan} to ${data_plan}`);
        mockDB[customerIndex].updateDataPlan(data_plan);
        logging.info(mockDB[customerIndex]);
        logging.info('----------------------------------------');
       res.json({message: "Data plan updated successfully"});
    } catch (error: any) {
        logging.error(`Error ${ error}`);
        res.status(400).json({errors: `Error ${error}`});        
    }    
}

//PUT controller to update Customers Data usage
export const updateCustomerUsage = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { data_used } = req.body;
        if(data_used <= 0) return res.status(400).json({errors:{message: 'Customer data uses must be grater than 0'}});        
        const customerIndex: number = mockDB.findIndex((customer: CustomerI) => customer.id === id);
        if(customerIndex === -1) return res.status(400).json({errors:{message: 'Customer does not exists.'}});        
        mockDB[customerIndex].updateDataUsed(data_used);
        logging.info('----------------------------------------');
        logging.info(`Updateing ${data_used} MB data usage to Customer ${id}`);
        logging.info(mockDB[customerIndex]);
        logging.info('----------------------------------------');
        res.json({message: "Data usage updated successfully"});
    } catch (error: any) {
        logging.error(`Error ${ error}`);
        res.status(400).json({errors: `Error ${error}`});        
    }    
}

//POST controller to create a new customer 
export const createCustomer = async(req: Request, res: Response) => {
    try{
        const {name, phone_number, data_plan, billing_cycle} = req.body;
        const newCustomer: CustomerI = new Customer( uuidv4(), name, phone_number, data_plan.toLocaleLowerCase(), 0, billing_cycle);
        mockDB.push(newCustomer);
        logging.info('----------------------------------------');
        logging.info(`New Customer created ${newCustomer.id}`);
        logging.info(newCustomer);
        logging.info('----------------------------------------');        
        res.status(201).json({message: "Customer created successfully"});
    } catch (error:any) {
        logging.error(`Error ${ error}`);
        res.status(400).json({errors: `Error ${error}`});        
    }    
}

/****************************************** */
/****************************************** */
/****************************************** */
//GET controller to list all Customers
export const addMockCustomers = async(req : Request, res : Response) => {
    try {
        const tmp: CustomerI = new Customer( uuidv4(), 'Billy Joel', '504-6789-12345', 'Standar',  0, '10' );
        mockDB.push(tmp);        
        res.json(mockDB);
    } catch (error: any) {
        logging.error(`Error ${ error}`);
        res.status(400).json({errors: `Error ${error}`});        
    }
}