const Prestamo = require('../models/prestamos');
const Cliente = require('../models/clientes');
const Producto = require('../models/producto');

// Obtener todos los préstamos
exports.getAllPrestamos = async (_req, res) => {
  try {
    const prestamos = await Prestamo.findAll({
      include: [Cliente, Producto]
    });
    res.json(prestamos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un préstamo por ID
exports.getPrestamoById = async (req, res) => {
  try {
    const prestamo = await Prestamo.findByPk(req.params.id, {
      include: [Cliente, Producto]
    });
    if (prestamo) {
      res.json(prestamo);
    } else {
      res.status(404).json({ error: 'Préstamo no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear un nuevo préstamo
exports.createPrestamo = async (req, res) => {
  try {
    const { id_cliente, id_producto, cantidad, fech_prestamo, fech_devol } = req.body;
    const newPrestamo = await Prestamo.create({
      id_cliente,
      id_producto,
      cantidad,
      fech_prestamo,
      fech_devol
    });
    res.status(201).json(newPrestamo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un préstamo existente
exports.updatePrestamo = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_cliente, id_producto, cantidad, fech_prestamo, fech_devol } = req.body;

    const prestamo = await Prestamo.findByPk(id);
    if (prestamo) {
      prestamo.id_cliente = id_cliente;
      prestamo.id_producto = id_producto;
      prestamo.cantidad = cantidad;
      prestamo.fech_prestamo = fech_prestamo;
      prestamo.fech_devol = fech_devol;

      await prestamo.save();
      res.json(prestamo);
    } else {
      res.status(404).json({ error: 'Préstamo no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar un préstamo
exports.deletePrestamo = async (req, res) => {
  try {
    const { id } = req.params;
    const prestamo = await Prestamo.findByPk(id);

    if (prestamo) {
      await prestamo.destroy();
      res.json({ message: 'Préstamo eliminado correctamente' });
    } else {
      res.status(404).json({ error: 'Préstamo no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
