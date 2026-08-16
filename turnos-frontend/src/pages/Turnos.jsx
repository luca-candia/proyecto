import { useState, useEffect } from "react";
import clienteAxios from "../api/axios";

export default function Turnos() {
  const [turnos, setTurnos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [servicios, setServicios] = useState([]);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [datosFormulario, setDatosFormulario] = useState({
    cliente_id: "",
    servicio_id: "",
    fecha_hora: "",
  });

  const [turnoACompletar, setTurnoACompletar] = useState(null);
  const [notasVisita, setNotasVisita] = useState("");

  const cargarDatos = async () => {
    try {
      const [resTurnos, resClientes, resServicios] = await Promise.all([
        clienteAxios.get("/turnos"),
        clienteAxios.get("/clientes"),
        clienteAxios.get("/servicios"),
      ]);
      setTurnos(resTurnos.data);
      setClientes(resClientes.data);
      setServicios(resServicios.data);
    } catch (error) {
      console.error("Hubo un error al cargar los datos:", error);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleChange = (e) => {
    setDatosFormulario({
      ...datosFormulario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await clienteAxios.post("/turnos", datosFormulario);
      cargarDatos();
      setDatosFormulario({ cliente_id: "", servicio_id: "", fecha_hora: "" });
      setMostrarFormulario(false);
    } catch (error) {
      alert("Error: " + (error.response?.data?.error || "Algo salió mal"));
    }
  };

  const handleCompletarTurno = async () => {
    try {
      await clienteAxios.patch(`/turnos/${turnoACompletar.id}/completar`, {
        notas: notasVisita,
      });

      setTurnoACompletar(null);
      setNotasVisita("");
      cargarDatos();
    } catch (error) {
      alert("Error: " + (error.response?.data?.error || "Algo salió mal"));
    }
  };

  const tzOffset = new Date().getTimezoneOffset() * 60000;
  const hoy = new Date(Date.now() - tzOffset).toISOString().slice(0, 16);

  return (
    <div>
      {/* ENCABEZADO Y BOTÓN */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Agenda de Turnos</h2>
        <button
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          {mostrarFormulario ? "❌ Cancelar" : "➕ Nuevo Turno"}
        </button>
      </div>

      {/* FORMULARIO */}
      {mostrarFormulario && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md border-t-4 border-pink-500 mb-8 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                Cliente
              </label>
              <select
                name="cliente_id"
                value={datosFormulario.cliente_id}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-pink-500"
              >
                <option value="">-- Seleccionar --</option>
                {clientes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nombre_completo}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">
                Servicio
              </label>
              <select
                name="servicio_id"
                value={datosFormulario.servicio_id}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-pink-500"
              >
                <option value="">-- Seleccionar --</option>
                {servicios.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">
                Fecha y Hora
              </label>
              <input
                type="datetime-local"
                name="fecha_hora"
                value={datosFormulario.fecha_hora}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-pink-500"
                min={hoy}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition"
          >
            💾 Guardar Turno
          </button>
        </form>
      )}

      {/* TARJETAS DE TURNOS */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {turnos.map((turno) => (
          <div
            key={turno.id}
            className="bg-white p-5 rounded-xl shadow-md border-l-4 border-pink-500 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-lg text-gray-800">
                {turno.Cliente?.nombre_completo}
              </h3>
              <span className="bg-pink-100 text-pink-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                {turno.estado}
              </span>
            </div>
            <div className="space-y-2 mb-4">
              <p className="text-gray-600 flex items-center gap-2">
                <span>✂️</span> {turno.Servicio?.nombre}
              </p>
              <p className="text-gray-600 flex items-center gap-2">
                <span>📅</span>
                {new Date(turno.fecha_hora).toLocaleDateString("es-AR")} -{" "}
                {new Date(turno.fecha_hora).toLocaleTimeString("es-AR", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}{" "}
                hs
              </p>
            </div>
            <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
              <div>
                <span className="text-sm text-gray-500">Monto:</span>
                <span className="font-bold text-gray-800">
                  {turno.estado === "pendiente"
                    ? "A cobrar en el local"
                    : `$${turno.precio_cobrado}`}
                </span>
              </div>

              {/* Botón para modal */}
              {turno.estado === "pendiente" && (
                <button
                  onClick={() => setTurnoACompletar(turno)}
                  className="bg-green-500 hover:bg-green-600 text-white text-sm font-bold py-1 px-3 rounded shadow transition"
                >
                  ✅ Completar
                </button>
              )}
            </div>

            {/* Modal para completar turno */}
            {turnoACompletar && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full border-t-4 border-green-500">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Completar Turno
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Estás por cobrarle a{" "}
                    <strong>{turnoACompletar.Cliente.nombre_completo}</strong>{" "}
                    por el servicio de{" "}
                    <strong>{turnoACompletar.Servicio.nombre}</strong>.
                  </p>

                  <label className="block text-gray-700 font-bold mb-2">
                    Notas de la sesión (Opcional)
                  </label>
                  <textarea
                    rows="3"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-green-500 mb-4"
                    placeholder="Ej: Se aplicó tintura tono 7.1 con agua de 20 volúmenes..."
                    value={notasVisita}
                    onChange={(e) => setNotasVisita(e.target.value)}
                  ></textarea>

                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => {
                        setTurnoACompletar(null);
                        setNotasVisita("");
                      }}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded transition"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleCompletarTurno}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition"
                    >
                      Confirmar Cobro
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {turnos.length === 0 && (
          <p className="text-gray-500 col-span-full text-center py-8">
            No hay turnos agendados todavía.
          </p>
        )}
      </div>
    </div>
  );
}
