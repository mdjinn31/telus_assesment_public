
import { CustomerI } from '../interfaces/customers'
import '../helpers/logging'

export class Customer implements CustomerI {
    id: string;
    name: string;
    phone_number: string;
    data_plan: string;
    data_used: number;
    billing_cycle: string;
  
    constructor(
            id: string,
            name: string,
            phone_number: string,
            data_plan: string,
            data_used: number,
            billing_cycle: string
    ) {
            this.id = id;
            this.name = name;
            this.phone_number = phone_number;
            this.data_plan = data_plan;
            this.data_used = data_used;
            this.billing_cycle = billing_cycle;
            logging.log('----------------------------------------');
            logging.log('Customer Class constructor');
            logging.log(this.toJSON());            
            logging.log('----------------------------------------');            
    }
  
  // Method to display Customer details for loging
  displayCustomerDetails(): void{
        logging.info(`ID: ${this.id}`);
        logging.info(`Name: ${this.name}`);
        logging.info(`Phone Number: ${this.phone_number}`);
        logging.info(`Data Plan: ${this.data_plan}`);
        logging.info(`Data Used: ${this.data_used} MB`);
        logging.info(`Billing Cycle: ${this.billing_cycle}`);
  }

  // Method to update data_used if value send is positive
  updateDataUsed(usedData: number): void{
        if (usedData < 0) {
            logging.error("Data used can't be negative.");
            return;
        }
        this.data_used += usedData;
        logging.info(`Data used updated with ${usedData} MB, to ${this.data_used} MB.`);
  }

  //Method to update data_plan of Customer
  updateDataPlan(dataPlan: string): void{
        if (dataPlan == ''){
            logging.error("Data plan can't be a empty string.");
            return;
        }
        logging.info(`Data plan was updated from ${this.data_plan} MB, to ${dataPlan} MB.`);
        this.data_plan = dataPlan;
  }

  // Method to return the Customers Object values as a JSON object
  toJSON(): object {
        return {
        id: this.id,
        name: this.name,
        phone_number: this.phone_number,
        data_plan: this.data_plan,
        data_used: this.data_used,
        billing_cycle: this.billing_cycle
        };
  }

}