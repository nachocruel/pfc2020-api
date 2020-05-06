

var { connectionCloud } = require('./back-end/config/database')
connectionCloud.on('error', console.error.bind(console, 'connection error:'))
connectionCloud.once('open', ()=>{
   console.log('cluster ok')
   const init_peer = require('./init_peer')
   const server = require('./back-end/config/server')
   init_peer.initPub()
   require('./back-end/config/router')(server)
})