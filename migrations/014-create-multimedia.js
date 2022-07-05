'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('multimedia', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			idStep: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: 'steps',
					key: 'id'
				  }
			},
			tipo_contenido: {
				allowNull: false,
				type: Sequelize.STRING
			},
	
			extension: {
				allowNull: false,
				type: Sequelize.STRING,
			},
            	
			url: {
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
		await queryInterface.dropTable('multimedia');
	}
};