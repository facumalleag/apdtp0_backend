const Steps = require('../models').steps;
const sequelize = require('../models').sequelize;
const { QueryTypes } = require('sequelize');//nose que tan necesario es para las consultas
_this = this

exports.createSteps = async function (stepIn) {

    var newStep = new Steps({
        idRecipe:stepIn.idRecipe,
        stepOrder:stepIn.stepOrder,
        description:stepIn.description,
    })
    try {
        var savedStep = await newStep.save();
        return {step:savedStep.description};
    } catch (e) {
        console.log(e)    
        throw Error("Error while Creating Step")
    }
}

exports.listStepsByRecipeId = async function (steps) {
    console.log(steps)
    try {
        var listofSteps = await Steps.findAll({
            where:{
                idRecipe: steps.idRecipe
            },
            order: [['stepOrder'],]
        });
        //order: [['stepOrder', 'DESC'],]
        console.log(listofSteps)
        return listofSteps;
    } catch (e) {
        console.log(e)    
        throw Error("Error while fetching Steps")
    }
}

exports.updateSteps= async function (stepIn) {
    try {
        var filteredSteps = await Steps.findOne({
            where:{
                id: stepIn.id
            }
        })
        var savedSteps = await filteredSteps.update({
            idRecipe:stepIn.idRecipe,
            stepOrder:stepIn.stepOrder,
            description: stepIn.description
        },{
            where:{
            id: stepIn.id
                }
            }
        );
        return {steps:savedSteps.description};
    } catch (e) {
        console.log(e)    
        throw Error("Error while updating Steps")
    }
}

exports.bulkCreateSteps = async function (stepsList) {
    console.log(stepsList)

    try {
        var savedStep = await Steps.bulkCreate(stepsList);
        
        return {stepCreationOk:true};
    } catch (e) {
        console.log(e)    
        throw Error("Error while Creating Step")
    }
}

// ESTO NO FUNCIONA, MS SQL NO LO PERMITE
exports.bulkUpdateSteps = async function (stepsList) {
    console.log("acaaaa",stepsList)
    //probar
    const statements = [];
    const tableName = "steps";
    try {

        for (let i = 0; i < stepsList.length; i++) {
                statements.push(
                    sequelize.query(
                   `UPDATE ${tableName} 
                   SET idRecipe='${stepsList[i].idRecipe}', stepOrder='${stepsList[i].stepOrder}',description='${stepsList[i].description}'
                   WHERE id=${stepsList[i].id};`
                   )
              );}
        return {stepBulkUpdate:true};
    } catch (e) {
        console.log(e)    
        throw Error("Error while Creating Step")
    }
}
exports.deletesteps= async function (recipeId) {

    try {
        var deletedSteps = await Steps.destroy({
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
/**
 * La solucion es un poco mas compleja que eso. Necesito algo como lo de abajo
 *  your best option is to create an array of raw queries using sequelize.query() method and execute them using Promise.all() method.
 *
 *  Consider the following example:
 * 
 *   const values = [
 *   { id: 2, firstName: "Daniel" },
 *   { id: 3, firstName: "Jackson" },
 *   ];
 *
 *   const statements = [];
 *   const tableName = "Users";
 *
 *   for (let i = 0; i < values.length; i++) {
 *   statements.push(
 *       sequelize.query(
 *       `UPDATE ${tableName} 
 *       SET firstName='${values[i].firstName}' 
 *       WHERE id=${values[i].id};`
 *       )
 *   );
 *   }
 *   const result = await Promise.all(statements);
 *   console.log(result); // all statements are executed
 * 
 */