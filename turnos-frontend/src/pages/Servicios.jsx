import { useState, useEffect } from 'react';
import clienteAxios from '../api/axios';

export default function Servicios() {
  const [servicios, setServicios] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  
  const [datosFormulario, setDatosFormulario] = useState({
    nombre: '',
    duracion_minutos: '',
    precio_actual: ''
  });

  const cargarServicios = async () => {
    try {
      const respuesta = await clienteAxios.get('/servicios');
      setServicios(respuesta.data);
    } catch (error) {
      console.error("Hubo un error al traer los servicios:", error);
    }
  };

  useEffect(() => {
    cargarServicios();
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
      await clienteAxios.post('/servicios', datosFormulario);
      cargarServicios();
      setDatosFormulario({ nombre: '', duracion_minutos: '', precio_actual: '' });
      setMostrarFormulario(false);
    } catch (error) {
      alert("Error: " + (error.response?.data?.error || "Algo salió mal"));
    }
  };

  return (
    <div>
      {/* ENCABEZADO Y BOTÓN */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Servicios y Precios</h2>
        <button 
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          {mostrarFormulario ? '❌ Cancelar' : '➕ Nuevo Servicio'}
        </button>
      </div>

      {/* FORMULARIO */}
      {mostrarFormulario && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md border-t-4 border-pink-500 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2">Nombre del Servicio *</label>
              <input 
                type="text" name="nombre" value={datosFormulario.nombre} onChange={handleChange} required
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-pink-500"
                placeholder="Ej: Nutrición Capilar"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">Duración Aprox. (Minutos) *</label>
              <input 
                type="number" name="duracion_minutos" value={datosFormulario.duracion_minutos} onChange={handleChange} required
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-pink-500"
                placeholder="Ej: 45"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">Precio Actual ($) *</label>
              <input 
                type="number" name="precio_actual" value={datosFormulario.precio_actual} onChange={handleChange} required
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-pink-500"
                placeholder="Ej: 15000"
              />
            </div>
          </div>
          <button type="submit" className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition mt-4">
            💾 Guardar Servicio
          </button>
        </form>
      )}

      {/* TABLA DE SERVICIOS */}
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
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{servicio.nombre}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">⏱️ {servicio.duracion_minutos} min</td>
                <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-800">${servicio.precio_actual}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {servicios.length === 0 && (
          <p className="text-center py-8 text-gray-500">No hay servicios registrados todavía.</p>
        )}
      </div>
    </div>
  );
}