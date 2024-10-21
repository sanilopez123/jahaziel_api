const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');
const Cliente = require('./clientes');
const Empleado = require('./empleados');
const Categoria = require('./categorias');

const Pedido = sequelize.define('Pedido', {
  id_pedido: {
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
  id_empleado: {
    type: DataTypes.INTEGER,
    references: {
      model: Empleado,
      key: 'id_empleado'
    }
  },
  id_categoria: {
    type: DataTypes.INTEGER,
    references: {
      model: Categoria,
      key: 'id_categoria'
    }
  },
  direccion_entrega: {
    type: DataTypes.STRING
  },
  fecha_pedido: {
    type: DataTypes.DATE
  },
  tipo_pedido: {
    type: DataTypes.ENUM('tipo1', 'tipo2'),
    allowNull: false
  },
  estado_pedido: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'pedido',
  timestamps: false
});

module.exports = Pedido;
