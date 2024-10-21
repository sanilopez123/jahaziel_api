const express = require('express');
const inventarioController = require('../controllers/inventarioController');

const router = express.Router();

router.get('/', inventarioController.getAllInventarios);
router.get('/:id', inventarioController.getInventarioById);
router.post('/', inventarioController.createInventario);
router.put('/:id', inventarioController.updateInventario);
router.delete('/:id', inventarioController.deleteInventario);

module.exports = router;
