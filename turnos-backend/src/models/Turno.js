import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Turno = sequelize.define('Turno', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fecha_hora: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'completado', 'cancelado'),
    defaultValue: 'pendiente',
    allowNull: false,
  },
  precio_cobrado: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  notas_visita: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
}, {
  tableName: 'turnos',
  timestamps: true,
});

export default Turno;