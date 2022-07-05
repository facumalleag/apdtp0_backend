'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class multimedia extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			multimedia.belongsTo(models.steps,
                    {
                        as: 'steps',
                        foreignKey: 'idStep'
                    }
                );
            
		}
	};
	multimedia.init({
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
        idStep: {
			allowNull: false,
			type: DataTypes.INTEGER,
		},
        tipo_contenido: {
			allowNull: true,
			type: DataTypes.STRING,
		},
        extension: {
			allowNull: false,
			type: DataTypes.STRING,
		},
        url: {
			allowNull: false,
			type: DataTypes.STRING,
		},

		
	}, {
		sequelize,
		modelName: 'multimedia',
	});
	return multimedia;
};