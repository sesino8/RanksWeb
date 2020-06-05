const mongoose= require('mongoose');

const esquema = mongoose.Schema({
    idweb:String,
    usuario:String,
    puntuacion:Number
},{
    timestamps:true
});


module.exports = mongoose.model('Puntuacion',esquema);