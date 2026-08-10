import express from 'express';
import cors from 'cors';
import sequelize from './config/database.js';
import 'dotenv/config';
import './models/associations.js';

const app = express();


app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'El Gestor de Turnos está vivo y conectado a PostgreSQL'
  });
});

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