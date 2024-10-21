const InventarioDetalle = require('../models/inventarioDetalle');
const Inventario = require('../models/inventario');
const Producto = require('../models/producto');

// Obtener todo el detalle del inventario
exports.getAllInventarioDetalles = async (_req, res) => {
  try {
    const inventarioDetalles = await InventarioDetalle.findAll({
      include: [Inventario, Producto]
    });
    res.json(inventarioDetalles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un detalle del inventario por ID
exports.getInventarioDetalleById = async (req, res) => {
  try {
    const inventarioDetalle = await InventarioDetalle.findByPk(req.params.id, {
      include: [Inventario, Producto]
    });
    if (inventarioDetalle) {
      res.json(inventarioDetalle);
    } else {
      res.status(404).json({ error: 'Detalle de inventario no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear un nuevo detalle de inventario
exports.createInventarioDetalle = async (req, res) => {
  try {
    const { id_inventario, id_producto, tipo, cantidad } = req.body;
    const newInventarioDetalle = await InventarioDetalle.create({ id_inventario, id_producto, tipo, cantidad });
    res.status(201).json(newInventarioDetalle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un detalle de inventario existente
exports.updateInventarioDetalle = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_inventario, id_producto, tipo, cantidad } = req.body;

    const inventarioDetalle = await InventarioDetalle.findByPk(id);
    if (inventarioDetalle) {
      inventarioDetalle.id_inventario = id_inventario;
      inventarioDetalle.id_producto = id_producto;
      inventarioDetalle.tipo = tipo;
      inventarioDetalle.cantidad = cantidad;

      await inventarioDetalle.save();
      res.json(inventarioDetalle);
    } else {
      res.status(404).json({ error: 'Detalle de inventario no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar un detalle de inventario
exports.deleteInventarioDetalle = async (req, res) => {
  try {
    const { id } = req.params;
    const inventarioDetalle = await InventarioDetalle.findByPk(id);

    if (inventarioDetalle) {
      await inventarioDetalle.destroy();
      res.json({ message: 'Detalle de inventario eliminado correctamente' });
    } else {
      res.status(404).json({ error: 'Detalle de inventario no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
