const express = require('express');
const empleadoController = require('../controllers/empleadosController');

const router = express.Router();

router.get('/', empleadoController.getAllEmpleados);
router.get('/:id', empleadoController.getEmpleadoById);
router.post('/', empleadoController.createEmpleado);
router.put('/:id', empleadoController.updateEmpleado);
router.delete('/:id', empleadoController.deleteEmpleado);

module.exports = router;
