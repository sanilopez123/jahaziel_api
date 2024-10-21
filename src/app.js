const express = require('express');
const sequelize = require('./app/db/sequelize');
const Categoria = require('./app/models/categorias');
const Cliente = require('./app/models/clientes');
const Producto = require('./app/models/producto');
const PrecioProducto = require('./app/models/preciosProducto');
const Inventario = require('./app/models/inventario');
const InventarioCategoria = require('./app/models/inventarioCategoria');
const Empleado = require('./app/models/empleados');
const Usuario = require('./app/models/usuario');
const Pedido = require('./app/models/pedido');
const DetPedido = require('./app/models/detPedido');
const Prestamo = require('./app/models/prestamos');
const InventarioDetalle = require('./app/models/inventarioDetalle');
const cors = require('cors');

// Rutas
const categoriaRouter = require('./app/routers/categoriasRouter');
const clienteRouter = require('./app/routers/clientesRouter');
const productoRouter = require('./app/routers/productoRouter');
const preciosProductoRouter = require('./app/routers/preciosProductoRouter');
const inventarioRouter = require('./app/routers/inventarioRouter');
const inventarioCategoriaRouter = require('./app/routers/inventarioCategoriaRouter');
const empleadosRouter = require('./app/routers/empleadosRouter');
const usuarioRouter = require('./app/routers/usuarioRouter');
const pedidoRouter = require('./app/routers/pedidoRouter');
const detPedidoRouter = require('./app/routers/detPedidoRouter');
const prestamoRouter = require('./app/routers/prestamosRouter');
const inventarioDetalleRouter = require('./app/routers/inventarioDetalleRouter');

const app = express();

// Definición de relaciones
Producto.belongsTo(Categoria, { foreignKey: 'id_categoria' });
Categoria.hasMany(Producto, { foreignKey: 'id_categoria' });

Cliente.belongsTo(Categoria, { foreignKey: 'id_categoria' });
Categoria.hasMany(Cliente, { foreignKey: 'id_categoria' });

Pedido.belongsTo(Cliente, { foreignKey: 'id_cliente' });
Cliente.hasMany(Pedido, { foreignKey: 'id_cliente' });

Pedido.belongsTo(Empleado, { foreignKey: 'id_empleado' });
Empleado.hasMany(Pedido, { foreignKey: 'id_empleado' });

DetPedido.belongsTo(Pedido, { foreignKey: 'id_pedido' });
Pedido.hasMany(DetPedido, { foreignKey: 'id_pedido' });

DetPedido.belongsTo(Producto, { foreignKey: 'id_producto' });
Producto.hasMany(DetPedido, { foreignKey: 'id_producto' });

Prestamo.belongsTo(Cliente, { foreignKey: 'id_cliente' });
Cliente.hasMany(Prestamo, { foreignKey: 'id_cliente' });

Prestamo.belongsTo(Producto, { foreignKey: 'id_producto' });
Producto.hasMany(Prestamo, { foreignKey: 'id_producto' });

// Configuración de middleware
app.use(cors());
app.use(express.json());

// Rutas API
app.use('/api/v1/categorias', categoriaRouter);
app.use('/api/v1/clientes', clienteRouter);
app.use('/api/v1/productos', productoRouter);
app.use('/api/v1/precios-productos', preciosProductoRouter);
app.use('/api/v1/inventarios', inventarioRouter);
app.use('/api/v1/inventario-categorias', inventarioCategoriaRouter);
app.use('/api/v1/empleados', empleadosRouter);
app.use('/api/v1/usuarios', usuarioRouter);
app.use('/api/v1/pedidos', pedidoRouter);
app.use('/api/v1/det-pedidos', detPedidoRouter);
app.use('/api/v1/prestamos', prestamoRouter);
app.use('/api/v1/inventario-detalles', inventarioDetalleRouter);

// Ruta principal
app.get('/', (_req, res) => {
  res.send('Servidor Corriendo!!!');
});

// Sincronizar los modelos con la base de datos
sequelize.sync({ force: false })
  .then(() => {
    console.log('Tablas sincronizadas con la base de datos.');
  })
  .catch((error) => {
    console.error('Error sincronizando las tablas:', error);
  });

module.exports = app;
