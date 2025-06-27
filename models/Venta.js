const mongoose = require('mongoose');

const ventaSchema = new mongoose.Schema({
  nombre_cliente: { type: String, required: true },
  curp: { type: String, required: true },
  nss: { type: String, required: true },
  monto: { type: Number, required: true },
  vendedor: { type: String, required: true },
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Venta', ventaSchema);
