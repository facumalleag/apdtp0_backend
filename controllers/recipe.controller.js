var recipeService = require('../services/recipe.service');
var stepsService = require('../services/steps.service');
var ingredientsInRecipe = require('../services/ingredientsInRecipes.service');

exports.createRecipe = async function (req, res, next) {
    //IMPORTANTE A CORREGIR
    //si uno de los procesos no se completa, se debe abortar las acciones anteriores
    // - averiguar como
    console.log("llegue al controller",req.body)
    var stt =""
    let msg = ""
    var recipe = {
        idUser: req.body.idUser ? req.body.idUser : null,
        idStatus: req.body.idStatus ? req.body.idStatus : null,
        idDifficulty: req.body.idDifficulty ? req.body.idDifficulty : null,
        idCategory: req.body.idCategory ? req.body.idCategory : null,
        name: req.body.name ? req.body.name : null,
        description: req.body.description ? req.body.description : null,
        serving: req.body.serving ? req.body.serving : null,
        servingPerPerson: req.body.servingPerPerson ? req.body.servingPerPerson : null,
        time: req.body.time ? req.body.time : null,
        isVegan: req.body.isVegan ? req.body.isVegan : null,
        totalSteps: req.body.steps.length ? req.body.steps.length : null,// esto se cambia po run stepsList.length
        totalRating: req.body.totalRating ? req.body.totalRating : null,

    }
    var stepsList = req.body.steps;
    var ingredientsList = req.body.ingredients;
    try {
        // Hacer la validacion luego   
        // if(user.alias === null || user.email ===null || user.password ===null || user.name ===null){
            // throw new ExceptionNewUser ("Invalid input - Incomplete Data", 405);
        // }
        var createdRecipe = await recipeService.createRecipe(recipe)
        var stepsListWithRecipeIdAded  = await stepsList.map(item => ({
            ...item,
            idRecipe: createdRecipe.id,
          }));
        
        stepsService.bulkCreateSteps(stepsListWithRecipeIdAded)

        var ingredientsListWithRecipeIdAded  = await ingredientsList.map(item => ({
            ...item,
            idRecipe: createdRecipe.id,
            }));
        ingredientsInRecipe.bulkCreateIngredientsInRecipe(ingredientsListWithRecipeIdAded)


        return res.status(201).json({data:createdRecipe, message: "Succesfully Created Recipe"})
    } catch (e) {
        console.log(e)
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg :"Recipe Creation was Unsuccesfull"

        return res.status(stt).json({status: stt, message: msg})
    }
}
exports.deleteRecipeById = async function (req, res, next){
    var stt =""
    let msg = ""
    var idRecipe = req.params.id 
    try {
        var recipeDeleted =  await recipeService.deleteRecipe(idRecipe)
        return res.status(201).json({data:recipeFetched, message: "Recipe deleted "})
    } catch (e) {
        console.log(e)
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg :"Recipe deletion was Unsuccesfull"

        return res.status(stt).json({status: stt, message: msg})
    }
}

exports.checkRecipeByName = async function(req,res,next){
    console.log("llegue al controller",req.params)
    var stt =""
    let msg = ""
    var recipeName = req.params.name 
    try {
        var recipeNameFetched =  await recipeService.checkRecipeByName(recipeName)
        if (recipeNameFetched.name === recipeName){
            return res.status(200).json({data:recipeNameFetched, message: "Recipe name already in use"})
        }
        console.log(recipeNameFetched)
        return res.status(201).json({data:recipeNameFetched, message: "Recipe name approved - Not found on the database"})
    } catch (e) {
        console.log(e)
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg :"Recipe fetching was Unsuccesfull"

        return res.status(stt).json({status: stt, message: msg})
    }
}


exports.getRecipeById = async function (req, res, next){
    var stt =""
    let msg = ""
    var idRecipe = req.params.id 
    try {
        var recipeFetched =  await recipeService.getRecipeById(idRecipe)
        return res.status(201).json({data:recipeFetched, message: "Recipe found"})
    } catch (e) {
        console.log(e)
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg :"Recipe fetching was Unsuccesfull"

        return res.status(stt).json({status: stt, message: msg})
    }
}

exports.updateRecipe = async function (req,res,next){
    /**
     * Antes de continuar mejor ponerse a leer el deocumento del TP completo
     * 
     * La actualizacion (segun el TP, seqa reemplazo o edicion) implica borrar la
     * receta y volver a crear otro registro
     */
}

exports.listRecipesForPresentation = async function(req,res,next){
    var stt =""
    let msg = ""

    try {
        var recipesFetched =  await recipeService.listRecipesForPresentation()
        return res.status(201).json({data:recipesFetched, message: "Recipes found"})
    } catch (e) {
        console.log(e)
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg :"Recipe fetching was Unsuccesfull"

        return res.status(stt).json({status: stt, message: msg})
    }
}

exports.listRecipeByUserId = async function(req,res,next){
    var stt =""
    let msg = ""
    
    try {
        var filter = parseInt(req.params.id);
        var order = parseInt(req.params.order);
        var recipesFetched =  await recipeService.listRecipeByUserId(filter, order)
        return res.status(201).json({data:recipesFetched, message: "Recipes found"})
    } catch (e) {
        console.log(e)
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg :"Recipe fetching was Unsuccesfull"

        return res.status(stt).json({status: stt, message: msg})
    }
}