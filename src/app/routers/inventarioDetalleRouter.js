const express = require('express');
const inventarioDetalleController = require('../controllers/inventarioDetalleController');

const router = express.Router();

router.get('/', inventarioDetalleController.getAllInventarioDetalles);
router.get('/:id', inventarioDetalleController.getInventarioDetalleById);
router.post('/', inventarioDetalleController.createInventarioDetalle);
router.put('/:id', inventarioDetalleController.updateInventarioDetalle);
router.delete('/:id', inventarioDetalleController.deleteInventarioDetalle);

module.exports = router;
