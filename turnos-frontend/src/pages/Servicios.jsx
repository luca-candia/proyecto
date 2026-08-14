import { useState, useEffect } from 'react';
import clienteAxios from '../api/axios';

export default function Servicios() {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    const obtenerServicios = async () => {
      try {
        const respuesta = await clienteAxios.get('/servicios');
        setServicios(respuesta.data);
      } catch (error) {
        console.error("Hubo un error al traer los servicios:", error);
      }
    };
    obtenerServicios();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Servicios y Precios</h2>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden border-t-4 border-pink-500">
        <table className="min-w-full divide-y divide-gray-200">  
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Servicio</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Duración</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Precio Actual</th>
            </tr>
          </thead>  
          <tbody className="bg-white divide-y divide-gray-200">
            {servicios.map((servicio) => (
              <tr key={servicio.id} className="hover:bg-pink-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                  {servicio.nombre}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                  ⏱️ {servicio.duracion_minutos} min
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-800">
                  ${servicio.precio_actual}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {servicios.length === 0 && (
          <p className="text-center py-8 text-gray-500">No hay servicios registrados.</p>
        )}
      </div>
    </div>
  );
}