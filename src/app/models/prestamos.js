const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');
const Cliente = require('./clientes');
const Producto = require('./producto');

const Prestamo = sequelize.define('Prestamo', {
  id_prestamo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_cliente: {
    type: DataTypes.INTEGER,
    references: {
      model: Cliente,
      key: 'id_cliente'
    }
  },
  id_producto: {
    type: DataTypes.INTEGER,
    references: {
      model: Producto,
      key: 'id_producto'
    }
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fech_prestamo: {
    type: DataTypes.DATE
  },
  fech_devol: {
    type: DataTypes.DATE
  }
}, {
  tableName: 'prestamos',
  timestamps: false
});

module.exports = Prestamo;
