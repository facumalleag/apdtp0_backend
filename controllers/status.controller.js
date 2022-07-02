var statusService = require('../services/status.service');
_this = this
exports.createStatus = async function (req, res, next) {
    console.log("llegue al controller",req.params)
    var stt =""
    let msg = ""
    var status = {
        description: req.params.status ? req.params.status : null,
    }
    try {
        if(status.description === null){
            throw new ExceptionNewUser ("Invalid input - Incomplete Data", 405);
        }
        var createdStatus = await statusService.createStatus(status)
        return res.status(201).json({data:createdStatus, message: "Succesfully Created status"})
    } catch (e) {
        console.log(e)
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg :"status Creation was Unsuccesfull"
        return res.status(stt).json({status: stt, message: msg})
    }
}

exports.listStatus = async function (req, res, next) {
    var stt =""
    let msg = ""
    try {
        var listedStatus = await statusService.listStatus()
        return res.status(201).json({listedStatus, message: "Succesfully Status fetched"})
    } catch (e) {
        console.log(e)
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg :"status listing was Unsuccesfull"
        return res.status(stt).json({status: stt, message: msg})
    }
}

exports.updateStatus = async function (req, res, next) {
    console.log("llegue al controller",req.params)
    var stt =""
    let msg = ""
    var status = {
        id: req.params.id ? req.params.id : null,
        description: req.params.status ? req.params.status : null,
    }
    try {
        if(status.description === null || status.id === null){
            throw new ExceptionNewUser ("Invalid input - Incomplete Data", 405);
        }
        var updatedStatus = await statusService.updateStatus(status)
        return res.status(201).json({data:updatedStatus, message: "Succesfully updated status"})
    } catch (e) {
        console.log(e)
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg :"status update was Unsuccesfull"
        return res.status(stt).json({status: stt, message: msg})
    }
}

function ExceptionNewUser(msg,stt) {
    this.msg = msg;
    this.stt = stt;
 }
