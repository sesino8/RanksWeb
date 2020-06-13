const mongoose= require('mongoose');

const esquema = mongoose.Schema({
    idWeb: {
    type: String,
    },
    name: {
    type: String,
    },
    categoria: {
    type: String,
    },
    link: {
    type: String,
    },
    image: {
    type: String,
    data: Buffer,
    },
    description: {
    type: String,
    },
    verified: {
    type: String,
    }
    });


module.exports = mongoose.model('Web',esquema);