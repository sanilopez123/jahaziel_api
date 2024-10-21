const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');
const Inventario = require('./inventario');
const Producto = require('./producto');

const InventarioDetalle = sequelize.define('InventarioDetalle', {
  id_detalle: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_inventario: {
    type: DataTypes.INTEGER,
    references: {
      model: Inventario,
      key: 'id_inventario'
    }
  },
  id_producto: {
    type: DataTypes.INTEGER,
    references: {
      model: Producto,
      key: 'id_producto'
    }
  },
  tipo: {
    type: DataTypes.ENUM('tipo1', 'tipo2'),
    allowNull: false
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'inventario_detalle',
  timestamps: false
});

module.exports = InventarioDetalle;
