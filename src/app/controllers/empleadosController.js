const Empleado = require('../models/empleados');

// Obtener todos los empleados
exports.getAllEmpleados = async (_req, res) => {
  try {
    const empleados = await Empleado.findAll();
    res.json(empleados);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un empleado por ID
exports.getEmpleadoById = async (req, res) => {
  try {
    const empleado = await Empleado.findByPk(req.params.id);
    if (empleado) {
      res.json(empleado);
    } else {
      res.status(404).json({ error: 'Empleado no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear un nuevo empleado
exports.createEmpleado = async (req, res) => {
  try {
    const { nombres, apellidos, cargo, direccion, num_cel } = req.body;
    const newEmpleado = await Empleado.create({ nombres, apellidos, cargo, direccion, num_cel });
    res.status(201).json(newEmpleado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un empleado existente
exports.updateEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombres, apellidos, cargo, direccion, num_cel } = req.body;

    const empleado = await Empleado.findByPk(id);
    if (empleado) {
      empleado.nombres = nombres;
      empleado.apellidos = apellidos;
      empleado.cargo = cargo;
      empleado.direccion = direccion;
      empleado.num_cel = num_cel;

      await empleado.save();
      res.json(empleado);
    } else {
      res.status(404).json({ error: 'Empleado no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar un empleado
exports.deleteEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const empleado = await Empleado.findByPk(id);

    if (empleado) {
      await empleado.destroy();
      res.json({ message: 'Empleado eliminado correctamente' });
    } else {
      res.status(404).json({ error: 'Empleado no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
