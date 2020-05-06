const restful = require('node-restful')
const mongoose = restful.mongoose
const municipio = new mongoose.Schema({
  codigo: {type: String, default: "5208707", unique:true},
  codigo_estado: {type: String},
  name: {type: String, default:'Goiania'},
})

const estado = new mongoose.Schema({
  codigo: {type: String, default: '52', unique:true},
  codigo_pais: {type: String, default:"55"},
  name: {type: String, default: 'Goias'},
  municipios: [municipio]
})

module.exports = restful.model('Estado', estado)