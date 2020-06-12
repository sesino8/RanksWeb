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
    },
    description: {
    type: String,
    },
    verified: {
    type: String,
    },
    createdAt: {
    type: Date,
    default: Date.now()
    }
    });


module.exports = mongoose.model('Web',esquema);