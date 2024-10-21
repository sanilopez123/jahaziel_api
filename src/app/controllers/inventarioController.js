const Inventario = require('../models/inventario');
const Producto = require('../models/producto');

// Obtener todo el inventario
exports.getAllInventarios = async (_req, res) => {
  try {
    const inventarios = await Inventario.findAll({ include: [Producto] });
    res.json(inventarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un inventario por ID
exports.getInventarioById = async (req, res) => {
  try {
    const inventario = await Inventario.findByPk(req.params.id, { include: [Producto] });
    if (inventario) {
      res.json(inventario);
    } else {
      res.status(404).json({ error: 'Inventario no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear un nuevo inventario
exports.createInventario = async (req, res) => {
  try {
    const { id_producto } = req.body;
    const newInventario = await Inventario.create({ id_producto });
    res.status(201).json(newInventario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un inventario existente
exports.updateInventario = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_producto } = req.body;

    const inventario = await Inventario.findByPk(id);
    if (inventario) {
      inventario.id_producto = id_producto;

      await inventario.save();
      res.json(inventario);
    } else {
      res.status(404).json({ error: 'Inventario no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar un inventario
exports.deleteInventario = async (req, res) => {
  try {
    const { id } = req.params;
    const inventario = await Inventario.findByPk(id);

    if (inventario) {
      await inventario.destroy();
      res.json({ message: 'Inventario eliminado correctamente' });
    } else {
      res.status(404).json({ error: 'Inventario no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
