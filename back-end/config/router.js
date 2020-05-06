const express = require('express')
const UserCtrl = require('./controllers/user-ctrl')
const deviceCtrl = require('./controllers/device-ctrl')
const medicaoCtrl = require('./controllers/medicao-ctrl')

module.exports = (server)=>{
     const router = express.Router()
     server.use('/api', router)
     router.use(deviceCtrl.configRasp)
     

     /* User routers */
     const userService = require('../../schemes/user-service')
     userService.register(router, '/user')
     router.post('/user/logar', UserCtrl.logarUser)
     
     /*deivce routers*/
     const deviceService = require('../../schemes/device-service')
     deviceService.register(router, '/device')
     router.post('/device/get_last_medicao', deviceCtrl.getLastMedicao)
     
     /*medicao routers */
     const medicaoService = require('../../schemes/medicao-service')
     medicaoService.register(router, '/medicao')
     router.get('/medicao/get_medicao_normal', medicaoCtrl.getMedicaoNormal)
     router.get('/medicao/get_medicao_alert', medicaoCtrl.getMedicaoAlerts)
     router.get('/medicao/get_video/:filename', medicaoCtrl.getVideoMedicao)
     router.get('/medicao/get_image/:filename', getImageMedicao)
     
     /*municipios routers */
     const municipioServie = require('../../schemes/municipioService')
     municipioServie.register(router, '/municipio')

     /*paises routers */
     const paisService = require('../../schemes/pais-service')
     paisService.register(router, '/pais')
     

     /*estados routers */
     const estadosService = require('../../schemes/estado-service')
     estadosService.register(router, '/estado')
}