module.exports = (app) => {
    const Web = require('../controllers/web.controller.js');

    // Create a new puntuaciones
    app.post('/web/:idweb/:name/:categoria/:link/:description/:verified', Web.create);

    app.get('/web/:verified/:categoria', Web.findAll);

    app.get('/web/', Web.getAll);

    app.get('/web/:verified', Web.findVerified);

    app.post('/web/:idWeb', Web.findWeb);




}