const restful = require('node-restful')
const mongoose = restful.mongoose

const device = new mongoose.Schema({
    _id:mongoose.ObjectId,
    max_temperature: {type:Number},
    device_max_temperature: {type:Number},
    low_humidity: {type:Number},
    max_gas:{type:Number},
    latitude: {type:String, required:true},
    longitude: {type:String, required:true},
    id_dispositivo: {type:String},
    id_fire: {type:String},
    codigo_pais:{type:String},
    codigo_estado:{type:String},
    codigo_municipio: {type: String},
    zona:{type:String}
})

device['children'] = [device]

const Device = restful.model('Device', device, 'device')
Device.discriminator('SlaveDevice', 
   new mongoose.Schema({
       id_master: {type: String},
       tipo_dispositivo: {type: String, default: 'SLAVE'}
   })
)

Device.discriminator('MasterDevice', 
   new mongoose.Schema({
       tipo_dispositivo: {type: String, default:'MASTER'}
   })
)

module.exports = Device
