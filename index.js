import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas (desde tu variable de entorno en Render)
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => console.error('❌ Error de conexión a MongoDB:', err));

// Modelo de venta
const ventaSchema = new mongoose.Schema({
  id: String,
  nombreAgente: String,
  nombreCliente: String,
  curp: String,
  nss: String,
  fechaNacimiento: String,
  fecha_venta: String
});

const Venta = mongoose.model('Venta', ventaSchema);

// Ruta para registrar una venta
app.post('/venta', async (req, res) => {
  try {
    const venta = new Venta({
      id: uuidv4(),
      ...req.body,
      fecha_venta: new Date().toISOString()
    });

    await venta.save();
    res.status(201).json({ status: 'ok', venta });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Ruta para obtener todas las ventas
app.get('/ventas', async (req, res) => {
  try {
    const ventas = await Venta.find();
    res.json(ventas);
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Iniciar servidor
app.listen(process.env.PORT || 3000, () => {
  console.log('🚀 Backend CRMSG corriendo');
});
// Ruta de prueba para verificar que el servidor responde
app.get('/test', (req, res) => {
  res.json({ message: 'La API está viva y conectada correctamente' });
});
