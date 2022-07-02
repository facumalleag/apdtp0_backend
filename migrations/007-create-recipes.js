'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('recipes', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			idUser: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: 'users',
					key: 'id'
				  }
			},
			idStatus: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: 'statuses',
					key: 'id'
				  }
			},
			idDifficulty: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: 'difficulties',
					key: 'id'
				  }
			},
			idCategory: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: 'categories',
					key: 'id'
				  }
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			description: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			serving: {//porciones
				allowNull: false,
				type: Sequelize.INTEGER
			},
			servingPerPerson: {//cantitdad por perosnas
				allowNull: false,
				type: Sequelize.INTEGER
			},
			time: {//tiempo que abarca hacer la receta
				allowNull: false,
				type: Sequelize.INTEGER
			},
			isVegan: {
				allowNull: true,
				defaultValue: 0,
				type: Sequelize.CHAR
			},
			totalSteps: {
				allowNull: true,
				type: Sequelize.INTEGER
			},
	
			totalRating: {
				allowNull: true,
				defaultValue: 1,
				type: Sequelize.CHAR
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
		await queryInterface.dropTable('recipes');
	}
};