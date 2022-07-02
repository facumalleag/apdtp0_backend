var stepsService = require('../services/steps.service');
_this = this
exports.createSteps = async function (req, res, next) {

    console.log("llegue al controller",req.body)
    var stt =""
    let msg = ""
    var steps = {
        idRecipe: req.body.idRecipe ? req.body.idRecipe : null,
        stepOrder: req.body.stepOrder ? req.body.stepOrder : null,
        description: req.body.description ? req.body.description : null,
    }
    try {
        if(steps.description === null || steps.idRecipe === null || steps.stepOrder === null){
            throw new ExceptionNewUser ("Invalid input - Incomplete Data", 405);
        }
        var createdSteps = await stepsService.createSteps(steps)
        return res.status(201).json({data:createdSteps, message: "Succesfully Created step"})
    } catch (e) {
        console.log(e)
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg :"steps Creation was Unsuccesfull"
        return res.status(stt).json({status: stt, message: msg})
    }
}

exports.listStepsByRecipeId = async function (req, res, next) {
    //IMPORTANTE
    // - agregar el id de la receta para filtrar por id de receta
    // - ordenar por paso
    var stt =""
    let msg = ""
    var steps = {
        idRecipe: req.params.idRecipe ? req.params.idRecipe : null,
    }
    
    try {
        if(steps.idRecipe === null){
            throw new ExceptionNewUser ("Invalid input - Incomplete Data", 405);
        }
        var listedSteps = await stepsService.listStepsByRecipeId(steps)
        return res.status(201).json({listedSteps, message: "Succesfully steps fetched"})
    } catch (e) {
        console.log(e)
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg :"steps listing was Unsuccesfull"
        return res.status(stt).json({status: stt, message: msg})
    }
}

exports.updateSteps = async function (req, res, next) {
    console.log("llegue al controller",req.body)
    var stt =""
    let msg = ""
    var steps = {
        id: req.body.id ? req.body.id : null,
        idRecipe: req.body.idRecipe ? req.body.idRecipe : null,
        stepOrder: req.body.stepOrder ? req.body.stepOrder : null,
        description: req.body.description ? req.body.description : null,
    }
    try {
        if(steps.description === null || steps.id === null || steps.idRecipe === null || steps.stepOrder === null){
            throw new ExceptionNewUser ("Invalid input - Incomplete Data", 405);
        }
        var updatedSteps = await stepsService.updateSteps(steps)
        return res.status(201).json({data:updatedSteps, message: "Succesfully updated steps"})
    } catch (e) {
        console.log(e)
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg :"steps update was Unsuccesfull"
        return res.status(stt).json({status: stt, message: msg})
    }
}

exports.bulkCreateSteps = async function (req, res, next) {
    //la validacion debe ser en front?
    //preguntar si conviene enviarlo como string en el body y parsearlo aca
    //o si es indistinto que lo envie como json o string
    console.log("llegue al controler",req.body.stepsList)
    try {
        var steps = req.body.stepsList
        var createdSteps = await stepsService.bulkCreateSteps(steps)
        return res.status(201).json({data:createdSteps, message: "Succesfully Created step"})
    } catch (e) {
        console.log(e)
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg :"steps Creation was Unsuccesfull"
        return res.status(stt).json({status: stt, message: msg})
    }
}

exports.bulkUpdateSteps = async function (req, res, next) {
    console.log("llegue al controler",req.body.stepsList)
    try {

        var steps = req.body.stepsList
        var updatedtedSteps = await stepsService.bulkUpdateSteps(steps)
        return res.status(201).json({data:updatedtedSteps, message: "Succesfully Updated step"})
    } catch (e) {
        console.log(e)
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg :"steps update was Unsuccesfull"
        return res.status(stt).json({status: stt, message: msg})
    }
}

function ExceptionNewUser(msg,stt) {
    this.msg = msg;
    this.stt = stt;
 }
