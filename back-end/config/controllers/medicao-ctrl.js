const Medicao = require('../../../schemes/medicao-service')
var mongoose = require("mongoose");
const gridFSBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);

getMedicaoAlerts = async (req, res) => {
    await Medicao.find({tipo_req:1}, (err, medicoes) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!medicoes.length) {
            return res
                .status(404)
                .json({ success: false, error: `Não existem medições de alerta.` })
        }
        return res.status(200).json({ success: true, data: medicoes })
    }).catch(err => console.log(err))
}


getMedicaoNormal = async (req, res) => {
    await Medicao.find({tipo_req:0}, (err, medicoes) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!medicoes.length) {
            return res
                .status(404)
                .json({ success: false, error: `Não existem medições requisitadas` })
        }
        return res.status(200).json({ success: true, data: medicoes })
    }).catch(err => console.log(err))
}


getVideoMedicao = async (req, res, next) =>{
     try{
        gridFSBucket.openDownloadStreamByName(req.params.filename).pipe(res)
     }catch(e){
         console.log("Error getVideoMedicao: ", e)
         res.status(404).json({success: false, error: 'Erro ao buscar blob'})
     }
}

getImageMedicao = async (req, res, next) =>{
    try{
       gridFSBucket.openDownloadStreamByName(req.params.filename).pipe(res)
    }catch(e){
        console.log("Error getVideoMedicao: ", e)
        res.status(404).json({success: false, error: 'Erro ao buscar blob'})
    }
}


module.exports = {
    getMedicaoAlerts,
    getMedicaoNormal,
    getVideoMedicao,
    getImageMedicao
}
