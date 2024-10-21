const express = require('express');
const inventarioCategoriaController = require('../controllers/inventarioCategoriaController');

const router = express.Router();

router.get('/', inventarioCategoriaController.getAllInventarioCategorias);
router.get('/:id', inventarioCategoriaController.getInventarioCategoriaById);
router.post('/', inventarioCategoriaController.createInventarioCategoria);
router.put('/:id', inventarioCategoriaController.updateInventarioCategoria);
router.delete('/:id', inventarioCategoriaController.deleteInventarioCategoria);

module.exports = router;
