const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');
const Producto = require('./producto');

const PrecioProducto = sequelize.define('PrecioProducto', {
  id_precio: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_producto: {
    type: DataTypes.INTEGER,
    references: {
      model: Producto,
      key: 'id_producto'
    }
  },
  tipo_precio: {
    type: DataTypes.ENUM('precio1', 'precio2'),
    allowNull: false
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'precios_producto',
  timestamps: false
});

module.exports = PrecioProducto;
