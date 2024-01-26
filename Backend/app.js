const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
const DATABASE_PATH = path.join('../Database', 'data.json');

// Endpoint para agregar un nuevo examen
app.post('/examen', (req, res) => {
  fs.readFile(DATABASE_PATH, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading the database');
      return;
    }

    const database = JSON.parse(data);
    const nuevoExamen = {
      idExamen: database.examenes.length > 0 ? Math.max(...database.examenes.map(e => e.idExamen)) + 1 : 1,
      nombreExamen: req.body.nombreExamen,
      preguntas: []
    };

    database.examenes.push(nuevoExamen);

    fs.writeFile(DATABASE_PATH, JSON.stringify(database, null, 2), 'utf8', (err) => {
      if (err) {
        res.status(500).send('Error writing to the database');
        return;
      }
      res.status(201).json(nuevoExamen);
    });
  });
});

// Endpoint para agregar una pregunta a un examen existente
app.post('/examen/:idExamen/pregunta', (req, res) => {
  const idExamen = parseInt(req.params.idExamen, 10);

  fs.readFile(DATABASE_PATH, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading the database');
      return;
    }

    const database = JSON.parse(data);
    const examen = database.examenes.find(e => e.idExamen === idExamen);

    if (!examen) {
      res.status(404).send('Examen no encontrado');
      return;
    }

    const nuevaPregunta = {
      id: examen.preguntas.length > 0 ? Math.max(...examen.preguntas.map(p => p.id)) + 1 : 1,
      texto: req.body.texto,
      opciones: req.body.opciones,
      respuestaCorrecta: req.body.respuestaCorrecta
    };

    if (!nuevaPregunta.texto || !nuevaPregunta.opciones || !nuevaPregunta.respuestaCorrecta) {
      res.status(400).send('Datos incompletos para la nueva pregunta');
      return;
    }

    examen.preguntas.push(nuevaPregunta);

    fs.writeFile(DATABASE_PATH, JSON.stringify(database, null, 2), 'utf8', (err) => {
      if (err) {
        res.status(500).send('Error writing to the database');
        return;
      }
      res.status(201).json(nuevaPregunta);
    });
  });
});


/* Obtener un Examen por su ID */
app.get('/examen/:idExamen', (req, res) => {
  const idExamen = parseInt(req.params.idExamen, 10);

  fs.readFile(DATABASE_PATH, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading the database');
      return;
    }

    const database = JSON.parse(data);
    const examen = database.examenes.find(e => e.idExamen === idExamen);

    if (examen) {
      res.json(examen);
    } else {
      res.status(404).send('Examen no encontrado');
    }
  });
});

/* Obtener una Pregunta de un Examen por su ID */

app.get('/examen/:idExamen/pregunta/:idPregunta', (req, res) => {
  const idExamen = parseInt(req.params.idExamen, 10);
  const idPregunta = parseInt(req.params.idPregunta, 10);

  fs.readFile(DATABASE_PATH, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading the database');
      return;
    }

    const database = JSON.parse(data);
    const examen = database.examenes.find(e => e.idExamen === idExamen);

    if (!examen) {
      res.status(404).send('Examen no encontrado');
      return;
    }

    const pregunta = examen.preguntas.find(p => p.id === idPregunta);

    if (pregunta) {
      res.json(pregunta);
    } else {
      res.status(404).send('Pregunta no encontrada');
    }
  });
});

/* Metodo get para traer a todos los examenes */
app.get('/examenes', (req, res) => {
  fs.readFile(DATABASE_PATH, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error al leer la base de datos');
      return;
    }

    const database = JSON.parse(data);
    res.json(database.examenes);
  });
});



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
