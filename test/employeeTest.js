const {except} = require('chai')

const EmployeeController = require('../controllers/controllers');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
var expect = chai.expect;

chai.use(chaiHttp);

describe('add employee, try to add same employee again, add another employee, update details of second employee, see profile of second employee \n delete second employee, see all emplyees in db, i.e. 1', () => {
    let id;
    it('it should add an employee with name Arnab Das and email arnab.das@navsoft.in into db', (done) => {
        let employee = {
            name: "Arnab Das",
            email: "arnab.das@navsoft.in",
            employeeCode: 100
        }
        chai.request(server)
            .post('/employee/signup')
            .send(employee)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                expect(res.body).to.have.any.keys('name', 'employeeCode', 'email');
                expect(res.body).to.have.property('email', "arnab.das@navsoft.in");
            done();
        });
    });
    it('it should not add the same employee with the same email into db as he is already existing.', (done) => {
        let employee = {
            name: "Arnab Das",
            email: "arnab.das@navsoft.in",
            employeeCode: 100
        }
        chai.request(server)
            .post('/employee/signup')
            .send(employee)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                expect(res.body).to.have.any.keys('data', 'message');
            done();
        });
    });
    it('it should add another employee named arnab2 having employee code 2 into db', (done) => {
        let employee = {
            name: "Arnab Das",
            email: "arnab.das1@navsoft.in",
            employeeCode: 101
        }
        chai.request(server)
            .post('/employee/signup')
            .send(employee)
            .end((err, res) => {
                res.should.have.status(200);
                id = res.body.id;
                res.body.should.be.a('object');
                expect(res.body).to.have.any.keys('name', 'employeeCode', 'email');
                expect(res.body).to.have.property('employeeCode', 101);
            done();
        });
    });
    it('it should update the details, employeeCode from 101 to 102', (done) => {
        let employee = {
            name: "Arnab Das",
            email: "arnab.das1@navsoft.in",
            employeeCode: 102
        }
        chai.request(server)
            .post('/employee/update')
            .query({ id: id })
            .send(employee)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                expect(res.body).to.have.any.keys('name', 'employeeCode', 'email');
                expect(res.body).to.have.property('email', "arnab.das1@navsoft.in");
                expect(res.body).to.have.property('employeeCode', 102);
            done();
        });
    });
    it('it should get the details of the employee with the appropriate id provided', (done) => {
        chai.request(server)
            .get('/employee/profile')
            .query({ id: id })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                expect(res.body).to.have.any.keys('name', 'employeeCode', 'email');
                expect(res.body).to.have.property('email', "arnab.das1@navsoft.in");
                expect(res.body).to.have.property('employeeCode', 102);
            done();
        });
    });
    it('it should delete the details of the employee from db having the given id.', (done) => {
        chai.request(server)
            .get('/employee/delete')
            .query({ id: id })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('boolean');
                expect(res.body).to.be.equal(true)
            done();
        });
    });
    it('it should get all the employees from db', (done) => {
        chai.request(server)
            .get('/employee/getall')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                expect(res.body).to.have.length(1);
            done();
        });
    });
});

