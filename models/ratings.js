'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class ratings extends Model {
		static associate(models) {

            ratings.belongsTo(models.recipes,
				{
					as: 'recipe',
					foreignKey: 'idRecipe'
				}
			);
			ratings.belongsTo(models.users,
				{
					as: 'user',
					foreignKey: 'idUser'
				}
			);
		}
	};
	ratings.init({
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
		idUser: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
		rate: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
		comment: {
            allowNull: false,
			type: DataTypes.STRING,
		},

	}, {
		sequelize,
		modelName: 'ratings',
	});
	return ratings;
};