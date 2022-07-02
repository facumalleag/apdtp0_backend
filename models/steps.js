'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class steps extends Model {
		static associate(models) {

            steps.belongsTo(models.recipes,
				{
					as: 'recipe',
					foreignKey: 'idRecipe'
				}
			);
		}
	};
	steps.init({
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
        idRecipe: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
        stepOrder: {
			allowNull: false,
			type: DataTypes.INTEGER
		},

		description: {
            allowNull: false,
			type: DataTypes.STRING,
		},

	}, {
		sequelize,
		modelName: 'steps',
	});
	return steps;
};