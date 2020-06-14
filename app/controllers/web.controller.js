const Web = require('../models/web.model.js');


exports.findAll = (req, res) => {

    console.log(req.body)
    Web.find({ "verified": req.params.verified, "categoria": req.params.categoria }).then(web => {
        const fs = require("fs"); 
    if (!fs.existsSync(web.image)) {
        web.image = "/media/problems.png";
    }
    console.log(web.image);
    
        res.status(200).send(web);
    }).catch(err => {
        res.status(500).send({
            message: err.message || " Algo fue mal mientras los capturabamos a todos"
        });
    });
};

exports.getAll = (req, res) => {

    console.log(req.body)
    Web.find().then(web => {
        res.status(200).send(web);
    }).catch(err => {
        res.status(500).send({
            message: err.message || " Algo fue mal mientras los capturabamos a todos"
        });
    });
};

exports.findVerified = (req, res) => {

    console.log(req.body)
    Web.find({ "verified": req.params.verified }).then(web => {
        res.status(200).send(web);
    }).catch(err => {
        res.status(500).send({
            message: err.message || " Algo fue mal mientras los capturabamos a todos"
        });
    });
};

exports.findWeb = (req, res) => {
    console.log(req.params.usuario);

    Web.find({ "idWeb": req.params.idWeb }).then(web => {
        res.status(200).send(web);
    }).catch(err => {
        res.status(500).send({
            message: err.message || " Algo fue mal mientras los capturabamos a todos"
        });
    });

};



exports.create = (req, res) => {

    if (!req.body) {
        return res.status(400).send({
            message: "puntuacion Vacio..."
        });
    }
    console.log(req.body);
    

    var base64Data = req.body.image.replace(/^data:image\/png;base64,/, "");
    var auxName = "user" + Date.now();

     require("fs").writeFile("./public/media/" + auxName + ".png", base64Data, 'base64', function (err) {
         console.log(err);
     });


    const web = new Web({
        idWeb: req.params.idweb,
        name: req.params.name || "Nombre Vacio",
        categoria: req.params.categoria || "Sin categoria",
        link: req.params.link || "www.google.es",
        image: "./public/media/" + auxName + ".png",
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