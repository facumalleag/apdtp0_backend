'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class categories extends Model {
		static associate(models) {
			// define association here
		}
	};
	categories.init({
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
		modelName: 'categories',
	});
	return categories;
};