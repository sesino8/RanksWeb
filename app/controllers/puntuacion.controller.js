const Puntuacion = require('../models/puntuacion.model.js');

// Obtener todos los puntuaciones
 

exports.findAll = (req,res) => {

    console.log(req.body)
    Puntuacion.find().then(puntuaciones=>{
        res.status(200).send(puntuaciones);
    }).catch(err=>{
        res.status(500).send({
            message: err.message || " Algo fue mal mientras los capturabamos a todos"
        });
    });
};

exports.findAllWebUser = (req,res) => {
    console.log(req.params.usuario);

    Puntuacion.find({ "usuario" : req.params.usuario }).then(puntuaciones=>{
        res.status(200).send(puntuaciones);
    }).catch(err=>{
        res.status(500).send({
            message: err.message || " Algo fue mal mientras los capturabamos a todos"
        });
    });

};


exports.updateRating = (req,res) => {
    console.log(req.params.idWeb)
    var idweb = req.params.idweb;
    var usuario = req.params.usuario;
    Puntuacion.updateOne(
    
        { "idweb" : idweb , "usuario" : usuario },
        { $set: {"puntuacion" : req.params.puntuacion} }

    ).then(puntuaciones=>{
        res.status(200).send(puntuaciones);
    }).catch(err=>{
        res.status(500).send({
            message: err.message || "NOT WORKING"
        });
    });

};


// Crear y salvar
exports.create = (req,res)=>{
    
    // Validamos el puntuacion
    if (!req.body){
        return res.status(400).send({
           message:"puntuacion Vacio..." 
        });
    }


    const puntuacion = new Puntuacion({
        idweb: req.params.idweb || "idWeb vacio",
        usuario: req.params.usuario || "user",
        puntuacion: req.params.puntuacion || 42
    })

    puntuacion.save().then(data =>{
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message|| "Something was wrong creating puntuacion"
        });
    });
};