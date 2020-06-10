module.exports = (app) => {
    const puntuaciones = require('../controllers/puntuacion.controller.js');

    // Create a new puntuaciones
    app.post('/puntuaciones/:idweb/:puntuacion/:usuario', puntuaciones.create);

    // Retrieve all puntuaciones
    app.get('/puntuaciones', puntuaciones.findAll);

    // Retrieve a single puntuaciones with puntuacionId
    app.get('/puntuaciones/:usuario', puntuaciones.findAllWebUser);

    // Retrieve a single puntuaciones with puntuacionId
    app.put('/puntuaciones/:idweb/:puntuacion/:usuario', puntuaciones.updateRating);

    // Update a puntuaciones with puntuacionId
    //app.put('/puntuaciones/:puntuacionId', puntuaciones.update);

    // Delete a puntuaciones with puntuacionId
    //app.delete('/puntuaciones/:puntuacionId', puntuaciones.delete);
}