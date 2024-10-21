const Usuario = require('../models/usuario');
const Empleado = require('../models/empleados');

// Obtener todos los usuarios
exports.getAllUsuarios = async (_req, res) => {
  try {
    const usuarios = await Usuario.findAll({ include: [Empleado] });
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un usuario por ID
exports.getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id, { include: [Empleado] });
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear un nuevo usuario
exports.createUsuario = async (req, res) => {
  try {
    const { id_empleado, usuario, contraseña, acceso } = req.body;
    const newUsuario = await Usuario.create({ id_empleado, usuario, contraseña, acceso });
    res.status(201).json(newUsuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un usuario existente
exports.updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_empleado, usuario: nombreUsuario, contraseña, acceso } = req.body; // Cambiamos el nombre a nombreUsuario

    const usuario = await Usuario.findByPk(id);
    if (usuario) {
      usuario.id_empleado = id_empleado;
      usuario.usuario = nombreUsuario; // Usamos nombreUsuario
      usuario.contraseña = contraseña;
      usuario.acceso = acceso;

      await usuario.save();
      res.json(usuario);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar un usuario
exports.deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (usuario) {
      await usuario.destroy();
      res.json({ message: 'Usuario eliminado correctamente' });
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
