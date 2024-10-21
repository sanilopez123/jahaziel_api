const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');
const Inventario = require('./inventario');
const Categoria = require('./categorias');

const InventarioCategoria = sequelize.define('InventarioCategoria', {
  id_invent_categ: {
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
  id_categoria: {
    type: DataTypes.INTEGER,
    references: {
      model: Categoria,
      key: 'id_categoria'
    }
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'inventario_categoria',
  timestamps: false
});

module.exports = InventarioCategoria;
