const Categoria = require('../models/categorias');

// Obtener todas las categorías
exports.getAllCategorias = async (_req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.json(categorias);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener una categoría por ID
exports.getCategoriaById = async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id);
    if (categoria) {
      res.json(categoria);
    } else {
      res.status(404).json({ error: 'Categoría no encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear una nueva categoría
exports.createCategoria = async (req, res) => {
  try {
    const { tipo, capacidad } = req.body;
    const newCategoria = await Categoria.create({ tipo, capacidad });
    res.status(201).json(newCategoria);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar una categoría existente
exports.updateCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { tipo, capacidad } = req.body;

    const categoria = await Categoria.findByPk(id);
    if (categoria) {
      categoria.tipo = tipo;
      categoria.capacidad = capacidad;

      await categoria.save();
      res.json(categoria);
    } else {
      res.status(404).json({ error: 'Categoría no encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar una categoría
exports.deleteCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = await Categoria.findByPk(id);

    if (categoria) {
      await categoria.destroy();
      res.json({ message: 'Categoría eliminada correctamente' });
    } else {
      res.status(404).json({ error: 'Categoría no encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
