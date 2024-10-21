const DetPedido = require('../models/detPedido');
const Pedido = require('../models/pedido');
const Producto = require('../models/producto');

// Obtener todos los detalles de pedido
exports.getAllDetPedidos = async (_req, res) => {
  try {
    const detPedidos = await DetPedido.findAll({
      include: [Pedido, Producto]
    });
    res.json(detPedidos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un detalle de pedido por ID
exports.getDetPedidoById = async (req, res) => {
  try {
    const detPedido = await DetPedido.findByPk(req.params.id, {
      include: [Pedido, Producto]
    });
    if (detPedido) {
      res.json(detPedido);
    } else {
      res.status(404).json({ error: 'Detalle de pedido no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear un nuevo detalle de pedido
exports.createDetPedido = async (req, res) => {
  try {
    const { id_pedido, id_producto, cantidad, prec_unit } = req.body;
    const newDetPedido = await DetPedido.create({ id_pedido, id_producto, cantidad, prec_unit });
    res.status(201).json(newDetPedido);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un detalle de pedido existente
exports.updateDetPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_pedido, id_producto, cantidad, prec_unit } = req.body;

    const detPedido = await DetPedido.findByPk(id);
    if (detPedido) {
      detPedido.id_pedido = id_pedido;
      detPedido.id_producto = id_producto;
      detPedido.cantidad = cantidad;
      detPedido.prec_unit = prec_unit;

      await detPedido.save();
      res.json(detPedido);
    } else {
      res.status(404).json({ error: 'Detalle de pedido no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar un detalle de pedido
exports.deleteDetPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const detPedido = await DetPedido.findByPk(id);

    if (detPedido) {
      await detPedido.destroy();
      res.json({ message: 'Detalle de pedido eliminado correctamente' });
    } else {
      res.status(404).json({ error: 'Detalle de pedido no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
