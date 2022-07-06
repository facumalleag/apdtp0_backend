// Gettign the Newly created Mongoose Model we just created 
const Photo = require('../models').photo;

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

//configurar cloudinary
var cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'dzzl63wq3', 
    api_key: '534821765333157', 
    api_secret: 'myn4YRcMeFhY0d8RUvYqhq0-sek'   
});

//cloudinary.config(process.env.CLOUDINARY_URL)
// Async function to get the Contact List
exports.getImagenes = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        var Imagenes = await Photo.paginate(query, options)
        // Return the Contact list that was retured by the mongoose promise
        return Imagenes;

    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error while Paginating Contacts');
    }
}

// Async function to get the Contact List
exports.getImagenesByRecipeId = async function (recipeId, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    console.log("555555555555", recipeId)
    try {
        var RecipeImagenes = await Photo.findAll({
            where:{
                idRecipe: recipeId.id
            }
        });
        // Return the Control list that was retured by the mongoose promise
        console.log("videos by dni",RecipeImagenes)
        return RecipeImagenes;

    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error while Paginating Desafios');
    }
}

async function savedRecipeImg (newRecipeImg){
    try {
        // Saving the Control 
        var savedRecipeImg = await newRecipeImg.save();
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
        return savedRecipeImg;
    } catch (e) {
        // return a Error message describing the reason 
    console.log(e)    
    throw Error("Error while Creating Imagen User")
    }
}

exports.createRecipeImg = async function (recipeImg) {
    
    //subir imagen a cloudinary
    let urlImg;
    let imagen = process.env.UPLOAD_DIR + recipeImg.nombreImagen;
    if(recipeImg.nombreImagen.split('.').pop() ==="mp4"){

        cloudinary.uploader.upload(imagen,{ resource_type: "video"}, function(error,result) { 
            console.log("Resultado",result);
            console.log("Error",error);
            urlImg=result.url;
            console.log("urlImg",urlImg)
            console.log("idRecipe: ", recipeImg.idRecipe)
            // Creating a new Mongoose Object by using the new keyword
            var newRecipeImg = new Photo({      
                idRecipe: recipeImg.idRecipe,
                url: result.url,
                extension: recipeImg.nombreImagen.split('.').pop()
               
            })
            
            savedRecipeImg(newRecipeImg);
        });
    }else{
        cloudinary.uploader.upload(imagen, function(error,result) { 
            console.log("Resultado",result);
            console.log("Resultado",error);
            urlImg=result.url;
            console.log("urlImg",urlImg)
            console.log("idRecipe: ", recipeImg.idRecipe)
            // Creating a new Mongoose Object by using the new keyword
            var newRecipeImg = new Photo({      
                idRecipe: recipeImg.idRecipe,
                url: result.url,
                extension: recipeImg.nombreImagen.split('.').pop()
               
            })
            
            savedRecipeImg(newRecipeImg);
        });
    }
}

exports.destroyRecipePhotoByRecipeId = async function (id) {

    try {
    var RecipePhoto = await Photo.findOne({
            where:{
                idRecipe: id
            }
        });
    var multim = {url:StepMultimedia.url}

    console.log("acaaa",multim) 

    var imageId = multim.url.split("/").pop().split(".")[0]  
    if (RecipePhoto!==null){
        cloudinary.uploader.destroy(imageId, async function(error,result) { 
     
            if (error) throw error;
            await deleteRecipePhoto(id);
            return true
            });
        
    }

    }catch{
        return false
    }
}
exports.destroyRecipePhoto = async function (photoId) {
    console.log("|||||||",photoId)
    try {
    var RecipePhoto = await Photo.findOne({
            where:{
                id: photoId.id
            }
        });
    var multim = {url:StepMultimedia.url}

    console.log("acaaa",multim) 

    var imageId = multim.url.split("/").pop().split(".")[0]  
    if (RecipePhoto!==null){
        cloudinary.uploader.destroy(imageId, async function(error,result) { 
     
            if (error) throw error;
            await deleteRecipePhoto(photoId);
            return true
            });
        
    }

    }catch{
        return false
    }
}
exports.pp44 = async function (photoId) {
    deleteRecipePhoto (photoId)
}
async function deleteRecipePhoto (idPhoto){
    console.log("wwwwww",idPhoto)
    try {
        // Saving the Control 
        var deleteRecipePhoto = await Photo.destroy({
            where:{
                id: idPhoto
            }
        });
        return true
    } catch (e) {
        // return a Error message describing the reason 
    console.log(e)    
    throw Error("Error while Creating Imagen User")
    }
}
async function deleteRecipePhoto2 (i){
    try {
        // Saving the Control 
        var deleteRecipePhoto = await Photo.destroy({
            where:{
                idRecipe: id
            }
        });
        return true
    } catch (e) {
        // return a Error message describing the reason 
    console.log(e)    
    throw Error("Error while Creating Imagen User")
    }
}