'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class ingredients extends Model {
		static associate(models) {
			// define association here
		}
	};
	ingredients.init({
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
		modelName: 'ingredients',
	});
	return ingredients;
};