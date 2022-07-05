var UserService = require('../services/user.service');
var categoryService = require('../services/category.service');
var difficultyService = require('../services/difficulty.service');
var ingredientService = require('../services/ingredients.service');
var measurementService = require('../services/measurements.service');
var recipeService = require('../services/recipe.service');
var statusService = require('../services/status.service');
var stepsService = require('../services/steps.service');
var ingredientsInRecipe = require('../services/ingredientsInRecipes.service');


exports.initialize = async function (req, res, next) {
    var stt =""
    let msg = ""
    var user = {
        name: "Chon Snow",
        alias: "Chony",
        email: "cs@hotmail.com",
        password: "123456",
        isActive: 1,  
    }
    var user2 = {
        name: "p",
        alias: "p",
        email: "p",
        password: "p",
        isActive: 1,  
    }
    //=============================================================
    var category1 = {description: "pure"}
    var category2 = {description: "postre"}
    var category3 = {description: "grill"}
    //=============================================================
    var difficulty1 = {description: "facil"}
    var difficulty2 = {description: "medio"}
    var difficulty3 = {description: "dificil"}
    //=============================================================
    var ingredient1 = {description: "Papa"}
    var ingredient2 = {description: "Sal"}
    var ingredient3 = {description: "Pimienta"}
    var ingredient4 = {description: "huevo"}
    //=============================================================
    var measurement1 = {description:"gramo"}
    var measurement2 = {description:"onza"}
    var measurement3 = {description:"litro"}
    //=============================================================
    var status1 = {description: "In Progress"}
    var status2 = {description: "Approved"}
    var status3 = {description: "Rejected"}
    var status4 = {description: "Cancelled"}
    //=============================================================
    var recipe1 = {
        "idUser": 1,
        "idStatus": 1,
        "idDifficulty": 2,
        "idCategory": 1,
        "name": "Pure de papa",
        "description": "Pure de papa con sal y pimienta",
        "serving": 1,
        "servingPerPerson": 1,
        "time": 15,
        "isVegan": 0,
        "totalSteps": 5,
        "totalRating": 0,
    }
    var stepsList =[
        {
          "stepOrder": 1,
          "description":"pelar papa"
      },{
          "stepOrder": 2,
          "description":"hervir agua"
      },
      {
          "stepOrder": 3,
          "description":"poner papa en agua"
      },{   
          "stepOrder": 4,
          "description":"colar papa"
      },{   
          "stepOrder": 5,
          "description":"pisar papa"
      }]
      var ingredientsList=[
        {
            "idIngredient":1,
            "idMeasurement":1,
            "cantidad": 2,
            "description":"NN" 
        },
        {
            "idIngredient":2,
            "idMeasurement":1,
            "cantidad": 3,
            "description":"NN" 
        },
        {
            "idIngredient":3,
            "idMeasurement":1,
            "cantidad": 2,
            "description":"NN" 
        }]


        var recipe2 = {
            "idUser": 1,
            "idStatus": 1,
            "idDifficulty": 2,
            "idCategory": 1,
            "name": "tortilla de papa",
            "description": "tortilla de papa",
            "serving": 1,
            "servingPerPerson": 1,
            "time": 15,
            "isVegan": 0,
            "totalSteps": 5,
            "totalRating": 0,
        }
        var stepsList2 =[
            {
              "stepOrder": 1,
              "description":"pelar papa"
          },{
              "stepOrder": 2,
              "description":"cocinar papa a medias"
          },
          {
              "stepOrder": 3,
              "description":"mezclar las papas con huevos y condimentos"
          },{   
              "stepOrder": 4,
              "description":"cocinar en sarten"
          }]
          var ingredientsList2=[
            {
                "idIngredient":1,
                "idMeasurement":1,
                "cantidad": 2,
                "description":"NN" 
            },
            {
                "idIngredient":2,
                "idMeasurement":1,
                "cantidad": 3,
                "description":"NN" 
            },
            {
                "idIngredient":3,
                "idMeasurement":1,
                "cantidad": 2,
                "description":"NN" 
            }]
    try {
        var createdUser = await UserService.createUser(user)
        var createdUser2 = await UserService.createUser(user2)
        //=============================================================
        var createdCategory1 = await categoryService.createCategory(category1)
        var createdCategory2 = await categoryService.createCategory(category2)
        var createdCategory3 = await categoryService.createCategory(category3)
        //=============================================================    
        var createdDifficulty1 = await difficultyService.createDifficulty(difficulty1)
        var createdDifficulty2 = await difficultyService.createDifficulty(difficulty2)
        var createdDifficulty3 = await difficultyService.createDifficulty(difficulty3)
        //=============================================================      
        var createdIngredient1 = await ingredientService.createIngredient(ingredient1)
        var createdIngredient2 = await ingredientService.createIngredient(ingredient2)
        var createdIngredient3 = await ingredientService.createIngredient(ingredient3) 
        var createdIngredient5 = await ingredientService.createIngredient(ingredient4) 
        //============================================================= 
        var createdMeasurement1 = await measurementService.createMeasurement(measurement1)
        var createdMeasurement2 = await measurementService.createMeasurement(measurement2)
        var createdMeasurement3 = await measurementService.createMeasurement(measurement3)  
        //============================================================= 
        var createdStatus1 = await statusService.createStatus(status1)
        var createdStatus2 = await statusService.createStatus(status2)
        var createdStatus3 = await statusService.createStatus(status3)
        var createdStatus4 = await statusService.createStatus(status4)

        var createdRecipe = await recipeService.createRecipe(recipe1)
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

        //
        var createdRecipe = await recipeService.createRecipe(recipe2)
        var stepsListWithRecipeIdAded  = await stepsList2.map(item => ({
            ...item,
            idRecipe: createdRecipe.id,
          }));
        
        stepsService.bulkCreateSteps(stepsListWithRecipeIdAded)

        var ingredientsListWithRecipeIdAded  = await ingredientsList2.map(item => ({
            ...item,
            idRecipe: createdRecipe.id,
            }));
        ingredientsInRecipe.bulkCreateIngredientsInRecipe(ingredientsListWithRecipeIdAded)

        return res.status(201).json({data:createdUser, message: "Succesfully Created User"})
    } catch (e) {
        console.log(e)
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg :"User Creation was Unsuccesfull"
        return res.status(stt).json({status: stt, message: msg})
    }
}
