module.exports = (app) => {
    const Web = require('../controllers/web.controller.js');

    // Create a new puntuaciones
    app.post('/web/:idweb/:name/:categoria/:link/:image/:description/:verified', Web.create);

    app.get('/web/findall', Web.findAll);

    app.get('/web/', Web.countAll);

    app.get('/web/:verified', Web.findVerified);

    app.get('/web/:idWeb', Web.findWeb);




}