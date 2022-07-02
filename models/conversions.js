'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class conversions extends Model {
		static associate(models) {
			conversions.belongsTo(models.measurements,
				{
					as: 'measurementFrom',
					foreignKey: 'idMeasurementFrom'
				}
			);
            conversions.belongsTo(models.measurements,
				{
					as: 'measurementTo',
					foreignKey: 'idMeasurementTo'
				}
			);
		}
	};
	conversions.init({
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
        idMeasurementFrom: {
            allowNull: false,
			type: DataTypes.INTEGER,
		},
        idMeasurementTo: {
            allowNull: false,
			type: DataTypes.INTEGER,
		},
		conversionFactor: {
            allowNull: false,
			type: DataTypes.INTEGER,
		},

	}, {
		sequelize,
		modelName: 'conversions',
	});
	return conversions;
};