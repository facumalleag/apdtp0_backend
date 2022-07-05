var PhotoService =require('../services/photo.service');

// Saving the context of this module inside the _the variable
_this = this;
exports.guardarImagenRecipe = async function (req, res, next) {

    console.log("ImgUser",req.body)
    // Id is necessary for the update
    if (!req.body.idRecipe) {
        return res.status(400).json({status: 400., message: "Recipe id must be present"})
    }

    let recipeImg = {
        idRecipe: req.body.idRecipe,
        nombreImagen : req.body.nombreImagen
    }
    
    try {
        if (recipeImg.nombreImagen!=='')
        {
            var newrecipeImg = await PhotoService.createRecipeImg(recipeImg);
        }
        
        return res.status(201).json({status: 201, message: "Imagen cargada"});
        
    } catch (e) {
        console.log("error guardar imagen",e)
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.getImagenByRecipeId= async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    //obtener filtro
    var filtro = {
        id: req.params.id
    }

    try {
        var UsersImg = await PhotoService.getImagenesByRecipeId(filtro, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.

        if (UsersImg.total===0)
            return res.status(201).json({status: 201, data: UsersImg, message: "No existe Mail"});
        else
            return res.status(200).json({status: 200, data: UsersImg, message: "Succesfully Users Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.destroyPhotoById= async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    console.log(req.params.id)
    var filtro = {
        id: req.params.id
    }

    try {
        var UsersImg = await PhotoService.destroyRecipePhoto(filtro)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(201).json({status: 201, data: UsersImg, message: "Se elimino correctamente"});

    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: e.message});
    }
}