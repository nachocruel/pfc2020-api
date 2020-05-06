const restful = require('node-restful')
const mongoose = restful.mongoose

const municipio = new mongoose.Schema({
    codigo: {type: String, default: "5208707", unique:true},
    codigo_estado: {type: String},
    name: {type: String, default:'Goiania'},
})

module.exports = restful.model('Municipio',municipio)