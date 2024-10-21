const express = require('express');
const prestamoController = require('../controllers/prestamosController');

const router = express.Router();

router.get('/', prestamoController.getAllPrestamos);
router.get('/:id', prestamoController.getPrestamoById);
router.post('/', prestamoController.createPrestamo);
router.put('/:id', prestamoController.updatePrestamo);
router.delete('/:id', prestamoController.deletePrestamo);

module.exports = router;
