const Sequelize = require('sequelize');
var UserService = require('../services/user.service');

_this = this;
exports.login = async function (req, res, next) {
    console.log("body",req.body)
    var stt =""
    let msg = ""
    var user = {
        email: req.body.email ? req.body.email : null,
        password: req.body.password ? req.body.password : null
    }
    console.log("user",user)
    try {
        if(user.password === null || user.email ===null){
            throw new ExceptionNewUser ("Invalid input - Incomplete Data", 405);
        }
        var loginUser = await UserService.login(user);
        console.log(loginUser)
        return res.status(201).json({data:loginUser, message: "Succesfully login"})
    } catch (e) {
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg :"Invalid Email or password"

        return res.status(stt).json({status: stt, message: msg})
    }
}

exports.createUser = async function (req, res, next) {
    console.log("llegue al controller",req.body)
    var stt =""
    let msg = ""
    var user = {
        name: req.body.name ? req.body.name : null,
        alias: req.body.alias ? req.body.alias : null,
        email: req.body.email ? req.body.email : null,
        password: req.body.password ? req.body.password : null,
        isActive: 1,  
    }
    try {
        if(user.alias === null || user.email ===null || user.password ===null || user.name ===null){
            throw new ExceptionNewUser ("Invalid input - Incomplete Data", 405);
        }
        var createdUser = await UserService.createUser(user)
        return res.status(201).json({data:createdUser, message: "Succesfully Created User"})
    } catch (e) {
        console.log(e)
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg :"User Creation was Unsuccesfull"

        return res.status(stt).json({status: stt, message: msg})
    }
}

exports.fullRegister = async function (req, res, next) {
    console.log("llegue al controller",req.body)
    var stt =""
    let msg = ""
    var user = {

        name: req.body.name ? req.body.name : null,
        alias: req.body.alias ? req.body.alias : null,
        email: req.body.email ? req.body.email : null,
        password: req.body.password ? req.body.password : null,
        isActive: 1,  
    }
    try {
        if(user.alias === null || user.email ===null || user.password ===null || user.name ===null){
            throw new ExceptionNewUser ("Invalid input - Incomplete Data", 405);
        }
        var createdUser = await UserService.fullRegister(user)
        return res.status(201).json({data:createdUser, message: "Succesfully FULL Created User"})
    } catch (e) {
        console.log(e)
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg :"User Creation was Unsuccesfull"

        return res.status(stt).json({status: stt, message: msg})
    }
}

exports.halfRegister = async function (req, res, next) {
    console.log("llegue al controller",req.body)
    var stt =""
    let msg = ""
    var user = {
        alias: req.body.alias ? req.body.alias : null,
        email: req.body.email ? req.body.email : null,
 
    }
    try {
        if(user.alias === null || user.email ===null){
            throw new ExceptionNewUser ("Invalid input - Incomplete Data", 405);
        }
        var createdUser = await UserService.halfRegister(user)
        return res.status(201).json({data:createdUser, message: "Succesfully HALF Created User"})
    } catch (e) {
        console.log(e)
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg :"User Creation was Unsuccesfull"

        return res.status(stt).json({status: stt, message: msg})
    }
}

exports.verifyEmailAndAlias = async function (req, res, next) {
    // IMPORTANTE
    // Falta agregar una validacion al status para el caso en que se agregue la baja -
    // logica de un usuario
    // Agregar su status codde por igual (puede ser el 434)
    console.log("body",req.params)
    var stt =""
    let msg = ""
    var user = {
        email: req.params.email ? req.params.email : null,
        alias: req.params.alias ? req.params.alias : null
    }
    try {
        if(user.alias === null || user.email ===null){
            throw new ExceptionNewUser ("Invalid input - Incomplete Data", 405);
        }
        var isUserRegistrated = await UserService.verifyEmailAndAlias(user);
        console.log(isUserRegistrated)
        if(isUserRegistrated.email === user.email && isUserRegistrated.alias === user.alias){
            throw new ExceptionNewUser ("Email and Alias already in use", 430);
        }
        if(isUserRegistrated.alias === user.alias){
            throw new ExceptionNewUser ("Alias already in use", 433);
        }
        if(isUserRegistrated.email === user.email){
            throw new ExceptionNewUser ("Email already in use", 432);
        }
        return res.status(200).json({data:true,status: 200, message: "There s no user registered with given email or alias"})
    } catch (e) {
        console.log(e)
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg : e.message

        return res.status(stt).json({data:false,status: stt, message: msg})
    }
}

exports.updatePassword = async function (req, res, next) {
    var stt =""
    let msg = ""
    console.log(req.body)
    var user = {
        email: req.body.email ? req.body.email : null,
        password: req.body.password ? req.body.password : null,
    }
    try {
        if(user.password === null || user.email ===null){
            throw new ExceptionNewUser ("Invalid input - Incomplete Data", 405);
        }
        var result = await  UserService.updatePassword(user)
        if (!result){
            throw new ExceptionNewUser ("User Not found", 405);
        }
        return res.status(201).json({status: 201, data: true, message: "Succesfully Updated User"})
    } catch (e) {
        console.log(e)
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg : e.message
        return res.status(stt).json({status: stt, message: msg})
    }
}

function ExceptionNewUser(msg,stt) {
    this.msg = msg;
    this.stt = stt;
 }
