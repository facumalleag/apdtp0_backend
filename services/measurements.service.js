const Measurement = require('../models').measurements;
_this = this

exports.createMeasurement = async function (measurementIn) {

    var newMeasurement = new Measurement({
        description:measurementIn.description
    })
    try {
        var savedMeasurement = await newMeasurement.save();
        return {measurement:savedMeasurement.description};
    } catch (e) {
        console.log(e)    
        throw Error("Error while Creating measurement")
    }
}

exports.listMeasurements = async function () {
    try {
        var listofMeasurement = await Measurement.findAll();
        console.log(listofMeasurement)
        return listofMeasurement;
    } catch (e) {
        console.log(e)    
        throw Error("Error while fetching Measurement")
    }
}

exports.updateMeasurement = async function (measurementIn) {
    try {
        var filteredMeasurement = await Measurement.findOne({
            where:{
                id: measurementIn.id
            }
        })
        var savedMeasurement = await filteredMeasurement.update({
            description: measurementIn.description
        },{
            where:{
            id: measurementIn.id
                }
            }
        );
        return {measurement:savedMeasurement.description};
    } catch (e) {
        console.log(e)    
        throw Error("Error while updating measurement")
    }
}