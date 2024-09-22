import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ConsultaAlumnos from './consulta';
import AgregarCurso from './agregar';
import './App.css'


function App() {
  return (
    <Router>
      <div className="bg-background text-primary-foreground min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-8">PETICION POST</h1>
        <div className="d-flex justify-content-center mb-4">
            <Link to="/consulta" className="btn btn-primary me-2">Consulta de Alumnos</Link>
            <Link to="/agregar" className="btn btn-success">Agregar Curso</Link>
        </div>
        <Routes>
          <Route path="/consulta" element={<ConsultaAlumnos />} />
          <Route path="/agregar" element={<AgregarCurso />} />         
        </Routes>
      </div>
    </Router>  
  );
}

export default App
