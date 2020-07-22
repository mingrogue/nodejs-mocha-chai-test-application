const mongoose = require('mongoose');
const uuid     = require('uuid');


const EmployeeSchema  = new mongoose.Schema({
    id: { type: String, default: function genUUID() 
        {
            return uuid.v4();
        }
    },
    name: String,
    email: String,
    employeeCode: Number,
    joinedOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }
})

const Employee = mongoose.model('employee', EmployeeSchema)

module.exports = Employee;