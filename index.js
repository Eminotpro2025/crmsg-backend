import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(cors());
app.use(express.json());

const ventas = [];

app.post('/venta', (req, res) => {
  const venta = { id: uuidv4(), ...req.body, fecha_venta: new Date().toISOString() };
  ventas.push(venta);
  res.json({ status: 'ok', venta });
});

app.get('/ventas', (req, res) => {
  res.json(ventas);
});

app.listen(process.env.PORT || 3000, () => {
  console.log('CRMSG backend corriendo');
});
