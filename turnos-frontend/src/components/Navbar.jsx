import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-pink-600 shadow-lg border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-col">
            <span className="font-bold text-white text-2xl italic tracking-wider">
              Piu Bella
            </span>
          </div>
          
          <div className="flex space-x-4 font-medium">
            <Link to="/" className="text-white hover:bg-red-800 hover:text-gray-200 px-3 py-2 rounded-md transition duration-300">
              Turnos
            </Link>
            <Link to="/clientes" className="text-white hover:bg-red-800 hover:text-gray-200 px-3 py-2 rounded-md transition duration-300">
              Clientes
            </Link>
            <Link to="/servicios" className="text-white hover:bg-red-800 hover:text-gray-200 px-3 py-2 rounded-md transition duration-300">
              Servicios
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}