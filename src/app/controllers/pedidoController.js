const Pedido = require('../models/pedido');
const Cliente = require('../models/clientes');
const Empleado = require('../models/empleados');
const Categoria = require('../models/categorias');

// Obtener todos los pedidos
exports.getAllPedidos = async (_req, res) => {
  try {
    const pedidos = await Pedido.findAll({
      include: [Cliente, Empleado, Categoria]
    });
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un pedido por ID
exports.getPedidoById = async (req, res) => {
  try {
    const pedido = await Pedido.findByPk(req.params.id, {
      include: [Cliente, Empleado, Categoria]
    });
    if (pedido) {
      res.json(pedido);
    } else {
      res.status(404).json({ error: 'Pedido no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear un nuevo pedido
exports.createPedido = async (req, res) => {
  try {
    const { id_cliente, id_empleado, id_categoria, direccion_entrega, fecha_pedido, tipo_pedido, estado_pedido } = req.body;
    const newPedido = await Pedido.create({ id_cliente, id_empleado, id_categoria, direccion_entrega, fecha_pedido, tipo_pedido, estado_pedido });
    res.status(201).json(newPedido);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un pedido existente
exports.updatePedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_cliente, id_empleado, id_categoria, direccion_entrega, fecha_pedido, tipo_pedido, estado_pedido } = req.body;

    const pedido = await Pedido.findByPk(id);
    if (pedido) {
      pedido.id_cliente = id_cliente;
      pedido.id_empleado = id_empleado;
      pedido.id_categoria = id_categoria;
      pedido.direccion_entrega = direccion_entrega;
      pedido.fecha_pedido = fecha_pedido;
      pedido.tipo_pedido = tipo_pedido;
      pedido.estado_pedido = estado_pedido;

      await pedido.save();
      res.json(pedido);
    } else {
      res.status(404).json({ error: 'Pedido no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar un pedido
exports.deletePedido = async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await Pedido.findByPk(id);

    if (pedido) {
      await pedido.destroy();
      res.json({ message: 'Pedido eliminado correctamente' });
    } else {
      res.status(404).json({ error: 'Pedido no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
