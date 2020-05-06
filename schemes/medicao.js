const restful = require('node-restful')
const mongoose = restful.mongoose

const medicao = new mongoose.Schema({
    _id:mongoose.ObjectId,
    id_dispositivo: {type: String},
    tipo_dispositivo: {type:String},
    codigo_pais: {type:String},
    codigo_estado: {type:String},
    codigo_municipio: {type:String},
    temperatura: {type: Number},
    temperatura2: {type: Number},
    temperatura3: {type: Number},
    temperatura_media: {type: Number},
    device_temperature: {type:Number},
    umidade: {type:Number},
    umidade2: {type:Number},
    umidade3: {type: Number},
    umidade_media: {type: Number},
    pressao: {type:Number},
    pressao2: {type:Number},
    pressao3: {type:Number},
    pressao_media: {type: Number},
    tvoc: {type: Number},
    tvoc2: {type: Number},
    tvoc3: {type:Number},
    tvoc_media: {type:Number},
    co2: {type:Number},
    co2_2: {type:Number},
    co2_3: {type:Number},
    co2_media: {type: Number},
    tipo_req: {type:Number},
    image_url: {type:String},
    vid_url: {type: String},
    mesage: {type: String},
    horario: {type: String},
    vid:mongoose.ObjectId
})

module.exports = medicao