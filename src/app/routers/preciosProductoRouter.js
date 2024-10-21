const express = require('express');
const preciosProductoController = require('../controllers/preciosProductoController'); // Asegúrate de que esta ruta sea correcta

const router = express.Router();

router.get('/', preciosProductoController.getAllPreciosProductos); // Cambiado aquí
router.get('/:id', preciosProductoController.getPrecioProductoById); // Cambiado aquí
router.post('/', preciosProductoController.createPrecioProducto); // Cambiado aquí
router.put('/:id', preciosProductoController.updatePrecioProducto); // Cambiado aquí
router.delete('/:id', preciosProductoController.deletePrecioProducto); // Cambiado aquí

module.exports = router;
