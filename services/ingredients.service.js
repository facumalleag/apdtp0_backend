const Ingredient = require('../models').ingredients;
_this = this

exports.createIngredient = async function (ingredientIn) {

    var newIngredient = new Ingredient({
        description:ingredientIn.description
    })
    try {
        var savedIngredient = await newIngredient.save();
        return {ingredient:savedIngredient.description};
    } catch (e) {
        console.log(e)    
        throw Error("Error while Creating ingredient")
    }
}

exports.listIngredients = async function () {
    try {
        var listofIngredients = await Ingredient.findAll();
        console.log(listofIngredients)
        return listofIngredients;
    } catch (e) {
        console.log(e)    
        throw Error("Error while fetching ingredient")
    }
}

exports.updateIngredient = async function (ingredientIn) {
    try {
        var filteredIngredient = await Ingredient.findOne({
            where:{
                id: ingredientIn.id
            }
        })
        var savedIngredient = await filteredIngredient.update({
            description: ingredientIn.description
        },{
            where:{
            id: ingredientIn.id
                }
            }
        );
        return {ingredient:savedIngredient.description};
    } catch (e) {
        console.log(e)    
        throw Error("Error while updating ingredient")
    }
}