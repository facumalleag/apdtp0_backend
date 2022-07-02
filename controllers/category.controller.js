var categoryService = require('../services/category.service');
_this = this
exports.createCategory = async function (req, res, next) {
    console.log("llegue al controller",req.params)
    var stt =""
    let msg = ""
    var category = {
        description: req.params.category ? req.params.category : null,
    }
    try {
        if(category.description === null){
            throw new ExceptionNewUser ("Invalid input - Incomplete Data", 405);
        }
        var createdCategory = await categoryService.createCategory(category)
        return res.status(201).json({data:createdCategory, message: "Succesfully Created category"})
    } catch (e) {
        console.log(e)
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg :"Category Creation was Unsuccesfull"
        return res.status(stt).json({status: stt, message: msg})
    }
}

exports.listCategories = async function (req, res, next) {
    var stt =""
    let msg = ""
    try {
        var listedCategories = await categoryService.listCategories()
        return res.status(201).json({listedCategories, message: "Succesfully categories fetched"})
    } catch (e) {
        console.log(e)
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg :"Category listing was Unsuccesfull"
        return res.status(stt).json({status: stt, message: msg})
    }
}

exports.updateCategory = async function (req, res, next) {
    console.log("llegue al controller",req.params)
    var stt =""
    let msg = ""
    var category = {
        id: req.params.id ? req.params.id : null,
        description: req.params.category ? req.params.category : null,
    }
    try {
        if(category.description === null || category.id === null){
            throw new ExceptionNewUser ("Invalid input - Incomplete Data", 405);
        }
        var updatedCategory = await categoryService.updateCategory(category)
        return res.status(201).json({data:updatedCategory, message: "Succesfully updated category"})
    } catch (e) {
        console.log(e)
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg :"Category update was Unsuccesfull"
        return res.status(stt).json({status: stt, message: msg})
    }
}

function ExceptionNewUser(msg,stt) {
    this.msg = msg;
    this.stt = stt;
 }
