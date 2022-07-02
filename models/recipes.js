'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class recipes extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			recipes.belongsTo(models.users,
				{
					as: 'user',
					foreignKey: 'idUser'
				}
			);
            recipes.belongsTo(models.difficulties,
				{
					as: 'difficulty',
					foreignKey: 'idDifficulty'
				}
			);
            recipes.belongsTo(models.categories,
				{
					as: 'category',
					foreignKey: 'idCategory'
				}
			);
            recipes.belongsTo(models.statuses,
				{
					as: 'status',
					foreignKey: 'idStatus'
				}
			);
			//recipes.hasMany(models.favorites);
		}
	};
	recipes.init({
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		idUser: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
        name: {
			allowNull: false,
			type: DataTypes.STRING,
		},
        description: {
			allowNull: false,
			type: DataTypes.STRING,
		},
        serving: {//porciones
			allowNull: false,
			type: DataTypes.INTEGER
		},
        servingPerPerson: {//cantitdad por perosnas
			allowNull: false,
			type: DataTypes.INTEGER
		},
        time: {//tiempo que abarca hacer la receta
			allowNull: false,
			type: DataTypes.INTEGER
		},
		idStatus: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
        idDifficulty: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
        idCategory: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
        isVegan: {
			allowNull: true,
			defaultValue: 0,
			type: DataTypes.CHAR
		},
        totalSteps: {
			allowNull: true,
			type: DataTypes.INTEGER
		},

        totalRating: {
			allowNull: true,
			defaultValue: 1,
			type: DataTypes.CHAR
		},
		createdAt: {
			allowNull: true,
			type: DataTypes.DATE
		},
		updatedAt: {
			allowNull: true,
			type: DataTypes.DATE
		}
	}, {
		sequelize,
		modelName: 'recipes',
	});
	return recipes;
};