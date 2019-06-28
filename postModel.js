const mongoose = require('mongoose');

const publicacionSchema = mongoose.Schema({
    nombre: {
        type: String,
        require: true
    },
    usuario: {
        type: String,
        require: true
    },
    txt:{
        type: String,
        require: true
    },
    categoria: {
        type: String,
        default: "sin_categoria"
    },
    imagen: String,
    fecha_publicacion: {
        type: Date,
        default: Date.now
    }

});

var Publicacion = module.exports = mongoose.model('publicacion', publicacionSchema);

module.exports.get = function(callback, limit){
    Publicacion.find(callback).limit(limit);
}