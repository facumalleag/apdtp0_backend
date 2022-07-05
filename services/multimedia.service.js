// Gettign the Newly created Mongoose Model we just created 
const Multimedia = require('../models').multimedia;

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
exports.getMultimedia = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        var Imagenes = await Multimedia.paginate(query, options)
        // Return the Contact list that was retured by the mongoose promise
        return Imagenes;

    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error while Paginating Contacts');
    }
}

// Async function to get the Contact List
exports.getMultimediaByStepId = async function (stepId, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    
    try {
        var StepMultimedia = await Multimedia.findAll({
            where:{
                idStep: stepId.id
            }
        });
        return StepMultimedia;

    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error while Paginating Multimedia');
    }
}

async function savedStepMultimedia (newStepMultimedia){
    try {
        // Saving the Control 
        var savedStepMultimedia = await newStepMultimedia.save();
        return savedStepMultimedia;
    } catch (e) {
        // return a Error message describing the reason 
    console.log(e)    
    throw Error("Error while Creating Imagen User")
    }
}

exports.createStepMultimedia = async function (stepMultimedia) {
    try {
    console.log("stepMultimedia",stepMultimedia.nombreImagen.split('.').pop())
    let urlImg;
    let imagen = process.env.UPLOAD_DIR + stepMultimedia.nombreImagen;
    if(stepMultimedia.nombreImagen.split('.').pop() ==="mp4"){
        cloudinary.uploader.upload(imagen,{ resource_type: "video"}, async function(error,result) { 
            console.log("Resultado",result);
            console.log("Error",error);
            urlImg=result.url;
            console.log("urlImg",urlImg)
      
            // Creating a new Mongoose Object by using the new keyword
            var newStepMultimedia = new Multimedia({      
                idStep: stepMultimedia.idStep,
                url: result.url,
                extension: stepMultimedia.nombreImagen.split('.').pop(),
                tipo_contenido:"video"
               
            })
            
            await savedStepMultimedia(newStepMultimedia);
        });
    }else{
        cloudinary.uploader.upload(imagen, async function(error,result) { 
            
            console.log("Resultado",result);
            console.log("Error",error);
            urlImg=result.url;
            console.log("urlImg",urlImg)
  
            // Creating a new Mongoose Object by using the new keyword
            var newStepMultimedia = new Multimedia({      
                idStep: stepMultimedia.idStep,
                url: result.url,
                extension: stepMultimedia.nombreImagen.split('.').pop(),
                tipo_contenido:"image"
                
            })
            try{
                await savedStepMultimedia(newStepMultimedia);
                return true
            }catch{
                return true
            }
         
    
        });
    }
    }catch{
        return false
    }
}

exports.destroyStepMultimedia = async function (stepId) {
    try {
    var StepMultimedia = await Multimedia.findOne({
            where:{
                idStep: stepId.id
            }
        });
    var multim = {url:StepMultimedia.url}
    var multimId = {id:StepMultimedia.id}
    console.log("acaaa",multim) 

    var imageId = multim.url.split("/").pop().split(".")[0]  
    if (StepMultimedia!==null){
        cloudinary.uploader.destroy(imageId, async function(error,result) { 
     
            if (error) throw error;
            await deleteStepMultimedia(multimId.id);
            return true
            });
        
    }

    }catch{
        return false
    }
}
async function deleteStepMultimedia (idMultimedia){
    try {
        // Saving the Control 
        var deleteStepMultimedia = await Multimedia.destroy({
            where:{
                id: idMultimedia
            }
        });
        return true
    } catch (e) {
        // return a Error message describing the reason 
    console.log(e)    
    throw Error("Error while Creating Imagen User")
    }
}