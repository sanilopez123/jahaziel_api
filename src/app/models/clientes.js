const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');
const Categoria = require('./categorias');

const Cliente = sequelize.define('Cliente', {
  id_cliente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_categoria: {
    type: DataTypes.INTEGER,
    references: {
      model: Categoria,
      key: 'id_categoria'
    }
  },
  nombres: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellidos: {
    type: DataTypes.STRING,
    allowNull: false
  },
  direccion: {
    type: DataTypes.STRING
  },
  num_cel: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  fecha_registro: {
    type: DataTypes.DATE
  }
}, {
  tableName: 'clientes',
  timestamps: false
});

module.exports = Cliente;
