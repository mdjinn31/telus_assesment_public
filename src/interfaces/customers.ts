/*
    Definition of interface that is use to shape the customers object
*/
export interface CustomerI {
    id: String;
    name: String;
    phone_number: String;
    data_plan: String;
    data_used: Number;
    billing_cycle: String;

    displayCustomerDetails(): void;
    updateDataUsed(usedData: number): void;
    updateDataPlan(dataPlan: string): void;
    toJSON(): object;
}

/*
    Definition of interface that is use to model the customers object
*/
export interface CustomersI {
    _list: object;

    deleteCustomer(): void;
    getCustomers(): object[];
    getCustomer(id: string): object;
    updateCustomer(id: string, customer: CustomerI): void;
    createCustomer(customer: CustomerI): number;
}