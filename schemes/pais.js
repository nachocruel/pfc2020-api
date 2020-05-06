
const restful = require('node-restful')
const mongoose = restful.mongoose

const estado = new mongoose.Schema({
    codigo: {type: String, default: '52', unique:true},
    codigo_pais: {type: String, default:"55"},
    name: {type: String, default: 'Goias'},
    municipios: []
})

const pais = new mongoose.Schema({
    codigo: {type: String, default: "55", unique: true},
    name: {type: String, default: "Brazil"},
    language: {type: String, default: "pt-BR"},
    estados: [estado]
})
module.exports = restful.model('Pais', pais)