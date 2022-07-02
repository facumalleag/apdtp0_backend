const Status = require('../models').statuses;
_this = this

exports.createStatus = async function (statusIn) {

    var newStatus = new Status({
        description:statusIn.description
    })
    try {
        var savedStatus = await newStatus.save();
        return {status:savedStatus.description};
    } catch (e) {
        console.log(e)    
        throw Error("Error while Creating status")
    }
}

exports.listStatus = async function () {
    try {
        var listofStatus = await Status.findAll();
        console.log(listofStatus)
        return listofStatus;
    } catch (e) {
        console.log(e)    
        throw Error("Error while fetching status")
    }
}

exports.updateStatus = async function (statusIn) {
    try {
        var filteredStatus = await Status.findOne({
            where:{
                id: statusIn.id
            }
        })
        var savedStatus = await filteredStatus.update({
            description: statusIn.description
        },{
            where:{
            id: statusIn.id
                }
            }
        );
        return {status:savedStatus.description};
    } catch (e) {
        console.log(e)    
        throw Error("Error while updating status")
    }
}