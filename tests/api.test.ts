import supertest from 'supertest';
import { Server } from '../src/models/server';

const request = supertest((new Server()).app);

describe('Customer Routes', () => {
  let server: Server;

  beforeAll(() => {
    server = new Server();
    server.listen(); 
  });


  describe('GET /api/v1/customers', () => {
    it('should return all customers', async () => {

      const allCustomerArray = [
        {
          "id": "8e051e93-6d98-403c-b2ff-d8b03d9826c9",
          "name": "John Doe",
          "phone_number": "502-1234-56789",
          "data_plan": "premium",
          "data_used": 0,
          "billing_cycle": "28"
        },
        {
          "id": "b5d45027-7c9c-49f0-9f87-25a7dd32729d",
          "name": "Tommy Boy",
          "phone_number": "503-4321-98745",
          "data_plan": "standar",
          "data_used": 0,
          "billing_cycle": "20"
        },
        {
          "id": "9c865bc7-b2aa-4772-b828-03b6c6265640",
          "name": "Sally Girl",
          "phone_number": "504-6789-56789",
          "data_plan": "basic",
          "data_used": 0,
          "billing_cycle": "30"
        }
      ]      
      const response = await request.get('/api/v1/customers');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(allCustomerArray); 
    });
  });

  describe('GET /api/v1/customers/:id', () => {
    it('should return a customer by ID', async () => {
      const customerId = '8e051e93-6d98-403c-b2ff-d8b03d9826c9';
      const response = await request.get(`/api/v1/customers/${customerId}`);
      expect(response.status).toBe(200);
      expect(response.body[0]).toHaveProperty('id', customerId);
    });

    it('should return 400 for invalid ID', async () => {
      const customerId = '8e051e93-6d98-403c-b2ff-d1235454';
      const response = await request.get(`/api/v1/customers/${customerId}`);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
    });
  });

  describe('DELETE /api/v1/customers/:id', () => {
    it('should delete a customer by ID', async () => {
      const customerId = '8e051e93-6d98-403c-b2ff-d8b03d9826c9';
      const response = await request.delete(`/api/v1/customers/${customerId}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Customer deleted successfully');
    });

    it('should return 400 for invalid ID', async () => {
      const customerId = '8e051e93-6d98-sadfdsf-b2ff-23423dsfgds';
      const response = await request.delete(`/api/v1/customers/${customerId}`);      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
    });
  });

  describe('GET /api/v1/customers/data-plan/:plan', () => {
    it('should return customers by data plan', async () => {
      const dataPlanArray = [
        {
          "id": 'b5d45027-7c9c-49f0-9f87-25a7dd32729d',
          "name": 'Tommy Boy',
          "phone_number": '503-4321-98745',
          "data_plan": 'standar',
          "data_used": 0,
          "billing_cycle": '20'
        }
      ]
      
      const response = await request.get('/api/v1/customers/data-plan/standar');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(dataPlanArray); 
    });

    it('should return 400 for invalid data plan', async () => {
      const response = await request.get('/api/v1/customers/data-plan/non-existing-plan');
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
    });
  });

  describe('PUT /api/v1/customers/:id/data-plan', () => {
    it(`should update a customer's data plan`, async () => {
      const customerId = '9c865bc7-b2aa-4772-b828-03b6c6265640'; 
      const response = await request.put(`/api/v1/customers/${customerId}/data-plan`)
        .send({ data_plan: 'premium' });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Data plan updated successfully');
    });

    it('should return 400 for invalid data plan', async () => {
      const customerId = '8e051e93-6d98-403c-b2ff-d8b03d9826c9';
      const response = await request.put(`/api/v1/customers/${customerId}/data-plan`)
        .send({ data_plan: 'invalid-plan' });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
    });

    it('should return 400 for invalid ID', async () => {
      const customerId = '403c-b2ff-d8b03d9826c9-403c-b2ff';
      const response = await request.put(`/api/v1/customers/${customerId}/data-plan`)
        .send({ data_plan: 'premium' });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
    });
  });

  describe('PUT /api/v1/customers/:id/data-usage', () => {
    it(`should update a customer's data usage`, async () => {
      const customerId = 'b5d45027-7c9c-49f0-9f87-25a7dd32729d';
      const response = await request.put(`/api/v1/customers/${customerId}/data-usage`)
        .send({ data_used: 100 });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Data usage updated successfully');
    });

    it('should return 400 for invalid data usage', async () => {
      const customerId = '8e051e93-6d98-403c-b2ff-d8b03d9826c9';
      const response = await request.put(`/api/v1/customers/${customerId}/data-usage`)
        .send({ data_used: -50 }); 
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
    });

    it('should return 400 for invalid ID', async () => {
      const customerId = '403c-b2ff-d8b03d9826c9-403c-b2ff';
      const response = await request.put(`/api/v1/customers/${customerId}/data-usage`)
        .send({ data_used: 100 });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
    });
  });

  describe('POST /api/v1/customers', () => {
    it('should create a new customer', async () => {
      const response = await request.post('/api/v1/customers')
        .send({
          name: "Robert Plant",
          phone_number: "507-9854-06669",
          data_plan: "standar",
          billing_cycle: "18"
        });
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message', 'Customer created successfully');
    });

    it('should return 400 for missing required fields', async () => {
      const response = await request.post('/api/v1/customers')
        .send({
          phone_number: "507-9854-06669",
          data_plan: "standar",
          billing_cycle: "18"
        });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
    });
  });
});
