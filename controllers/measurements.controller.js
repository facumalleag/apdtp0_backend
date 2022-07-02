var measurementService = require('../services/measurements.service');
_this = this
exports.createMeasurement = async function (req, res, next) {
    console.log("llegue al controller",req.params)
    var stt =""
    let msg = ""
    var measurement = {
        description: req.params.measurement ? req.params.measurement : null,
    }
    try {
        if(measurement.description === null){
            throw new ExceptionNewUser ("Invalid input - Incomplete Data", 405);
        }
        var createdMeasurement = await measurementService.createMeasurement(measurement)
        return res.status(201).json({data:createdMeasurement, message: "Succesfully Created Measurement"})
    } catch (e) {
        console.log(e)
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg :"measurement Creation was Unsuccesfull"
        return res.status(stt).json({status: stt, message: msg})
    }
}

exports.listMeasurements = async function (req, res, next) {
    var stt =""
    let msg = ""
    try {
        var listedMeasurements = await measurementService.listMeasurements()
        return res.status(201).json({listedMeasurements, message: "Succesfully measurements fetched"})
    } catch (e) {
        console.log(e)
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg :"measurement listing was Unsuccesfull"
        return res.status(stt).json({status: stt, message: msg})
    }
}

exports.updateMeasurement = async function (req, res, next) {
    console.log("llegue al controller",req.params)
    var stt =""
    let msg = ""
    var measurement = {
        id: req.params.id ? req.params.id : null,
        description: req.params.measurement ? req.params.measurement : null,
    }
    try {
        if(measurement.description === null || measurement.id === null){
            throw new ExceptionNewUser ("Invalid input - Incomplete Data", 405);
        }
        var updatedMeasurement = await measurementService.updateMeasurement(measurement)
        return res.status(201).json({data:updatedMeasurement, message: "Succesfully updated measurement"})
    } catch (e) {
        console.log(e)
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg :"measurement update was Unsuccesfull"
        return res.status(stt).json({status: stt, message: msg})
    }
}

function ExceptionNewUser(msg,stt) {
    this.msg = msg;
    this.stt = stt;
 }
