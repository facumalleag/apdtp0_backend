var ratingService = require('../services/ratings.service');
_this = this
exports.createRating = async function (req, res, next) {
    console.log("llegue al controller",req.body)
    var stt =""
    let msg = ""
    var rating = {
        idRecipe: req.body.idRecipe ? req.body.idRecipe : null,
        idUser: req.body.idUser ? req.body.idUser : null,
        rate: req.body.rate ? req.body.rate : null,
        comment: req.body.comment ? req.body.comment : null,
    }

    try {
        if(rating.idRecipe === null || rating.idUser === null || rating.rate === null || rating.comment === null ){
            throw new ExceptionNewUser ("Invalid input - Incomplete Data", 405);
        }
        var createdRating = await ratingService.createRating(rating)
        return res.status(201).json({data:createdRating, message: "Succesfully Created rating"})
    } catch (e) {
        console.log(e)
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg :"rating Creation was Unsuccesfull"
        return res.status(stt).json({status: stt, message: msg})
    }
}

exports.listRatingsByRecipeId = async function (req, res, next) {
    var stt =""
    let msg = ""
    var idRecipe = req.params.id
    try {
        var listedRatings = await ratingService.listRatingsByRecipeId(idRecipe)
        return res.status(201).json({listedRatings, message: "Succesfully rating fetched"})
    } catch (e) {
        console.log(e)
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg :"rating listing was Unsuccesfull"
        return res.status(stt).json({status: stt, message: msg})
    }
}

exports.listRatingsByUserId = async function (req, res, next) {
    var stt =""
    let msg = ""
    var idUser = req.params.id
    try {
        var listedRatings = await ratingService.listRatingsByUserId(idUser)
        return res.status(201).json({listedRatings, message: "Succesfully rating fetched"})
    } catch (e) {
        console.log(e)
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg :"rating listing was Unsuccesfull"
        return res.status(stt).json({status: stt, message: msg})
    }
}

exports.updateRating = async function (req, res, next) {
    console.log("llegue al controller",req.body)
    var stt =""
    let msg = ""
    var rating = {
        id: req.body.id ? req.body.id : null,
        idRecipe: req.body.idRecipe ? req.body.idRecipe : null,
        idUser: req.body.idUser ? req.body.idUser : null,
        rate: req.body.rate ? req.body.rate : null,
        comment: req.body.comment ? req.body.comment : null,
    }
    try {
        if(rating.idRecipe === null || rating.idUser === null || rating.rate === null || rating.comment === null || rating.id === null){
            throw new ExceptionNewUser ("Invalid input - Incomplete Data", 405);
        }
        var updatedRating = await ratingService.updateRating(rating)
        return res.status(201).json({data:updatedRating, message: "Succesfully updated rating"})
    } catch (e) {
        console.log(e)
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg :"rating update was Unsuccesfull"
        return res.status(stt).json({status: stt, message: msg})
    }
}

function ExceptionNewUser(msg,stt) {
    this.msg = msg;
    this.stt = stt;
 }
