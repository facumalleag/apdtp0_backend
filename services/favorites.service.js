const Favorite = require('../models').favorites;
const Recipes = require('../models').recipes;
const User = require('../models').users;
const sequelize = require('../models').sequelize;
const { QueryTypes } = require('sequelize');//nose que tan necesario es para las consultas
const Sequelize = require('sequelize');
_this = this

exports.createFavorite = async function (favoriteIn) {

    var newFavorite = new Favorite({

        idRecipe: favoriteIn.idRecipe,
        idUser: favoriteIn.idUser,
        customFavorite:favoriteIn.customFavorite,
    })
    try {

        var savedFavorite = await newFavorite.save();

        return {favorite:savedFavorite};
    } catch (e) {
        console.log(e)    
        throw Error("Error while Creating Favorite")
    }
}

exports.listFavoritesByUserId = async function (userId) {
    try {
        /*
        var listofFavorites = await Favorite.findAll({
            where:{
                idUser: userId
            },
            include: [{
                model: Recipes,
                as: 'recipe',
                attributes: [
                    'id',
                    'name',
                    'totalRating',
                    'time',
                ]
            }]
        });
        */
         const listofFavorites = await sequelize.query(
             "SELECT f.id as favoriteId, r.id as recipeId,  r.name as name,r.time as time,r.totalRating as totalRating,u.id as userId ,u.alias as userAlias,u.name as userName FROM recipes as r LEFT JOIN favorites as f ON f.idRecipe=r.id LEFT JOIN users as u ON u.id = r.idUser WHERE f.idUser = :id",
             {
              replacements:{ id:userId},
              type: QueryTypes.SELECT
             }
           );
        console.log("aca:",listofFavorites)
        /*
        var listofRecipes = await Recipes.findByPk(1);
        const pp = await listofRecipes.getFavorites();
        Error: Error while fetching Favorite
        El problema esta en que Node es conciente de los plurales y singulares. El modelo esta guardado como favorites
        https://sebhastian.com/sequelize-lazy-loading/#:~:text=Sequelize%20lazy%20loading%20technique%20is,only%20when%20you%20need%20it.
        */

        //console.log("aquii",listofFavorites[2].id)
        return listofFavorites;
    } catch (e) {
        console.log(e)    
        throw Error("Error while fetching Favorite")
    }
}

exports.listFavoritesOrderByRating = async function () {
    //TODO
    try {
        var listofFavorites = await Favorite.findAll();
        console.log(listofFavorites)
        return listofFavorites;
    } catch (e) {
        console.log(e)    
        throw Error("Error while fetching Favorite")
    }
}

exports.updateFavorite = async function (favoriteIn) {
    try {
        var filteredFavorite = await Favorite.findOne({
            where:{
                id: favoriteIn.id
            }
        })
        var savedFavorite = await filteredFavorite.update({
            id: favoriteIn.id,
            idRecipe: favoriteIn.idRecip,
            idUser: favoriteIn.idUser,
            customFavorite:favoriteIn.customFavorite

        },{
            where:{
            id: favoriteIn.id
                }
            }
        );
        return {favorite:savedFavorite};
    } catch (e) {
        console.log(e)    
        throw Error("Error while updating Favorite")
    }
}

exports.deleteFavorite = async function (favoriteId) {
    try {
        await Favorite.destroy({
            where:{
                id: favoriteId
            }
        });

        return true;
    } catch (e) {
        console.log(e)    
        throw Error("Error while deleting Favorite")
    }
}
exports.deleteFavorite2 = async function (recipeId) {
    try {
        await Favorite.destroy({
            where:{
                idRecipe: recipeId
            }
        });

        return true;
    } catch (e) {
        console.log(e)    
        throw Error("Error while deleting Favorite")
    }
}