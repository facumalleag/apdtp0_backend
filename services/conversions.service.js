const Conversions = require('../models').conversions;
const Measurements = require('../models').measurements;
_this = this

exports.createConversions = async function (conversionsIn) {

    var newConversions = new Conversions({
        idMeasurementFrom: conversionsIn.idMeasurementFrom,
        idMeasurementTo:conversionsIn.idMeasurementTo,
        conversionFactor:conversionsIn.conversionFactor
    })
    try {
        var savedConversions = await newConversions.save();
        return {id:savedConversions.id,
                idMeasurementFrom:savedConversions.idMeasurementFrom,
                idMeasurementTo:savedConversions.idMeasurementTo,
                conversionFactor:savedConversions.conversionFactor,};
    } catch (e) {
        console.log(e)    
        throw Error("Error while Creating conversion")
    }
}

exports.listConversions = async function () {
    try {
        var listofConversions = await Conversions.findAll({
            include: [{//Join para traer el nombre de la medida 1
                model: Measurements,
                as: 'measurementFrom',
                attributes: [
                    'id',
                    'description'
                ]
            },  {//Join para traer el nombre de la medida 2
                model: Measurements,
                as: 'measurementTo',
                attributes: [
                    'id',
                    'description'
                ]
            }],
            attributes: [//columas de la tabla conversions
                'id',
                'conversionFactor'
            ]
        });
        console.log(listofConversions)
        return listofConversions;
    } catch (e) {
        console.log(e)    
        throw Error("Error while fetching conversions")
    }
}

exports.updateConversions = async function (conversionsIn) {
    try {
        var filteredConversions = await Conversions.findOne({
            where:{
                id: conversionsIn.id
            }
        })
        var savedConversions = await filteredConversions.update({
            idMeasurementFrom: conversionsIn.idMeasurementFrom,
            idMeasurementTo: conversionsIn.idMeasurementTo,
            conversionFactor: conversionsIn.conversionFactor
        },{
            where:{
            id: conversionsIn.id
                }
            }
        );
        return {id:savedConversions.id,
                idMeasurementFrom:savedConversions.idMeasurementFrom,
                idMeasurementTo:savedConversions.idMeasurementTo,
                conversionFactor:savedConversions.conversionFactor,};
    } catch (e) {
        console.log(e)    
        throw Error("Error while updating conversions")
    }
}