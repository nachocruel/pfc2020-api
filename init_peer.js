// email: pfc.medicao.2020@gmail.com
// senha: pfc.2020@123
// site url: https://us-central1-my-fps.cloudfunctions.net/appPFC
var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
require("firebase/database");
var PubNub = require("pubnub");
var {connectionCloud, creteSchemaDevice, mongo} = require('./mongodb_manager')
const listaRespostas = []

 var firebaseConfig = {
    apiKey: "AIzaSyCiQukvo_DTNhOIUn9BFbFCtVtGjZqiLyg",
    authDomain: "condoease-3f3ea.firebaseapp.com",
    databaseURL: "https://condoease-3f3ea.firebaseio.com",
    projectId: "condoease-3f3ea",
    storageBucket: "condoease-3f3ea.appspot.com",
    messagingSenderId: "207405380713",
    appId: "1:207405380713:web:7ad0e9a0828a51f8"
  };

  var pubNub = new PubNub({
      publishKey: "pub-c-e5c8e409-367f-4eb2-8d95-0d93e5fdfd8b",
      subscribeKey:"sub-c-4c1671dc-347a-11ea-b8ef-b6462cb07a90",
      ssl:true
  })

  firebase.initializeApp(firebaseConfig);

  pubNub.subscribe({
    channels: ['chan-1', 'registro', 'chan-2', 'chan-3'],
  });
  
 exports.initPub = ()=>{
     let self = this
    console.log("pub iniciado")
    pubNub.addListener({
        message: function(m) {
            // handle message
            var channelName = m.channel; // The channel for which the message belongs
            var channelGroup = m.subscription; // The channel group or wildcard subscription match (if exists)
            var pubTT = m.timetoken; // Publish timetoken
            var msg = m.message; // The Payload
            var publisher = m.publisher; //The Publisher
            
            if(channelName === 'chan-1'){
               
            }else if(channelName === 'registro'){
                console.log('channelName: ', channelName)
                
                switch(msg.acao){
                    case 0:
                            console.log(msg.device)
                            var novoDevice = msg.device;
                            var update = {}
                            update[`/multi_data/device/`] = novoDevice
                            firebase.database().ref().update(update).then(()=>{
                                console.log('dispositivo salvo')
                            }).catch(error => console.error(error))
                            send_message({ acao:'registro', canal:msg.canal })
                            break;
                    case 1:
                            console.log("registrado com sucesso!")
                            console.log(msg.device)
                            break;
                    default:
                        console.log("acao nao encontrada.")
                }          
            }
            else if(channelName === 'chan-2')
            {
                 console.log("Retorno do dispositivo")
                 var index = 0
                 for(let elementCallBack of self.listaRespostas){
                     if(elementCallBack.id_dispositivo === msg.id_dispositivo){
                        clearTimeout(elementCallBack.timeOut)
                        const locationsSubscription = elementCallBack.callBack.subscribe({
                            next() {
                               console.log('callBackFoi chamado.')
                            },
                            error(msg) {
                              console.log('Erro ao tentar configuar dispositivo', msg)
                            }
                        })
                        
                         setTimeout(() => {
                            locationsSubscription.unsubscribe();
                         }, 10000);
                          self.listaRespostas.splice(index, 1)
                     }
                     index++
                 }
            }else if(channelName === 'chan-3'){
                var index = 0
                for(let elementCallBack of self.listaRespostas){
                    if(elementCallBack.id_dispositivo === msg.id_dispositivo){
                        clearTimeout(elementCallBack.timeOut)
                        const locationsSubscription = elementCallBack.callBack.subscribe({
                            next(res) {
                               console.log('callBack chan-3')
                               res.status(200).json(msg)
                            },
                            error(msg) {
                              console.log('Erro ao tentar configuar dispositivo', msg);
                            }
                        })
                        
                         setTimeout(() => {
                            locationsSubscription.unsubscribe();
                         }, 10000);
                          self.listaRespostas.splice(index, 1)
                    }
                    index++
                }
            }
        },
        presence: function(p) {
            // handle presence
            var action = p.action; // Can be join, leave, state-change or timeout
            var channelName = p.channel; // The channel for which the message belongs
            var occupancy = p.occupancy; // No. of users connected with the channel
            var state = p.state; // User State
            var channelGroup = p.subscription; //  The channel group or wildcard subscription match (if exists)
            var publishTime = p.timestamp; // Publish timetoken
            var timetoken = p.timetoken;  // Current timetoken
            var uuid = p.uuid; // UUIDs of users who are connected with the channel
        },
        signal: function(s) {
            // handle signal
            var channelName = s.channel; // The channel for which the signal belongs
            var channelGroup = s.subscription; // The channel group or wildcard subscription match (if exists)
            var pubTT = s.timetoken; // Publish timetoken
            var msg = s.message; // The Payload
            var publisher = s.publisher; //The Publisher
        },
        user: function(userEvent) {
            // for Objects, this will trigger when:
            // . user updated
            // . user deleted
        },
        space: function(spaceEvent) {
            // for Objects, this will trigger when:
            // . space updated
            // . space deleted
        },
        membership: function(membershipEvent) {
            // for Objects, this will trigger when:
            // . user added to a space
            // . user removed from a space
            // . membership updated on a space
        },
        messageAction: function(ma) {
            // handle message action
            var channelName = ma.channel; // The channel for which the message belongs
            var publisher = ma.publisher; //The Publisher
            var event = ma.message.event; // message action added or removed
            var type = ma.message.data.type; // message action type
            var value = ma.message.data.value; // message action value
            var messageTimetoken = ma.message.data.messageTimetoken; // The timetoken of the original message
            var actionTimetoken = ma.message.data.actionTimetoken; //The timetoken of the message action
        },
        status: function(s) {
            var affectedChannelGroups = s.affectedChannelGroups; // The channel groups affected in the operation, of type array.
            var affectedChannels = s.affectedChannels; // The channels affected in the operation, of type array.
            var category = s.category; //Returns PNConnectedCategory
            var operation = s.operation; //Returns PNSubscribeOperation
            var lastTimetoken = s.lastTimetoken; //The last timetoken used in the subscribe request, of type long.
            var currentTimetoken = s.currentTimetoken; //The current timetoken fetched in the subscribe response, which is going to be used in the next request, of type long.
            var subscribedChannels = s.subscribedChannels; //All the current subscribed channels, of type array.
        }
    });
}

exports.enviarMensagem = (msg, elementCallBack)=>{
    listaRespostas.push(elementCallBack)
    send_message(msg) 
}

exports.listaRespostas = listaRespostas
  
function send_message(msg){
    pubNub.publish(
        {
            message: msg,
            channel: msg.canal,
            sendByPost: false, // true to send via POST
            storeInHistory: false, //override default storage options
            meta: {
                "cool": "meta"
            } // publish extra meta with the request
        },
        function (status, response) {
            // handle status, response
        }
    );
}