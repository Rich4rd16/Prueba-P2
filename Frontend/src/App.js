import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menu from './components/Navbar';
import Home from './components/Home';
import CreateExam from './components/CreateExam';
import CreateQuestions from './components/CreateQuestions';
import Footer from './components/Footer';
import './App.css'; // Agrega un archivo de estilos si aún no lo tienes

export default function App() {
  const [examenes, setExamenes] = useState([]);

  // Función para guardar un nuevo examen
  const guardarExamen = (nuevoExamen) => {
    setExamenes([...examenes, nuevoExamen]);
  };
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Menu />
        <div className="flex-grow">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/create-exam' element={<CreateExam onGuardarExamen={guardarExamen} />} />
            <Route path="/create-questions/:idExamen" element={<CreateQuestions />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
