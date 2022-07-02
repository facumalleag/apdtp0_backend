'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('conversions', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			idMeasurementFrom: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: 'measurements',
					key: 'id'
				  }
			},
			idMeasurementTo: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: 'measurements',
					key: 'id'
				  }
			},
			conversionFactor: {
				allowNull: false,
				type: Sequelize.INTEGER,
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
		await queryInterface.dropTable('conversions');
	}
};