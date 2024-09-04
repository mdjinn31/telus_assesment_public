import { Router } from 'express';
import { check } from 'express-validator';
import { createCustomer, getCustomers, getCustomer, getCustomerByPlan, updateCustomerPlan, updateCustomerUsage, deleteCustomer, addMockCustomers } from '../controllers/customers';
import { validateFields } from '../middleware/validateFiels';


const router = Router();

/****
 * 
 * {{url}}/api/v1/customer
 * 
 */
router.get('/mockUp', addMockCustomers);

// Get - get all Customer
router.get('/', getCustomers);
/******************************/       

// Get - get Customer by ID
// Uses middleware to validate if the Customer's ID is a valid UUID
router.get('/:id', 
   [    
       check('id', 'The ID of the customer is required').not().isEmpty(),
       check('id', "The ID of the Customer has to be a valid ID").optional().isLength({min: 36, max: 36}),
       validateFields
   ], 
   getCustomer);
/******************************/   

// Delete - delete Customer 
// Uses middleware to validate if the Customer's ID is a valid UUID
router.delete('/:id', 
      [
        check('id', 'The ID of the customer is required').not().isEmpty(),
        check('id', "The ID of the Customer has to be a valid ID").optional().isLength({min: 36, max: 36}),
        validateFields
      ],
      deleteCustomer); 
/******************************/ 

// Get - get Customer by Data Plan 
router.get('/data-plan/:plan', 
   [
       check('plan', 'The name of the Data Plan is required').not().isEmpty(),
       check('plan', 'The Data Plan must be a valid Plan').isIn(['basic','standar','premium']),
       validateFields
   ], 
   getCustomerByPlan);
/******************************/       

// Put - update Customer Data Plan
// Uses middleware to validate if the Customer's ID is a valid UUID
// Uses middleware to validate if the Data Plan to update is valid
router.put('/:id/data-plan',
    [
        check('id', 'The ID of the customer is required').not().isEmpty(),
        check('id', "The ID of the Customer has to be a valid ID").optional().isLength({min: 36, max: 36}),
        check('data_plan', 'The name of the Data Plan is required').not().isEmpty(),
        check('data_plan', 'The Data Plan must be a valid Plan').isIn(['basic','standar','premium']),
        validateFields  
    ],
    updateCustomerPlan)
/******************************/ 

// Put - update Customer Data Usage
// Uses middleware to validate if the Customer's ID is a valid UUID
// Uses middleware to validate if the Data Usage is a valid positeve number
router.put('/:id/data-usage',
    [
        check('id', 'The ID of the customer is required').not().isEmpty(),
        check('id', "The ID of the Customer has to be a valid ID").optional().isLength({min: 36, max: 36}),
        check('data_used', 'The Data usage value is required').not().isEmpty(),
        check('data_used', 'The Data usage must be a numeric value').isNumeric(),
        validateFields  
    ],
    updateCustomerUsage)
/******************************/ 

// Post - create Customer 
router.post('/',
    [
        //validateJWT,
        check('name', 'The name of the customer is required').not().isEmpty(),
        check('phone_number', 'The Phone Number of the customer is required').not().isEmpty(),
        validateFields
    ],
    createCustomer);
/******************************/            


module.exports = router;