var favoriteService = require('../services/favorites.service');
_this = this
exports.createFavorite = async function (req, res, next) {
    console.log("llegue al controller",req.body)
    var stt =""
    let msg = ""
    var favorite = {
        idRecipe: req.body.idRecipe ? req.body.idRecipe : null,
        idUser: req.body.idUser ? req.body.idUser : null,
        customFavorite: req.body.customFavorite ? req.body.customFavorite : null,
    }
    try {
        if(favorite.customFavorite === null || favorite.idRecipe === null || favorite.idUser === null ){
            throw new ExceptionNewUser ("Invalid input - Incomplete Data", 405);
        }
        var createdFavorite = await favoriteService.createFavorite(favorite)
        return res.status(201).json({data:createdFavorite, message: "Succesfully Created favorite"})
    } catch (e) {
        console.log(e)
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg :"favorite Creation was Unsuccesfull"
        return res.status(stt).json({status: stt, message: msg})
    }
}

exports.listFavoritesByUserId = async function (req, res, next) {
    var stt =""
    let msg = ""
    var userId = req.params.id 
    try {
        var listedFavorites = await favoriteService.listFavoritesByUserId(userId)
        return res.status(201).json({listedFavorites, message: "Succesfully favorites fetched"})
    } catch (e) {
        console.log(e)
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg :"favorite listing was Unsuccesfull"
        return res.status(stt).json({status: stt, message: msg})
    }
}

exports.listFavoritesOrderByRating = async function (req, res, next) {
    //TODO
    var stt =""
    let msg = ""
    try {
        var listedFavorites = await favoriteService.listFavoritesOrderByRating()
        return res.status(201).json({listedFavorites, message: "Succesfully favorites fetched"})
    } catch (e) {
        console.log(e)
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg :"favorite listing was Unsuccesfull"
        return res.status(stt).json({status: stt, message: msg})
    }
}

exports.updateFavorite = async function (req, res, next) {
    console.log("llegue al controller",req.body)
    var stt =""
    let msg = ""
    var favorite = {
        id: req.body.id ? req.body.id : null,
        idRecipe: req.body.idRecipe ? req.body.idRecipe : null,
        idUser: req.body.idUser ? req.body.idUser : null,
        customFavorite: req.body.customFavorite ? req.body.customFavorite : null,
    }
    try {
        if(favorite.customFavorite === null || favorite.idRecipe === null || favorite.idUser === null || favorite.id === null){
            throw new ExceptionNewUser ("Invalid input - Incomplete Data", 405);
        }
        var updatedFavorite = await favoriteService.updateFavorite(favorite)
        return res.status(201).json({data:updatedFavorite, message: "Succesfully updated favorite"})
    } catch (e) {
        console.log(e)
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg :"favorite update was Unsuccesfull"
        return res.status(stt).json({status: stt, message: msg})
    }
}

exports.deleteFavorite = async function (req, res, next) {
    console.log("llegue al controller",req.params)
    var stt =""
    let msg = ""
    var favoriteId = req.params.id ? req.params.id : null
    try {
        if(favoriteId === null){
            throw new ExceptionNewUser ("Invalid input - Incomplete Data", 405);
        }
        var deletedFavoriteOk = await favoriteService.deleteFavorite(favoriteId)
        return res.status(201).json({data:deletedFavoriteOk, message: "Succesfully deleted favorite"})
    } catch (e) {
        console.log(e)
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg :"favorite delete was Unsuccesfull"
        return res.status(stt).json({status: stt, message: msg})
    }
}

function ExceptionNewUser(msg,stt) {
    this.msg = msg;
    this.stt = stt;
 }
