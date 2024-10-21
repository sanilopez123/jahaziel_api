const Cliente = require('../models/clientes');
const Categoria = require('../models/categorias');

// Obtener todos los clientes
exports.getAllClientes = async (_req, res) => {
  try {
    const clientes = await Cliente.findAll({ include: [Categoria] });
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un cliente por ID
exports.getClienteById = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id, { include: [Categoria] });
    if (cliente) {
      res.json(cliente);
    } else {
      res.status(404).json({ error: 'Cliente no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear un nuevo cliente
exports.createCliente = async (req, res) => {
  try {
    const { id_categoria, nombres, apellidos, direccion, num_cel, email, fecha_registro } = req.body;
    const newCliente = await Cliente.create({ id_categoria, nombres, apellidos, direccion, num_cel, email, fecha_registro });
    res.status(201).json(newCliente);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un cliente existente
exports.updateCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_categoria, nombres, apellidos, direccion, num_cel, email, fecha_registro } = req.body;

    const cliente = await Cliente.findByPk(id);
    if (cliente) {
      cliente.id_categoria = id_categoria;
      cliente.nombres = nombres;
      cliente.apellidos = apellidos;
      cliente.direccion = direccion;
      cliente.num_cel = num_cel;
      cliente.email = email;
      cliente.fecha_registro = fecha_registro;

      await cliente.save();
      res.json(cliente);
    } else {
      res.status(404).json({ error: 'Cliente no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar un cliente
exports.deleteCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await Cliente.findByPk(id);

    if (cliente) {
      await cliente.destroy();
      res.json({ message: 'Cliente eliminado correctamente' });
    } else {
      res.status(404).json({ error: 'Cliente no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
