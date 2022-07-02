'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class measurements extends Model {
		static associate(models) {
			// define association here
		}
	};
	measurements.init({
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		description: {
            allowNull: false,
			type: DataTypes.STRING,
		}

	}, {
		sequelize,
		modelName: 'measurements',
	});
	return measurements;
};