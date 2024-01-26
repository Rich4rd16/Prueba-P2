import React, { useEffect, useState } from 'react';
import axios from 'axios';


export default function Home() {
    // const imagen = require.context("../img/");
    // Estado para almacenar la lista de exámenes
    const [examenes, setExamenes] = useState([]);

    // Efecto para cargar la lista de exámenes al montar el componente
    useEffect(() => {
        // Función para obtener la lista de exámenes del backend
        const obtenerExamenes = async () => {
        try {
            const response = await axios.get('http://localhost:4000/examenes');
            setExamenes(response.data);
        } catch (error) {
            console.error('Error al obtener la lista de exámenes:', error);
        }
        };

        // Llama a la función para obtener la lista de exámenes
        obtenerExamenes();
    }, []); // El array vacío asegura que el efecto se ejecute solo una vez al montar el componente

    const divStyle = {
        width: '200px',
        height: '100px',
        marginTop: '20px',
    };

    return (
        <div className="flex flex-col items-center justify-center my-4 mb-0">
            <div
                className="relative w-screen max-w-sm border border-gray-600 bg-gray-100 px-4 py-2 sm:px-6 lg:px-8"
                aria-modal="true"
                role="dialog"
            >
                <div className="mt-4 space-y-6">
                    <h1 className="text-4xl font-bold text-center my-8">Lista de Exámenes</h1>        
                    <ul className="space-y-4">
                        {examenes.map(examen => (
                        <li key={examen.idExamen}>
                            Nombre: {examen.nombreExamen}
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
            
            {/* Agrega un botón para redirigir a otra página */}
            <div style={divStyle}>
            <a
                className="group flex items-center justify-between gap-2 rounded-lg border border-indigo-600 bg-indigo-600 px-3 py-2 text-xs transition-colors hover:bg-transparent focus:outline-none focus:ring"
                href="./create-exam"
            >
                <span className="font-medium text-white transition-colors group-hover:text-indigo-600 group-active:text-indigo-500">
                    Crear un examen
                </span>

                <span className="shrink-0 rounded-full border border-current bg-white p-1 text-indigo-600 group-active:text-indigo-500">
                    <svg
                    className="h-4 w-4 rtl:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                    </svg>
                </span>
            </a>
            </div>
        </div>
    );
}