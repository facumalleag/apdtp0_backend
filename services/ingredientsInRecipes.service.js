const IngredientsInRecipe = require('../models').ingredientsInRecipes;
const Recipe = require('../models').recipes;
const Measurements = require('../models').measurements;
const Ingredient = require('../models').ingredients;


_this = this

exports.createIngredientsInRecipe = async function (ingredientsInRecipeIn) {

    var newIngredientsInRecipe = new IngredientsInRecipe({
        idRecipe : ingredientsInRecipeIn.idRecipe,
        idIngredient : ingredientsInRecipeIn.idIngredient,
        idMeasurement : ingredientsInRecipeIn.idMeasurement,
        cantidad : ingredientsInRecipeIn.cantidad,
        description: ingredientsInRecipeIn.description,
    })
    try {
        var savedIngredientsInRecipe = await newIngredientsInRecipe.save();
        return {ingredientsInRecipe:savedIngredientsInRecipe.description};
    } catch (e) {
        console.log(e)    
        throw Error("Error while Creating ingredientsInRecipe")
    }
}

exports.listIngredientsInRecipe = async function (recipeId) {
    try {
        var listofIngredientsInRecipe = await IngredientsInRecipe.findAll({
            where:{
                idRecipe: recipeId
            },
            include: [{//Join para traer el nombre de la medida 1
                model: Measurements,
                as: 'measurement',
                attributes: [
                    'id',
                    'description'
                ]
            },  {//Join para traer el nombre de la medida 2
                model: Recipe,
                as: 'recipes',
                attributes: [
                    'id',
                    'name'
                ]
            }, {//Join para traer el nombre de la medida 1
                model: Ingredient,
                as: 'ingredients',
                attributes: [
                    'id',
                    'description'
                ]
            }],
            attributes: [//columas de la tabla conversions
                'id',
                'cantidad',
                'description'
            ]
            
        });
        console.log(listofIngredientsInRecipe)
        return listofIngredientsInRecipe;
    } catch (e) {
        console.log(e)    
        throw Error("Error while fetching ingredientsInRecipe")
    }
}

exports.updateIngredientsInRecipe = async function (ingredientsInRecipeIn) {
    try {
        var filteredIngredientsInRecipe = await IngredientsInRecipe.findOne({
            where:{
                id: ingredientsInRecipeIn.id
            }
        })
        var savedIngredientsInRecipe = await filteredIngredientsInRecipe.update({
            id:ingredientsInRecipeIn.id,
            idRecipe : ingredientsInRecipeIn.idRecipe,
            idIngredient : ingredientsInRecipeIn.idIngredient,
            idMeasurement :ingredientsInRecipeIn.idMeasurement,
            cantidad : ingredientsInRecipeIn.cantidad,
            description: ingredientsInRecipeIn.description,
        },{
            where:{
            id: ingredientsInRecipeIn.id
                }
            }
        );
        return {ingredientsInRecipe:savedIngredientsInRecipe.description};
    } catch (e) {
        console.log(e)    
        throw Error("Error while updating ingredientsInRecipe")
    }
}

exports.bulkCreateIngredientsInRecipe = async function (IngredientsInRecipeList) {
    console.log(IngredientsInRecipeList)

    try {
        var savedIngredientsInRecipe = await IngredientsInRecipe.bulkCreate(IngredientsInRecipeList);
        
        return {stepCreationOk:true};
    } catch (e) {
        console.log(e)    
        throw Error("Error while Creating Step")
    }
}

exports.bulkUpdateIngredientsInRecipe = async function (IngredientsInRecipeList) {
    console.log(IngredientsInRecipeList)
    const statements = [];
    const tableName = "ingredientsInRecipes";
    try {
        for (let i = 0; i < IngredientsInRecipeList.length; i++) {
                statements.push(
                    sequelize.query(
                   `UPDATE ${tableName} 
                   SET idRecipe='${IngredientsInRecipeList[i].idRecipe}', idIngredient='${IngredientsInRecipeList[i].idIngredient}',idMeasurement='${IngredientsInRecipeList[i].idMeasurement}'',cantidad='${IngredientsInRecipeList[i].cantidad}'',description='${IngredientsInRecipeList[i].description}'
                   WHERE id=${IngredientsInRecipeList[i].id};`
                   )
              );}
        return {IngredientsBulkUpdate:true};
    } catch (e) {
        console.log(e)    
        throw Error("Error while Creating Step")
    }
}
exports.deleteIngredientsInRecipe= async function (recipeId) {

    try {
        var deletedIngredientsInRecipe = await IngredientsInRecipe.destroy({
            where:{
                idRecipe: recipeId
            }
        });
        return true
    } catch (e) {
        console.log(e)    
        throw Error("Error while deleting Recipe")
    }
}