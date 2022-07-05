'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class photo extends Model {
		static associate(models) {

            photo.belongsTo(models.recipes,
				{
					as: 'recipe',
					foreignKey: 'idRecipe'
				}
			);
		}
	};
	photo.init({
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
        url: {
			allowNull: false,
			type: DataTypes.STRING
		},

		extension: {
            allowNull: false,
			type: DataTypes.STRING,
		},

	}, {
		sequelize,
		modelName: 'photo',
	});
	return photo;
};