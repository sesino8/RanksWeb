const Web = require('../models/web.model.js');


exports.findAll = (req,res) => {

    console.log(req.body)
    Web.find().then(web=>{
        res.status(200).send(web);
    }).catch(err=>{
        res.status(500).send({
            message: err.message || " Algo fue mal mientras los capturabamos a todos"
        });
    });
};

exports.countAll = (req,res) => {

    console.log(req.body)
    Web.count().then(web=>{
        res.status(200).send(web);
    }).catch(err=>{
        res.status(500).send({
            message: err.message || " Algo fue mal mientras los capturabamos a todos"
        });
    });
};

exports.findVerified = (req,res) => {

    console.log(req.body)
    Web.find({ "verified" : req.params.verified }).then(web=>{
        res.status(200).send(web);
    }).catch(err=>{
        res.status(500).send({
            message: err.message || " Algo fue mal mientras los capturabamos a todos"
        });
    });
};

exports.findWeb = (req,res) => {
    console.log(req.params.usuario);

    Web.find({ "idWeb" : req.params.idWeb }).then(web=>{
        res.status(200).send(web);
    }).catch(err=>{
        res.status(500).send({
            message: err.message || " Algo fue mal mientras los capturabamos a todos"
        });
    });

};



exports.create = (req, res) => {

    // Validamos el puntuacion
    if (!req.body) {
        return res.status(400).send({
            message: "puntuacion Vacio..."
        });
    }


    const web = new Web({
        idWeb: req.params.idWeb || "0",
        name: req.params.name || "Nombre Vacio",
        categoria: req.params.categoria || "Sin categoria",
        link: req.params.link || "www.google.es",
        image: req.params.image || "./media/notVerified.png",
        description: req.params.description || "Nueva web",
        verified: req.params.verified || "false"
    })

    web.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something was wrong creating puntuacion"
        });
    });
};