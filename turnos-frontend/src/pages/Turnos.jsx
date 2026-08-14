import { useState, useEffect } from 'react';
import clienteAxios from '../api/axios';

export default function Turnos() {
  const [turnos, setTurnos] = useState([]);

  useEffect(() => {
    const obtenerTurnos = async () => {
      try {
        const respuesta = await clienteAxios.get('/turnos');
        setTurnos(respuesta.data);
        
        console.log("Datos recibidos desde PostgreSQL", respuesta.data);
      } catch (error) {
        console.error("Hubo un error al traer los turnos:", error);
      }
    };

    obtenerTurnos();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Agenda de Turnos</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        
        {turnos.map((turno) => (
          <div key={turno.id} className="bg-white p-5 rounded-xl shadow-md border-l-4 border-pink-500 hover:shadow-lg transition">

            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-lg text-gray-800">
                {turno.Cliente.nombre_completo}
              </h3>
              <span className="bg-pink-100 text-pink-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                {turno.estado}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <p className="text-gray-600 flex items-center gap-2">
                <span>✂️</span> {turno.Servicio.nombre}
              </p>
              <p className="text-gray-600 flex items-center gap-2">
                <span>📅</span> {new Date(turno.fecha_hora).toLocaleDateString("es-AR")} - {new Date(turno.fecha_hora).toLocaleTimeString("es-AR", { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>

            <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
              <span className="text-sm text-gray-500">Monto:</span>
              <span className="font-bold text-gray-800">
                {turno.estado === 'pendiente' 
                  ? 'A cobrar en el local' 
                  : `$${turno.precio_cobrado}`
                }
              </span>
            </div>

          </div>
        ))}

        {turnos.length === 0 && (
          <p className="text-gray-500 col-span-full text-center py-8">
            No hay turnos agendados.
          </p>
        )}

      </div>
    </div>
  );
}