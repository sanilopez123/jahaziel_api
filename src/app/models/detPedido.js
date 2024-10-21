const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');
const Pedido = require('./pedido');
const Producto = require('./producto');

const DetPedido = sequelize.define('DetPedido', {
  id_detalle: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_pedido: {
    type: DataTypes.INTEGER,
    references: {
      model: Pedido,
      key: 'id_pedido'
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
  prec_unit: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'det_pedido',
  timestamps: false
});

module.exports = DetPedido;
