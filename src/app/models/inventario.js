const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');
const Producto = require('./producto');

const Inventario = sequelize.define('Inventario', {
  id_inventario: {
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
  }
}, {
  tableName: 'inventario',
  timestamps: false
});

module.exports = Inventario;
