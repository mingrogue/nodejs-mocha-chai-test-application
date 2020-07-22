const Employee               = require('../schemas/employee');

exports.signup = async function (data) {
    try {
        let emp = await Employee.findOne( {email: data.email} );
        
        if(emp) return { data: false, message: "Employee Already exists."}; 
        
        let employee = await Employee.create(data);

        return employee 
        
    } catch (e) {
        console.log(e);
        throw Error(JSON.stringify(data) + ': Error in signing up!: ' + e);
    }
}

exports.profile = async function  (req, res) {
    try {
        let user = await Employee.findOne({ id: req.query.id });
        console.log(user);
        
        if(user){
            return { data:user }
        }
    } catch (e) {
        console.log(e);
        throw Error(JSON.stringify(req) + ':' + e);
    }
}

exports.update = async function  (req, res) {
    try {
        let update = await Employee.findOneAndUpdate({ id: req.query.id }, req.body, {new: true});
        return update;
    } catch (e) {
        console.log(e);
        throw Error(JSON.stringify(req) + ' ' + e);
    }
}

exports.delete = async function  (req, res) {
    try {
        let del = await Employee.remove({ id: req.query.id });
        console.log(del);
        if(!del) del = "error in deleting"
        return del;
    } catch (e) {
        console.log(e);
    }
}

exports.getAll = async function  (req, res) {
    try {
        let emps = await Employee.find();
        console.log(emps);
        return emps;
    } catch (e) {
        console.log(e);
    }
}
