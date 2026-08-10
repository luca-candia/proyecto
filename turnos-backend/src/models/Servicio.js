import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Servicio = sequelize.define('Servicio', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  precio_actual: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  duracion_minutos: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'servicios',
  timestamps: false,
});

export default Servicio;