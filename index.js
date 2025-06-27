import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import ventasRoutes from './routes/ventas.js';

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => console.error('❌ Error de conexión a MongoDB:', err));

// Rutas
app.use('/ventas', ventasRoutes);

// Ruta de prueba
app.get('/test', (req, res) => {
  res.json({ message: 'La API está viva y conectada correctamente' });
});

// Iniciar servidor
app.listen(process.env.PORT || 3000, () => {
  console.log('🚀 Backend CRMSG corriendo');
});

