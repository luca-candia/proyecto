import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Turnos from './pages/Turnos.jsx';
import Clientes from './pages/Clientes.jsx';
import Servicios from './pages/Servicios.jsx';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      
      <main className="max-w-7xl mx-auto p-6">
        <Routes>
          <Route path="/" element={<Turnos />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/servicios" element={<Servicios />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App;