module.exports = (app) => {
    const Web = require('../controllers/web.controller.js');

    // Create a new web with all the parameters
    app.post('/web/:idweb/:name/:categoria/:link/:description/:verified', Web.create);

    // Retreive all webs verified and by categoria
    app.get('/web/:verified/:categoria', Web.findAll);

    // Retreive all webs
    app.get('/web/', Web.getAll);
    
    // Retreive only webs verified
    app.get('/web/:verified', Web.findVerified);

    // Create a new web
    app.post('/web/:idWeb', Web.findWeb);




}