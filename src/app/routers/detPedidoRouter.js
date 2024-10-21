const express = require('express');
const detPedidoController = require('../controllers/detPedidoController');

const router = express.Router();

router.get('/', detPedidoController.getAllDetPedidos);
router.get('/:id', detPedidoController.getDetPedidoById);
router.post('/', detPedidoController.createDetPedido);
router.put('/:id', detPedidoController.updateDetPedido);
router.delete('/:id', detPedidoController.deleteDetPedido);

module.exports = router;
