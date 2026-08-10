import Cliente from './Cliente.js';
import Servicio from './Servicio.js';
import Turno from './Turno.js';

Cliente.hasMany(Turno, { foreignKey: 'cliente_id' });
Turno.belongsTo(Cliente, { foreignKey: 'cliente_id' });

Servicio.hasMany(Turno, { foreignKey: 'servicio_id' });
Turno.belongsTo(Servicio, { foreignKey: 'servicio_id' });

export { Cliente, Servicio, Turno };