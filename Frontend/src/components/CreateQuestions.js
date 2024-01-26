// IngresarPregunta.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CreateQuestions = () => {
const [textoPregunta, setTextoPregunta] = useState('');
const [opciones, setOpciones] = useState(['', '', '', '']);
const [respuestaCorrecta, setRespuestaCorrecta] = useState('');
const navigate = useNavigate();
const { idExamen } = useParams();

const handleGuardarPregunta = async (e) => {
    e.preventDefault(); // Evitar el comportamiento predeterminado del formulario
    // Verificar si hay campos vacíos
    if (textoPregunta.trim() === '' || opciones.some(opcion => opcion.trim() === '') || respuestaCorrecta.trim() === '') {
        // Mostrar el modal de advertencia
        return;
    }
    try {
        // Realiza la solicitud POST al backend para guardar la pregunta
        await axios.post(`http://localhost:4000/examen/${idExamen}/pregunta`, {
            texto: textoPregunta,
            opciones,
            respuestaCorrecta,
        });

        // Navega a la página de lista de exámenes después de guardar la pregunta
        navigate('/');
        } catch (error) {
        console.error('Error al guardar la pregunta:', error);
        }
    };
    return (
        <div>
            <form className="max-w-sm mx-auto" onSubmit={handleGuardarPregunta}>
            <h1 className="text-4xl font-bold text-center my-8">Crear Nuevo Examen</h1>
            <label htmlFor="pregunta" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Ingrese la pregunta <br /><br />
                <input
                    id="pregunta"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Escriba su pregunta "
                    type="text"
                    value={textoPregunta}
                    onChange={(e) => setTextoPregunta(e.target.value)}
                />
            </label><br />
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Opciones de respuesta <br /><br />
            {opciones.map((opcion, index) => (
                <div key={index}>
                    <br />
                <input
                    id="option"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    value={opcion}
                    onChange={(e) => {
                    const nuevasOpciones = [...opciones];
                    nuevasOpciones[index] = e.target.value;
                    setOpciones(nuevasOpciones);
                    }}
                    placeholder={`Opción ${index + 1}`}
                />
                </div>
            ))}
            <br />
            </label><br />
            <label htmlFor="respuestaCorrecta" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Ingrese la respuesta correcta <br /><br />
                <input
                    id="respuestaCorrecta"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Escriba la respuesta"
                    type="text"
                    value={textoPregunta}
                    onChange={(e) => setRespuestaCorrecta(e.target.value)}
                />
            </label><br />
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4" onClick={handleGuardarPregunta}>Guardar Pregunta</button>
            </form>
            
        </div>
    );
};

export default CreateQuestions;
