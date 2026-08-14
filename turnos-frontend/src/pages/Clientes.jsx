import { useState, useEffect } from 'react';
import clienteAxios from '../api/axios';

export default function Clientes() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        const respuesta = await clienteAxios.get('/clientes');
        setClientes(respuesta.data);
      } catch (error) {
        console.error("Hubo un error al traer los clientes:", error);
      }
    };
    obtenerClientes();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Mis Clientes</h2>
    
      <div className="bg-white rounded-xl shadow-md overflow-hidden border-t-4 border-pink-500">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Nombre Completo</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Teléfono</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Notas</th>
            </tr>
          </thead>    
          <tbody className="bg-white divide-y divide-gray-200">
            {clientes.map((cliente) => (
              <tr key={cliente.id} className="hover:bg-pink-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                  {cliente.nombre_completo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                  {cliente.telefono || '-'}
                </td>
                <td className="px-6 py-4 text-gray-600 text-sm">
                  {cliente.notas || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {clientes.length === 0 && (
          <p className="text-center py-8 text-gray-500">No hay clientes registrados.</p>
        )}
      </div>
    </div>
  );
}