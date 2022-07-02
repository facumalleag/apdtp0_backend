'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class favorites extends Model {
		static associate(models) {

            favorites.belongsTo(models.recipes,
				{
					as: 'recipe',
					foreignKey: 'idRecipe'
				}
			);
			favorites.belongsTo(models.users,
				{
					as: 'user',
					foreignKey: 'idUser'
				}
			);
		}
	};
	favorites.init({
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
		customFavorite: {
            allowNull: true,
			type: DataTypes.STRING,
		},

	}, {
		sequelize,
		modelName: 'favorites',
	});
	return favorites;
};