'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class ingredientsInRecipes extends Model {
		static associate(models) {
			ingredientsInRecipes.belongsTo(models.recipes,
				{
					as: 'recipes',
					foreignKey: 'idRecipe'
				}
			);
            ingredientsInRecipes.belongsTo(models.ingredients,
				{
					as: 'ingredients',
					foreignKey: 'idIngredient'
				}
			);
            ingredientsInRecipes.belongsTo(models.measurements,
				{
					as: 'measurement',
					foreignKey: 'idMeasurement'
				}
			);
		}
	};
	ingredientsInRecipes.init({
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
        idIngredient: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
        idMeasurement: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
        cantidad: {
            allowNull: false,
			type: DataTypes.INTEGER
		},
		description: {
            allowNull: false,
			type: DataTypes.STRING,
		},

	}, {
		sequelize,
		modelName: 'ingredientsInRecipes',
	});
	return ingredientsInRecipes;
};