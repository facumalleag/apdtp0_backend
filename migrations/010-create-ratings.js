'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('ratings', {
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
			idUser: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: 'users',
					key: 'id'
				  }
				
			},
			rate: {
				allowNull: false,
				type: Sequelize.INTEGER
			},
			comment: {
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
		await queryInterface.dropTable('ratings');
	}
};