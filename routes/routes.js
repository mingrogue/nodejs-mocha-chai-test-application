const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/controllers');
const EmployeeService = require('../services/services')


router.post('/signup', EmployeeController.signup);

router.get('/profile', EmployeeController.profile);

router.post('/update', EmployeeController.update);

router.get('/delete', EmployeeController.delete);

router.get('/getall', EmployeeController.getAll);

module.exports = router;