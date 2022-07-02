const Difficulty = require('../models').difficulties;
_this = this

exports.createDifficulty = async function (difficultyIn) {

    var newDifficulty = new Difficulty({
        description:difficultyIn.description,
    })
    console.log("AAAAAAAAAAAACCCCCCCCCAAAAAAAAAAAAAAAAAAAA", newDifficulty)
    try {
        var savedDifficulty = await newDifficulty.save();
        console.log("AAAAAAAAAAAACCCCCCCCCAAAAAAAAAAAAAAAAAAAA")
        return {difficulty:savedDifficulty.description};
    } catch (e) {
        console.log(e)    
        throw Error("Error while Creating Difficulty")
    }
}

exports.listDifficulty = async function () {
    try {
        var listofDifficulty = await Difficulty.findAll();
        console.log(listofDifficulty)
        return listofDifficulty;
    } catch (e) {
        console.log(e)    
        throw Error("Error fetching Creating Difficulty")
    }
}

exports.updateDifficulty = async function (difficultyIn) {
    try {
        var filteredDifficulty = await Difficulty.findOne({
            where:{
                id: difficultyIn.id
            }
        })
        var savedDifficulty = await filteredDifficulty.update({
            description: difficultyIn.description
        },{
            where:{
            id: difficultyIn.id
                }
            }
        );
        return {difficulty:savedDifficulty.description};
    } catch (e) {
        console.log(e)    
        throw Error("Error while Creating Difficulty")
    }
}