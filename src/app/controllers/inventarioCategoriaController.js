const InventarioCategoria = require('../models/inventarioCategoria');
const Inventario = require('../models/inventario');
const Categoria = require('../models/categorias');

// Obtener todo el inventario de categorías
exports.getAllInventarioCategorias = async (_req, res) => {
  try {
    const inventarioCategorias = await InventarioCategoria.findAll({
      include: [Inventario, Categoria]
    });
    res.json(inventarioCategorias);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un inventario de categoría por ID
exports.getInventarioCategoriaById = async (req, res) => {
  try {
    const inventarioCategoria = await InventarioCategoria.findByPk(req.params.id, {
      include: [Inventario, Categoria]
    });
    if (inventarioCategoria) {
      res.json(inventarioCategoria);
    } else {
      res.status(404).json({ error: 'Inventario de categoría no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear un nuevo inventario de categoría
exports.createInventarioCategoria = async (req, res) => {
  try {
    const { id_inventario, id_categoria, cantidad } = req.body;
    const newInventarioCategoria = await InventarioCategoria.create({ id_inventario, id_categoria, cantidad });
    res.status(201).json(newInventarioCategoria);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un inventario de categoría existente
exports.updateInventarioCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_inventario, id_categoria, cantidad } = req.body;

    const inventarioCategoria = await InventarioCategoria.findByPk(id);
    if (inventarioCategoria) {
      inventarioCategoria.id_inventario = id_inventario;
      inventarioCategoria.id_categoria = id_categoria;
      inventarioCategoria.cantidad = cantidad;

      await inventarioCategoria.save();
      res.json(inventarioCategoria);
    } else {
      res.status(404).json({ error: 'Inventario de categoría no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar un inventario de categoría
exports.deleteInventarioCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const inventarioCategoria = await InventarioCategoria.findByPk(id);

    if (inventarioCategoria) {
      await inventarioCategoria.destroy();
      res.json({ message: 'Inventario de categoría eliminado correctamente' });
    } else {
      res.status(404).json({ error: 'Inventario de categoría no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
