import { useState, useEffect } from 'react';
import clienteAxios from '../api/axios';

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  
  const [datosFormulario, setDatosFormulario] = useState({
    nombre_completo: '',
    telefono: '',
    notas: ''
  });

  const cargarClientes = async () => {
    try {
      const respuesta = await clienteAxios.get('/clientes');
      setClientes(respuesta.data);
    } catch (error) {
      console.error("Hubo un error al traer los clientes:", error);
    }
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  const handleChange = (e) => {
    setDatosFormulario({
      ...datosFormulario,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await clienteAxios.post('/clientes', datosFormulario);
      cargarClientes();
      setDatosFormulario({ nombre_completo: '', telefono: '', notas: '' });
      setMostrarFormulario(false);
    } catch (error) {
      alert("Error: " + (error.response?.data?.error || "Algo salió mal"));
    }
  };

  return (
    <div>
      {/* ENCABEZADO Y BOTÓN */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Mis Clientes</h2>
        <button 
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          {mostrarFormulario ? '❌ Cancelar' : '➕ Nuevo Cliente'}
        </button>
      </div>

      {/* FORMULARIO */}
      {mostrarFormulario && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md border-t-4 border-pink-500 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2">Nombre Completo *</label>
              <input 
                type="text" name="nombre_completo" value={datosFormulario.nombre_completo} onChange={handleChange} required
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-pink-500"
                placeholder="Ej: María López"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">Teléfono (Opcional)</label>
              <input 
                type="tel" name="telefono" value={datosFormulario.telefono} onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-pink-500"
                placeholder="Ej: 3512345678"
                pattern="[0-9]*"
                /* futuro fix: type="tel" y pattern="[0-9]*" contradictorios con el backend que espera type="text" */
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">Notas (Opcional)</label>
              <input 
                type="text" name="notas" value={datosFormulario.notas} onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-pink-500"
                placeholder="Ej: Alergia a tintura X"
              />
            </div>
          </div>
          <button type="submit" className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition mt-4">
            💾 Guardar Cliente
          </button>
        </form>
      )}

      {/* TABLA DE CLIENTES */}
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
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{cliente.nombre_completo}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{cliente.telefono || '-'}</td>
                <td className="px-6 py-4 text-gray-600 text-sm">{cliente.notas || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {clientes.length === 0 && (
          <p className="text-center py-8 text-gray-500">No hay clientes registrados todavía.</p>
        )}
      </div>
    </div>
  );
}