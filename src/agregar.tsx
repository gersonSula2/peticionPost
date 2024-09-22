import { useState } from 'react';
import axios from 'axios';

const inputClasses = 'w-full px-3 py-2 placeholder-input text-primary dark:text-primary-foreground bg-input dark:bg-primary-foreground border border-primary dark:border-primary-foreground rounded-md focus:outline-none focus:ring ring-primary dark:ring-primary-foreground';
const buttonClasses = 'px-4 py-2 rounded-md';
const primaryButtonClasses = 'bg-primary text-primary-foreground hover:bg-primary/80';
const secondaryButtonClasses = 'bg-secondary text-secondary-foreground hover:bg-secondary/80';
const destructiveButtonClasses = 'bg-destructive text-destructive-foreground hover:bg-destructive/80';

const AgregarCurso = () => {
    const [curso, setCurso] = useState({ nombre: '', creditos: 0, descripcion: '' });
    const [mensaje, setMensaje] = useState('');

    function handleActualizar(e: { target: { name: any; value: any; }; }) {
        const { name, value } = e.target;
        setCurso({ ...curso, [name]: value });
    }

    async function handleEnviar(e: { preventDefault: () => void; }) {
        e.preventDefault();
        try {
            await axios.post('https://test-deploy-12.onrender.com/cursos', curso);
            setMensaje('Curso agregado exitosamente');
            setCurso({ nombre: '', creditos: 0, descripcion: '' });
        } catch (error) {
            setMensaje('Error al agregar el curso');
        }
    }

    const handleLimpiar = () => {
        setCurso({ nombre: '', creditos: 0, descripcion: '' });
    };

    const handleCancelar = () => {
        // Lógica de cancelación, como redireccionar o cerrar el formulario
    };

    return (
        <div className="bg-background dark:bg-foreground text-primary dark:text-primary-foreground p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Creación de Cursos</h2>
            <form onSubmit={handleEnviar}>
                <div className="mb-4">
                    <label htmlFor="nombre" className="block text-sm font-medium text-primary dark:text-primary-foreground">
                        Nombre
                    </label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        className={inputClasses}
                        placeholder="Ingrese el Nombre"
                        value={curso.nombre}
                        onChange={handleActualizar}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="creditos" className="block text-sm font-medium text-primary dark:text-primary-foreground">
                        Créditos
                    </label>
                    <input
                        type="number"
                        id="creditos"
                        name="creditos"
                        className={inputClasses}
                        placeholder="Ingresa los Créditos"
                        value={curso.creditos}
                        onChange={handleActualizar}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="descripcion" className="block text-sm font-medium text-primary dark:text-primary-foreground">
                        Descripción
                    </label>
                    <input
                        id="descripcion"
                        name="descripcion"
                        className={inputClasses}
                        placeholder="Ingresa una Descripción"
                        value={curso.descripcion}
                        onChange={handleActualizar}
                    />
                </div>
                <div className="flex justify-end">
                    <button type="submit" className={`${primaryButtonClasses} ${buttonClasses} mr-2`}>Enviar</button>
                    <button type="button" className={`${secondaryButtonClasses} ${buttonClasses} mr-2`} onClick={handleLimpiar}>Limpiar</button>
                    <button type="button" className={`${destructiveButtonClasses} ${buttonClasses}`} onClick={handleCancelar}>Cancelar</button>
                </div>
            </form>
            {mensaje && <p className="mt-4 text-green-500">{mensaje}</p>}
        </div>
    );
};

export default AgregarCurso;
