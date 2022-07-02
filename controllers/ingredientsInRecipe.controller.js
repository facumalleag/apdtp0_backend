var ingredientsInRecipeService = require('../services/ingredientsInRecipes.service');
_this = this
exports.createIngredientsInRecipe = async function (req, res, next) {
    console.log("llegue al controller",req.body)
    var stt =""
    let msg = ""
    var ingredientsInRecipe = {
        idRecipe : req.body.idRecipe ? req.body.idRecipe : null,
        idIngredient : req.body.idIngredient ? req.body.idIngredient : null,
        idMeasurement : req.body.idMeasurement ? req.body.idMeasurement : null,
        cantidad : req.body.cantidad ? req.body.cantidad : null,
        description: req.body.description ? req.body.description : null,
    }
    try {
        if(ingredientsInRecipe.description === null || ingredientsInRecipe.idRecipe === null || ingredientsInRecipe.idIngredient === null || ingredientsInRecipe.idMeasurement === null || ingredientsInRecipe.cantidad === null){
            throw new ExceptionNewUser ("Invalid input - Incomplete Data", 405);
        }
        var createdIngredientsInRecipe = await ingredientsInRecipeService.createIngredientsInRecipe(ingredientsInRecipe)
        return res.status(201).json({data:createdIngredientsInRecipe, message: "Succesfully Created IngredientsInRecipe"})
    } catch (e) {
        console.log(e)
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg :"ingredientsInRecipe Creation was Unsuccesfull"
        return res.status(stt).json({status: stt, message: msg})
    }
}

exports.listIngredientsInRecipe = async function (req, res, next) {
    var stt =""
    let msg = ""
    var recipeId = req.params.idRecipe
    try {
        var listedIngredientsInRecipe = await ingredientsInRecipeService.listIngredientsInRecipe(recipeId)
        return res.status(201).json({listedIngredientsInRecipe, message: "Succesfully ingredientsInRecipe fetched"})
    } catch (e) {
        console.log(e)
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg :"ingredientsInRecipe listing was Unsuccesfull"
        return res.status(stt).json({status: stt, message: msg})
    }
}

exports.updateIngredientsInRecipe = async function (req, res, next) {
    console.log("llegue al controller",req.body)
    var stt =""
    let msg = ""
    var ingredientsInRecipe = {
        id: req.body.id ? req.body.id : null,
        idRecipe : req.body.idRecipe ? req.body.idRecipe : null,
        idIngredient : req.body.idIngredient ? req.body.idIngredient : null,
        idMeasurement : req.body.idMeasurement ? req.body.idMeasurement : null,
        cantidad : req.body.cantidad ? req.body.cantidad : null,
        description: req.body.description ? req.body.description : null,
    }
    try {
        if(ingredientsInRecipe.id === null || ingredientsInRecipe.description === null || ingredientsInRecipe.idRecipe === null || ingredientsInRecipe.idIngredient === null || ingredientsInRecipe.idMeasurement === null || ingredientsInRecipe.cantidad === null){
            throw new ExceptionNewUser ("Invalid input - Incomplete Data", 405);
        }
        var updatedIngredientsInRecipe = await ingredientsInRecipeService.updateIngredientsInRecipe(ingredientsInRecipe)
        return res.status(201).json({data:updatedIngredientsInRecipe, message: "Succesfully updated ingredientsInRecipe"})
    } catch (e) {
        console.log(e)
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg :"ingredientsInRecipe update was Unsuccesfull"
        return res.status(stt).json({status: stt, message: msg})
    }
}

exports.bulkCreateIngredientsInRecipe = async function (req, res, next) {
    //la validacion debe ser en front?
    //preguntar si conviene enviarlo como string en el body y parsearlo aca
    //o si es indistinto que lo envie como json o string
    console.log("llegue al controler",req.body.ingredientsInRecipeList)
    try {
        var ingredientsInRecipe = req.body.ingredientsInRecipeList
        var createdIngredientsInRecipe = await ingredientsInRecipeService.bulkCreateIngredientsInRecipe(ingredientsInRecipe)
        return res.status(201).json({data:createdIngredientsInRecipe, message: "Succesfully Created IngredientsInRecipe"})
    } catch (e) {
        console.log(e)
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg :"IngredientsInRecipe Creation was Unsuccesfull"
        return res.status(stt).json({status: stt, message: msg})
    }
}

exports.bulkUpdateIngredientsInRecipe = async function (req, res, next) {
    //SEGUIR ACA

    console.log("llegue al controler",req.body.ingredientsInRecipeList)
    try {
        var ingredientsInRecipe = req.body.ingredientsInRecipeList
        var createdIngredientsInRecipe = await ingredientsInRecipeService.bulkUpdateIngredientsInRecipe(ingredientsInRecipe)
        return res.status(201).json({data:createdIngredientsInRecipe, message: "Succesfully Created IngredientsInRecipe"})
    } catch (e) {
        console.log(e)
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg :"IngredientsInRecipe Creation was Unsuccesfull"
        return res.status(stt).json({status: stt, message: msg})
    }
}

function ExceptionNewUser(msg,stt) {
    this.msg = msg;
    this.stt = stt;
 }
