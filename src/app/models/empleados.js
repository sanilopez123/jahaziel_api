const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const Empleado = sequelize.define('Empleado', {
  id_empleado: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombres: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellidos: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cargo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  direccion: {
    type: DataTypes.STRING
  },
  num_cel: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'empleados',
  timestamps: false
});

module.exports = Empleado;
