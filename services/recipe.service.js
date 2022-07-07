const Recipes = require('../models').recipes;
const Ingredients = require('../models').ingredients;
const Measurements = require('../models').measurements;
const User = require('../models').users;
const Difficulty = require('../models').difficulties;
const Category = require('../models').categories;
const Status = require('../models').statuses;
const IngredientInRecipe = require('../models').ingredientsInRecipes;
const Steps = require('../models').steps;
const sequelize = require('../models').sequelize;
const { QueryTypes } = require('sequelize');//nose que tan necesario es para las consultas
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
_this = this

exports.createRecipe= async function (recipe) {
    var newRecipe = new Recipes({
        idUser:recipe.idUser,
        idStatus: recipe.idStatus,
        idDifficulty: recipe.idDifficulty,
        idCategory: recipe.idCategory,
        name: recipe.name,
        description: recipe.description,
        serving: recipe.serving,
        servingPerPerson: recipe.servingPerPerson,
        time: recipe.time,
        isVegan: recipe.vegan,
        totalSteps: recipe.totalSteps,
        totalRating: recipe.totalRating,
        

    })
    try {
        var savedRecipe = await newRecipe.save();
        return savedRecipe
    } catch (e) {
        console.log(e)    
        throw Error("Error while Creating Recipe")
    }
}
exports.deleteRecipe= async function (recipeId) {

    try {
        var deletedRecipe = await Recipes.destroy({
            where:{
                id: recipeId
            }
        });
        return true
    } catch (e) {
        console.log(e)    
        throw Error("Error while deleting Recipe")
    }
}

exports.checkRecipeByName= async function (recipeName) {
    try {
        var recipeFiltered = await Recipes.findOne({
			where: {
				name: recipeName
			},
            force: true
		});
        return recipeFiltered
    } catch (e) {
        console.log(e)    
        throw Error("Error while Creating Recipe")
    }
}

exports.getRecipeById = async function (recipeId){
    try {
        // const recipeFetched = await sequelize.query(
        //     "SELECT r.id as id, r.name as name,r.description as description,r.serving as serving,r.servingPerPerson as servingPerPerson,r.time as time,r.isVegan as isVegan,r.totalSteps as totalSteps,r.totalRating as totalRating,u.id as userId ,u.alias as userAlias,stts.id as statusId,stts.description as status,d.id as difficultyId, d.description as difficulty, c.id as categoryId, c.description as category,stps.id as stepId, stps.stepOrder as stepOrder, stps.description as stepDescription FROM recipes as r LEFT JOIN users as u ON r.idUser=u.id LEFT JOIN statuses as stts ON r.idStatus = stts.id LEFT JOIN difficulties as d ON r.idDifficulty = d.id LEFT JOIN categories as c ON r.idCategory = c.id LEFT JOIN steps as stps ON r.id = stps.idRecipe WHERE r.id = :id GROUP BY r.id,r.name,r.description,r.serving,r.servingPerPerson,r.time,r.isVegan,r.totalSteps,r.totalRating,u.id,u.alias,stts.id,stts.description,d.id, d.description,c.id, c.description,stps.id, stps.stepOrder, stps.description",
        //     {
        //       replacements:{ id:recipeId},
        //       type: QueryTypes.SELECT
        //     }
        //   );

        const recipeFetched = await Recipes.findOne({
            where:{
                id: recipeId
            },
            include: [{
                model: User,
                as: 'user',
                attributes: [
                    'id',
                    'name'
                ]
            },  {
                model: Status,
                as: 'status',
                attributes: [
                    'id',
                    'description'
                ]
            },  {
                model: Difficulty,
                as: 'difficulty',
                attributes: [
                    'id',
                    'description'
                ]
            },
            {
                model: Category,
                as: 'category',
                attributes: [
                    'id',
                    'description'
                ]
            }
        ],
            attributes: [
                'id',
                'name',
                'description',
                'serving',
                'servingPerPerson',
                'time',
                'isVegan',
                'totalSteps',
                'totalRating',
                
            ]
        })
        const steps = await Steps.findAll({
            where:{
                idRecipe: recipeId
            },
            attributes: [
                'id',
                'stepOrder',
                'description',
                
            ],
            order: [['stepOrder'],],

            
        })

        const ingredients = await IngredientInRecipe.findAll({
            where:{
                idRecipe: recipeId
            },
            include: [{
                model: Ingredients,
                as: 'ingredients',
                attributes: [
                    'id',
                    'description'
                ]
            },  {
                model: Measurements,
                as: 'measurement',
                attributes: [
                    'id',
                    'description'
                ]
            }],
            attributes: [
                'id',
                'cantidad',
                'description',
                
            ],
        })

        return {recipeFetched:recipeFetched,stepsList:steps,ingredientsList:ingredients};
    } catch (e) {
        console.log(e)    
        throw Error("Error while fetching recipe")
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


/**
 * IMPORTANTE
 * 
 * TODAS las funciones de aqui para abajo, les falta el return. NO ESTAN DEVOLVIENDO NADA
 * 
 * Tambien les falta el await
 * 
 */

exports.listRecipesForPresentation = async function(){
    try{
        const recipesFetched = await Recipes.findAll({
            // where:{
            //     idStatus: 1
            // },
            include: [{
                model: User,
                as: 'user',
                attributes: [
                    'id',
                    'alias'
                ]
            },   {
                model: Difficulty,
                as: 'difficulty',
                attributes: [
                    'id',
                    'description'
                ]
            },
            {
                model: Category,
                as: 'category',
                attributes: [
                    'id',
                    'description'
                ]
            }
        ],
            attributes: [
                'id',
                'name',
                'description',
                'serving',
                'servingPerPerson',
                'time',
                'isVegan',
                'totalSteps',
                'totalRating',
                
            ]
        })
    console.log(recipesFetched)
    return {recipeFetched:recipesFetched};
    }catch{
        console.log(e)    
        throw Error("Error while fetching recipe")
    }
}

exports.searchRecipeByName = async function(filterWord,orderAsc){
    var order= orderAsc===0? 'ASC':'DESC';
    try{
        const recipesFectched = Recipes.findAll({
            // where: { VERSION CON EL STATUS APPROBED
            //      [Op.and]:
            //      [{name: {[Op.like]: filterWord}},
            //      {status: 1}]
            //   },
            where: {
                name: {
                  [Op.like]: filterWord
                }
              },
              order: [['createdAt',order]],
        })
    }catch(e){
        console.log(e)    
        throw Error("Error while fetching recipe")
    }
}

exports.searchRecipeByCategory = async function(filterCategory,orderAsc){
    var order= orderAsc===0? 'ASC':'DESC';
    try{
        const recipesFectched = Recipes.findAll({
            // where: { VERSION CON EL STATUS APPROBED
            //      [Op.and]:
            //      [{name: {[Op.like]: filterWord}},
            //      {status: 1}]
            //   },
            where: {idCategory: filterCategory},
              order: [['createdAt',order]],
        })
    }catch(e){
        console.log(e)    
        throw Error("Error while fetching recipe")
    }
}

exports.searchRecipeByIngredient = async function(filterIngredient,orderAsc){
    var order= orderAsc===0? 'ASC':'DESC';
    try{
        const recipesFectched = IngredientInRecipe.findAll({
            // where: { VERSION CON EL STATUS APPROBED
            //      [Op.and]:
            //      [{name: {[Op.like]: filterWord}},
            //      {status: 1}]
            //   },
            where: {id: filterIngredient},
            include: [{
                model: Recipes,
                as: 'recipes',
                attributes: [
                    'id',
                    'name',
                    'description',
                    'serving',
                    'servingPerPerson',
                    'time',
                    'isVegan',
                    'totalSteps',
                    'totalRating',
                ]
            }],
              order: [['createdAt',order]],
            
            })
    }catch(e){
        console.log(e)    
        throw Error("Error while fetching recipe")
    }
}

exports.searchRecipeByLackOfIngredient = async function(filterIngredient,orderAsc){
    var order= orderAsc===0? 'ASC':'DESC';
    try{
        const recipesFectched = IngredientInRecipe.findAll({
            // where: { VERSION CON EL STATUS APPROBED
            //      [Op.and]:
            //      [{name: {[Op.like]: filterWord}},
            //      {status: 1}]
            //   },
            where: {id: {[Op.not]:filterIngredient}},
            include: [{
                model: Recipes,
                as: 'recipes',
                attributes: [
                    'id',
                    'name',
                    'description',
                    'serving',
                    'servingPerPerson',
                    'time',
                    'isVegan',
                    'totalSteps',
                    'totalRating',
                ]
            }],
              order: [['createdAt',order]],
            
            })
    }catch(e){
        console.log(e)    
        throw Error("Error while fetching recipe")
    }
}

exports.listRecipeByUserId = async function(filterUser,orderAsc){
    var order= orderAsc===0? 'ASC':'DESC';
    console.log("acaaaaa", order)
    try{
        const recipesFectched = await Recipes.findAll({
            // where: { VERSION CON EL STATUS APPROBED
            //      [Op.and]:
            //      [{name: {[Op.like]: filterWord}},
            //      {status: 1}]
            //   },
            
            //requisito PRONAR EL ORDENAMIENTO POR NOMBRE order: [['createdAt',order],['nombre',ASC]],
            include: [{
                model: Status,
                as: 'status',
                attributes: [
                    'id',
                    'description'
                ]
            }],
            where: {idUser: filterUser},
            order: [['createdAt',order]],
            attributes: [
                'name',
                'description',
                'time',
                'totalRating',
                'totalSteps',
            ]
            })
            console.log(recipesFectched)
            return {recipeFetched:recipesFectched};
    }catch(e){
        console.log(e)    
        throw Error("Error while fetching recipe")
    }
}

exports.searchRecipes  = async function(filter,orderAsc){
    var order= orderAsc===0? 'ASC':'DESC';
    var recipeName2 = "%"+filter.recipeName+"%";
    

    var userName = "%"+filter.userName+"%";
   

    
    console.log(filter.categoryList)
       // where: { VERSION CON EL STATUS APPROBED
            //      [Op.and]:
            //      [{name: {[Op.like]: filterWord}},
            //      {status: 1}]
            //   },
            
            //requisito PROBAR EL ORDENAMIENTO POR NOMBRE order: [['createdAt',order],['nombre',ASC]],
    try{
        const recipesFectched = await Recipes.findAll({
         
            include: [{
                model: Category,
                as: 'category',
                attributes: [
                    'id',
                    'description'
                ]
            },{
                model: User,
                as: 'user',
                 where: {[Op.or]:[
                    {name: {[Op.like]:userName}},
                    
                ]},
                attributes: [
                    'id',
                    'name'
                ]
            },{
                model: Status,
                as: 'status',
                attributes: [
                    'id',
                    'description'
                ]
            }],
            where: {[Op.or]:[
                        {idCategory:{[Op.or]:  filter.categoryList}},
                        {[Op.or]:[{name: {[Op.like]:recipeName2}},],},
                        {id:{[Op.or]: filter.listOfIds.recipessIdss}}
            ]},
            order: [['createdAt',order]],
            attributes: [
                "id",
                'name',
                'description',
                'time',
                'totalRating',
                'totalSteps',
            ]
            })


            return {recipeFetched:recipesFectched};
    }catch(e){
        console.log(e)    
        throw Error("Error while fetching recipe")
    }
}

exports.searchRecipesWithdAndWithoutIngredients = async function(filter,orderAsc){
    var order= orderAsc===0? 'ASC':'DESC';
    var recipessIdss = [];
       // where: { VERSION CON EL STATUS APPROBED
            //      [Op.and]:
            //      [{name: {[Op.like]: filterWord}},
            //      {status: 1}]
            //   },
/*
            where:  {[Op.or]:[
                { [Op.or]:[
                    {idIngredient: {[Op.or]:filter.ingredientsList}},
                    {}
                ]},
                {[Op.or]:[
                    {idIngredient: {[Op.notIn]:lackOfIngredientsList2}},
                    {}
                ]},
            ]}
    */          
            //requisito PROBAR EL ORDENAMIENTO POR NOMBRE order: [['createdAt',order],['nombre',ASC]],
    try{
        const recipesFectched = await IngredientInRecipe.findAll({
          
            where:  {[Op.and]:[
                {idIngredient: {[Op.or]:filter.ingredientsList}},
                {idIngredient: {[Op.notIn]:filter.lackOfIngredientsList}},    
            ]},
              attributes: [
                'idRecipe',
            ],
            group: 'idRecipe'
            })
            console.log(recipesFectched)
            for(var i in recipesFectched) {
                var item = recipesFectched[i]; 
                recipessIdss.push(item.idRecipe)
            }      
            return {recipessIdss};
    }catch(e){
        console.log(e)    
        throw Error("Error while fetching recipe")
    }
}

async function searchRecipes3(){
    try {
        // Saving the Control 
        var savedRecipeImg = await newRecipeImg.save();

        return savedRecipeImg;
    } catch (e) {
        // return a Error message describing the reason 
    console.log(e)    
    throw Error("Error while searching recipe - search recipe 3" )
    }
}
