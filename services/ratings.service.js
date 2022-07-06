const Rating = require('../models').ratings;
_this = this

exports.createRating = async function (ratingIn) {

    var newRating = new Rating({
        idRecipe: ratingIn.idRecipe,
        idUser: ratingIn.idUser,
        rate: ratingIn.rate,
        comment: ratingIn.comment
    })
    try {
        var savedRating = await newRating.save();
        return {rating:savedRating};
    } catch (e) {
        console.log(e)    
        throw Error("Error while Creating rating")
    }
}

exports.listRatingsByRecipeId = async function (recipeId) {
    try {
        var listofRatings = await Rating.findAll({
            where: {
				idRecipe: recipeId
			}
        });
        console.log(listofRatings)
        return listofRatings;
    } catch (e) {
        console.log(e)    
        throw Error("Error while fetching rating")
    }
}

exports.listRatingsByUserId = async function (userId) {
    try {
        var listofRatings = await Rating.findAll({
            where: {
				idUser: userId
			}
        });
        console.log(listofRatings)
        return listofRatings;
    } catch (e) {
        console.log(e)    
        throw Error("Error while fetching rating")
    }
}

exports.updateRating = async function (ratingIn) {
    try {
        var filteredRating = await Rating.findOne({
            where:{
                id: ratingIn.id
            }
        })
        var savedRating = await filteredRating.update({
            id: ratingIn.id,
            idRecipe: ratingIn.idRecipe,
            idUser: ratingIn.idUser,
            rate: ratingIn.rate,
            comment: ratingIn.comment
        },{
            where:{
            id: ratingIn.id
                }
            }
        );
        return {rating:savedRating};
    } catch (e) {
        console.log(e)    
        throw Error("Error while updating rating")
    }
}

exports.deleteRating= async function (recipeId) {

    try {
        var deletedRecipe = await Rating.destroy({
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