const mongoose = require('mongoose');
//const urlLocal = "mongodb://localhost:27017/pfc-2020"
const password = "301cronos"
const urlCloud = `mongodb+srv://edvan:${password}@cluster0-ujfno.gcp.mongodb.net/pfc-2020?retryWrites=true&w=majority`

//mongoose.connect(urlLocal, {useNewUrlParser: true, useUnifiedTopology: true});
//exports.connectionLocal = mongoose.connection
//exports.mongo = mongoose

mongoose.connect(urlCloud, {useNewUrlParser: true, useUnifiedTopology: true})
exports.connectionCloud = mongoose.connection;

createUser = ()=>{
    return new mongoose.Schema({
        name: String,
        email: String,
        password: String,
        pefil: String,
    })
}

function createMedicao(){
    return new mongoose.Schema({
        _id:mongoose.ObjectId,
        temperatura: Number,
        umidade: Number,
        pressao: Number,
        tipo_req: Number,
        image_url: String,
        vid_url:String,
        vid:[Buffer],
    })
}

exports.creteSchemaDevice = () => {
    return new mongoose.Schema({
        _id:mongoose.ObjectId,
        id_master: String,
        max_temperature: Number,
        low_humidity: Number,
        max_gas:Number,
        latitude: String,
        longitude: String,
        id_dispositivo: String,
        id_fire: String,
        tipo_dispositivo:String,
        pais:String,
        estado:String,
        municipio:String,
        zona:String,
        children: [],
        medicao: [createMedicao()],
    });
}