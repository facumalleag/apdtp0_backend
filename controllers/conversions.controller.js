var conversionsService = require('../services/conversions.service');
_this = this
exports.createConversions = async function (req, res, next) {
    console.log("llegue al controller",req.params)
    var stt =""
    let msg = ""
    var conversions = {
        idMeasurementFrom: req.params.idMeasurementFrom ? req.params.idMeasurementFrom : null,
        idMeasurementTo: req.params.idMeasurementTo ? req.params.idMeasurementTo : null,
        conversionFactor: req.params.conversionFactor ? req.params.conversionFactor : null,
    }
    try {
        if(conversions.description === null || conversions.idMeasurmentFrom === null || conversions.idMeasurmentTo === null){
            throw new ExceptionNewUser ("Invalid input - Incomplete Data", 405);
        }
        var createdConversions  = await conversionsService.createConversions (conversions)
        return res.status(201).json({data:createdConversions, message: "Succesfully Created Conversions "})
    } catch (e) {
        console.log(e)
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg :"Conversions Creation was Unsuccesfull"
        return res.status(stt).json({status: stt, message: msg})
    }
}

exports.listConversions  = async function (req, res, next) {
    var stt =""
    let msg = ""
    try {
        var listedConversions  = await conversionsService.listConversions()
        return res.status(201).json({listedConversions , message: "Succesfully Conversions fetched"})
    } catch (e) {
        console.log(e)
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg :"Conversions listing was Unsuccesfull"
        return res.status(stt).json({status: stt, message: msg})
    }
}

exports.updateConversions = async function (req, res, next) {
    console.log("llegue al controller",req.params)
    var stt =""
    let msg = ""
    var conversions = {
        id: req.params.id ? req.params.id : null,
        idMeasurementFrom: req.params.idMeasurementFrom ? req.params.idMeasurementFrom : null,
        idMeasurementTo: req.params.idMeasurementTo ? req.params.idMeasurementTo : null,
        conversionFactor: req.params.conversionFactor ? req.params.conversionFactor : null,
    }
    try {
        if(conversions.description === null || conversions.id === null || conversions.idMeasurmentFrom === null || conversions.idMeasurmentTo === null){
            throw new ExceptionNewUser ("Invalid input - Incomplete Data", 405);
        }
        var updatedConversions = await conversionsService.updateConversions(conversions)
        return res.status(201).json({data:updatedConversions, message: "Succesfully updated Conversions"})
    } catch (e) {
        console.log(e)
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg :"Conversions update was Unsuccesfull"
        return res.status(stt).json({status: stt, message: msg})
    }
}

function ExceptionNewUser(msg,stt) {
    this.msg = msg;
    this.stt = stt;
 }
