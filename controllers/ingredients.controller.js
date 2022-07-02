var ingredientService = require('../services/ingredients.service');
_this = this
exports.createIngredient = async function (req, res, next) {
    console.log("llegue al controller",req.params)
    var stt =""
    let msg = ""
    var ingredient = {
        description: req.params.ingredient ? req.params.ingredient : null,
    }
    try {
        if(ingredient.description === null){
            throw new ExceptionNewUser ("Invalid input - Incomplete Data", 405);
        }
        var createdIngredient = await ingredientService.createIngredient(ingredient)
        return res.status(201).json({data:createdIngredient, message: "Succesfully Created ingredient"})
    } catch (e) {
        console.log(e)
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg :"ingredient Creation was Unsuccesfull"
        return res.status(stt).json({status: stt, message: msg})
    }
}

exports.listIngredients = async function (req, res, next) {
    var stt =""
    let msg = ""
    try {
        var listedIngredients = await ingredientService.listIngredients()
        return res.status(201).json({listedIngredients, message: "Succesfully ingredients fetched"})
    } catch (e) {
        console.log(e)
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg :"Ingredient listing was Unsuccesfull"
        return res.status(stt).json({status: stt, message: msg})
    }
}

exports.updateIngredient = async function (req, res, next) {
    console.log("llegue al controller",req.params)
    var stt =""
    let msg = ""
    var ingredient = {
        id: req.params.id ? req.params.id : null,
        description: req.params.ingredient ? req.params.ingredient : null,
    }
    try {
        if(ingredient.description === null || ingredient.id === null){
            throw new ExceptionNewUser ("Invalid input - Incomplete Data", 405);
        }
        var updatedIngredient = await ingredientService.updateIngredient(ingredient)
        return res.status(201).json({data:updatedIngredient, message: "Succesfully updated ingredient"})
    } catch (e) {
        console.log(e)
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg :"Ingredient update was Unsuccesfull"
        return res.status(stt).json({status: stt, message: msg})
    }
}

function ExceptionNewUser(msg,stt) {
    this.msg = msg;
    this.stt = stt;
 }
