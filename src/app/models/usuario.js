const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');
const Empleado = require('./empleados');

const Usuario = sequelize.define('Usuario', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_empleado: {
    type: DataTypes.INTEGER,
    references: {
      model: Empleado,
      key: 'id_empleado'
    }
  },
  usuario: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contraseña: {
    type: DataTypes.STRING,
    allowNull: false
  },
  acceso: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  tableName: 'usuario',
  timestamps: false
});

module.exports = Usuario;
