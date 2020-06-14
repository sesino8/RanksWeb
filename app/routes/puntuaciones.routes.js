module.exports = (app) => {
    const puntuaciones = require('../controllers/puntuacion.controller.js');

    // Create a new puntuaciones
    app.post('/puntuaciones/:idweb/:puntuacion/:usuario', puntuaciones.create);

    // Retrieve all puntuaciones
    app.get('/puntuaciones', puntuaciones.findAll);

    // Retrieve a single puntuaciones with user
    app.get('/puntuaciones/:usuario', puntuaciones.findAllWebUser);

    // Updare a single puntuaciones with idweb,puntuacion,usuario
    app.put('/puntuaciones/:idweb/:puntuacion/:usuario', puntuaciones.updateRating);

}