const EmployeeService = require('../services/services')

exports.signup = async function (req, res, next) {
    try {
        let signupData = await EmployeeService.signup(req.body); 
        if(signupData){
            return res.status(200).json(signupData);
        }
        else{
            return res.status(400).json({ message: signupData });
        }
    } catch (e) {
        return res.status(500).json({ message: e });
    }
}

exports.profile = async function (req, res, next) {
    try {
        let profileData = await EmployeeService.profile(req, res);
        if(profileData.data){
            return res.status(200).json( profileData.data );
        } 
        else if(!profileData.data){
            return res.status(500).json();
        } 
    } catch (e) {
        return res.status(500).json();
    }
}

exports.update = async function (req, res, next) {
    try {
        let emailFound = await EmployeeService.update(req, res);
        if(emailFound) return res.status(200).json(emailFound);
        else return res.status(400).json({ message: emailFound });
    } catch (e) {
        return res.status(500).json();
    }
}

exports.delete = async function (req, res, next) {
    try {
        let deleted = await EmployeeService.delete(req, res);
        if(deleted) return res.status(200).json(true);
        else if( result.data === false ) return res.status(400).json({ deleted });
    } catch (e) {
        return res.status(500).json();
    }
}

exports.getAll = async function (req, res, next) {
    try {
        let emps = await EmployeeService.getAll(req, res);
        if(emps) return res.status(200).json(emps);
        else return res.status(400).json( 'internal error ');
    } catch (e) {
        return res.status(500).json();
    }
}
