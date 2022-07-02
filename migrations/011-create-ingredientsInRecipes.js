'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('ingredientsInRecipes', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			idRecipe: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: 'recipes',
					key: 'id'
				  }
			},
			idIngredient: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: 'ingredients',
					key: 'id'
				  }
			},
			idMeasurement: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: 'measurements',
					key: 'id'
				  }
			},
			cantidad: {
				allowNull: false,
				type: Sequelize.INTEGER
			},
			description: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
	
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('ingredientsInRecipes');
	}
};