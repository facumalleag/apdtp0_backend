var difficultyService = require('../services/difficulty.service');
_this = this
exports.createDifficulty = async function (req, res, next) {
    console.log("llegue al controller",req.params)
    var stt =""
    let msg = ""
    var difficulty = {
        description: req.params.difficulty ? req.params.difficulty : null,
    }
    console.log(difficulty.description)
    try {
        if(difficulty.description === null){
            throw new ExceptionNewUser ("Invalid input - Incomplete Data", 405);
        }
        
        var createdDifficulty = await difficultyService.createDifficulty(difficulty)
        return res.status(201).json({data:createdDifficulty, message: "Succesfully Created difficulty"})
    } catch (e) {
        console.log(e)
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg :"difficulty Creation was Unsuccesfull"
        return res.status(stt).json({status: stt, message: msg})
    }
}

exports.listDifficulty = async function (req, res, next) {
    var stt =""
    let msg = ""
    try {
        var listedDifficulty = await difficultyService.listDifficulty()
        return res.status(201).json({listedDifficulty, message: "Succesfully difficulty fetched"})
    } catch (e) {
        console.log(e)
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg :"difficulty listing was Unsuccesfull"
        return res.status(stt).json({status: stt, message: msg})
    }
}

exports.updateDifficulty = async function (req, res, next) {
    console.log("llegue al controller",req.params)
    var stt =""
    let msg = ""
    var difficulty = {
        id: req.params.id ? req.params.id : null,
        description: req.params.difficulty ? req.params.difficulty : null,
    }
    try {
        if(difficulty.description === null || difficulty.id === null){
            throw new ExceptionNewUser ("Invalid input - Incomplete Data", 405);
        }
        var updatedDifficulty = await difficultyService.updateDifficulty(difficulty)
        return res.status(201).json({data:updatedDifficulty, message: "Succesfully updated Difficulty"})
    } catch (e) {
        console.log(e)
        stt = e.stt ? e.stt : 400
        msg = e.msg ? e.msg :"Difficulty update was Unsuccesfull"
        return res.status(stt).json({status: stt, message: msg})
    }
}

function ExceptionNewUser(msg,stt) {
    this.msg = msg;
    this.stt = stt;
 }
