const Device = require('../../../schemes/device-service')
const { enviarMensagem, listaRespostas } = require('../../../init_peer')
const { Observable } = require('rxjs')

configRasp = async  (req, res, next)=>{
   if(req.url.split('/')[1]==='device' && req.method === "PUT")
   {
    let sended = false
    const body = req.body
    if(!body){
      return res.status(400).json({
         success: false,
         error: 'Não foi encontrado o corpo da mensagem'
      })
    }
    
    const raspObs =  new Observable((observer) => {
       if(!sended){
         observer.next()
         next()
       }else{
         observer.error('Timeout não foi possível enviar.')
       }
    })

     var timeOut = setTimeout(() => {
        sended = true
        return res.status(400).json({result: false, message:'Não foi possível atualizar o dispositivo.'})
     }, 15000);
     enviarMensagem({acao:'setDeviceConfig', canal:body._id, data:body}, {id_dispositivo: body._id, callBack: raspObs, timeOut: timeOut})
   }
   else
   {
       next()
   }
 }

 getLastMedicao = async  (req, res, next)=>{
   const body = req.body
   let sended = false
   if(!body){
     return res.status(400).json({
        success: false,
        error: 'Não foi encontrado o corpo da mensagem'
     })
   }
   
   const raspObs =  new Observable((observer) => {
      if(!sended)
        observer.next(res)
      else
        observer.error('Timeout não foi possível enviar.')
   })

    var timeOut = setTimeout(() => {
       sended = true
       return res.status(400).json({result: false, message:'Não foi possível atualizar o dispositivo.'})
    }, 15000);
    enviarMensagem({acao:'lastMeasurement', canal:body._id, data:body}, {id_dispositivo: body._id, callBack: raspObs, timeOut: timeOut})
}

module.exports = {
    configRasp,
    getLastMedicao
}