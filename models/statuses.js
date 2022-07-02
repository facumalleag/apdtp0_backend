'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class statuses extends Model {
		static associate(models) {
			// define association here
		}
	};
	statuses.init({
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
		modelName: 'statuses',
	});
	return statuses;
};