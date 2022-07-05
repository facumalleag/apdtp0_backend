'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('photos', {
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
			url: {
				allowNull: false,
				type: Sequelize.STRING
			},
	
			extension: {
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
		await queryInterface.dropTable('photos');
	}
};