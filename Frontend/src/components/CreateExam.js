// Componente CrearExamen.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateExam = ({ onGuardarExamen }) => {
const [nombreExamen, setNombreExamen] = useState('');
const navigate = useNavigate();
const handleGuardarExamen = async (e) => {
    e.preventDefault(); // Evitar el comportamiento predeterminado del formulario
    // Verificar si el nombre del examen está vacío
    if (nombreExamen.trim() === '') {
        // Mostrar el modal de advertencia
    }

    try {
        // Realiza la solicitud POST al backend
        const response = await axios.post('http://localhost:4000/examen', { nombreExamen });

        // Llama a la función prop onGuardarExamen para guardar el examen
        onGuardarExamen(response.data);

        // Redirige a otra página después de guardar el examen
        navigate(`/create-questions/${response.data.idExamen}`);
        } catch (error) {
        console.error('Error al guardar el examen:', error);
        }
    };

    return (
        <div>
            <form className="max-w-sm mx-auto" onSubmit={handleGuardarExamen}>
                <h1 className="text-4xl font-bold text-center my-8">Crear Nuevo Examen</h1>
                <label htmlFor="nombreExamen" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Nombre del Examen <br /><br />
                <input
                    id="nombreExamen"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Escriba un nombre para el examen "
                    type="text"
                    value={nombreExamen}
                    onChange={(e) => setNombreExamen(e.target.value)}
                />
                </label><br />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">Siguiente</button>
            </form>
        </div>
    );
};

export default CreateExam;
