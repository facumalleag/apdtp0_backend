'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class difficulties extends Model {
		static associate(models) {
			// define association here
		}
	};
	difficulties.init({
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		description: {
			allowNull: false,
			type: DataTypes.STRING,
		},

	}, {
		sequelize,
		modelName: 'difficulties',
	});
	return difficulties;
};