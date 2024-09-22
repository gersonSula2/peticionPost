import { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const INPUT_CLASS = 'w-full bg-input text-primary-foreground border border-primary rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring focus:ring-primary';
const BUTTON_CLASS = 'px-4 py-2 rounded-md focus:outline-none focus:ring';

const ConsultaAlumnos = () => {
  const [carnet, setCarnet] = useState('');
  const [alumno, setAlumno] = useState(null);
  const [error, setError] = useState('');

  const handleBuscar = async () => {
    try {
      const response = await axios.get('https://test-deploy-12.onrender.com/estudiantes');
      const alumnos = response.data;
      const alumnoEncontrado = alumnos.find((alumno: { Carnet: string; }) => alumno.Carnet === carnet);

      if (alumnoEncontrado) {
        setAlumno(alumnoEncontrado);
        setError('');
      } else {
        setError('No se encontró el estudiante');
        setAlumno(null);
      }
    } catch {
      setError('Error al buscar el estudiante');
      setAlumno(null);
    }
  };

  const handleLimpiar = () => {
    setCarnet('');
    setAlumno(null);
    setError('');
  };

  const handleCancelar = () => {
    console.log('Acción cancelada');
  };

  return (
    <div className="bg-background text-primary-foreground min-h-screen flex items-center justify-center">
      <div className="bg-card shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Consulta de Alumnos</h2>
        
        <label htmlFor="carnet" className="block text-sm font-medium text-primary-foreground mb-2">
          Carnet:
        </label>    
        <input
          type="text"
          id="carnet"
          name="carnet"
          placeholder="0000-00-00000"
          className={INPUT_CLASS}
          value={carnet}
          onChange={(e) => setCarnet(e.target.value)}
        />
        
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-sm font-medium text-primary-foreground mb-2">
            Nombre:
          </label>
          <p id="nombre" className="bg-input text-primary-foreground border border-primary rounded-md px-3 py-2">
            {alumno ? alumno.Estudiante : 'Nombre del Alumno'}
          </p>
        </div>
        
        <div className="mb-4">
          <label htmlFor="correo" className="block text-sm font-medium text-primary-foreground mb-2">
            Correo:
          </label>
          <p id="correo" className="bg-input text-primary-foreground border border-primary rounded-md px-3 py-2">
            {alumno ? alumno.Email : 'correo@miumg.edu.gt'}
          </p>
        </div>
        
        <div className="mb-4">
          <label htmlFor="seccion" className="block text-sm font-medium text-primary-foreground mb-2">
            Sección:
          </label>
          <p id="seccion" className="bg-input text-primary-foreground border border-primary rounded-md px-3 py-2">
            {alumno ? alumno.Seccion : '1,2,3,4'}
          </p>
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={handleBuscar}
            className={`bg-primary text-primary-foreground ${BUTTON_CLASS} hover:bg-primary/80 focus:ring-primary mr-2`}
          >
            Buscar
          </button>
          
          <button
            onClick={handleLimpiar}
            className={`bg-secondary text-secondary-foreground ${BUTTON_CLASS} hover:bg-secondary/80 focus:ring-secondary mr-2`}
          >
            Limpiar
          </button>
          
          <button
            onClick={handleCancelar}
            className={`bg-destructive text-destructive-foreground ${BUTTON_CLASS} hover:bg-destructive/80 focus:ring-destructive`}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsultaAlumnos;