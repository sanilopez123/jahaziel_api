const Producto = require('../models/producto');
const Categoria = require('../models/categorias');

// Obtener todos los productos
exports.getAllProductos = async (_req, res) => {
  try {
    const productos = await Producto.findAll({ include: [Categoria] });
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un producto por ID
exports.getProductoById = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id, { include: [Categoria] });
    if (producto) {
      res.json(producto);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear un nuevo producto
exports.createProducto = async (req, res) => {
  try {
    const { id_categoria, nombre_product, descripcion } = req.body;
    const newProducto = await Producto.create({ id_categoria, nombre_product, descripcion });
    res.status(201).json(newProducto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un producto existente
exports.updateProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_categoria, nombre_product, descripcion } = req.body;

    const producto = await Producto.findByPk(id);
    if (producto) {
      producto.id_categoria = id_categoria;
      producto.nombre_product = nombre_product;
      producto.descripcion = descripcion;

      await producto.save();
      res.json(producto);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar un producto
exports.deleteProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);

    if (producto) {
      await producto.destroy();
      res.json({ message: 'Producto eliminado correctamente' });
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
