import express from 'express';
import cors from 'cors';
import sequelize from './config/database.js';
import 'dotenv/config';
import './models/associations.js';
import serviciosRoutes from './routes/serviciosRoutes.js';
import clientesRoutes from './routes/clientesRoutes.js';
import turnosRoutes from './routes/turnosRoutes.js';

const app = express();


app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'El Gestor de Turnos está vivo y conectado a PostgreSQL'
  });
});

app.use('/api/servicios', serviciosRoutes);

app.use('/api/clientes', clientesRoutes);

app.use('/api/turnos', turnosRoutes);

const PORT = process.env.PORT || 3000;

async function iniciarServidor() {
  try {
    await sequelize.sync({ force: false });
    console.log('📦 Base de datos sincronizada y tablas creadas con éxito.');
    
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error);
  }
}

iniciarServidor();