
const PrecioProducto = require('../models/preciosProducto');
const Producto = require('../models/producto');

// Obtener todos los precios de productos
exports.getAllPreciosProductos = async (_req, res) => {
  try {
    const preciosProductos = await PrecioProducto.findAll({ include: [Producto] });
    res.json(preciosProductos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un precio de producto por ID
exports.getPrecioProductoById = async (req, res) => {
  try {
    const precioProducto = await PrecioProducto.findByPk(req.params.id, { include: [Producto] });
    if (precioProducto) {
      res.json(precioProducto);
    } else {
      res.status(404).json({ error: 'Precio de producto no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear un nuevo precio de producto
exports.createPrecioProducto = async (req, res) => {
  try {
    const { id_producto, tipo_precio, precio } = req.body;
    const newPrecioProducto = await PrecioProducto.create({ id_producto, tipo_precio, precio });
    res.status(201).json(newPrecioProducto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un precio de producto existente
exports.updatePrecioProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_producto, tipo_precio, precio } = req.body;

    const precioProducto = await PrecioProducto.findByPk(id);
    if (precioProducto) {
      precioProducto.id_producto = id_producto;
      precioProducto.tipo_precio = tipo_precio;
      precioProducto.precio = precio;

      await precioProducto.save();
      res.json(precioProducto);
    } else {
      res.status(404).json({ error: 'Precio de producto no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar un precio de producto
exports.deletePrecioProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const precioProducto = await PrecioProducto.findByPk(id);

    if (precioProducto) {
      await precioProducto.destroy();
      res.json({ message: 'Precio de producto eliminado correctamente' });
    } else {
      res.status(404).json({ error: 'Precio de producto no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


