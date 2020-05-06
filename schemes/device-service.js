const _  = require('lodash')
const Device = require('./device')
Device.methods(['get', 'post', 'put', 'delete'])
Device.updateOptions({new: true, runValidators: true})

Device.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext)

function sendErrorsOrNext(req, res, next) {
  const bundle = res.locals.bundle
  if(bundle.errors) {
    var errors = parseErrors(bundle.errors)
    res.status(500).json({errors})
  } else {
    next()
  }
}

function parseErrors(nodeRestfulErrors) {
  const errors = []
  _.forIn(nodeRestfulErrors, error => errors.push(error.message))
  return errors
}

Device.route('count', (req, res, next)=> {
  Device.count(function(error, value) {
      if(error) {
        res.status(500).json({errors: [error]})
      } else {
        res.json({value})
      }
    })
})

Device.route('get_lista_especifica', (req, res, next) =>
{
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Informe o código do pais, estado e municipio.',
        })
    }
    
    Device.find({$and:[{codigo_pais: body.codigo_pais}, {codigo_estado:body.codigo_estado}, {codigo_municipio:body.codigo_municipio}]},
    (err, deviceList)=>{
                if (err) {
                    return res.status(400).json({ result: false, message: err })
                }

                if(!deviceList){
                    return res
                  .status(404)
                  .json({ result: false, message: `Dispositivos não encontrados` })
                }else{
                    return res.status(200).json({result: true, data: deviceList})
                }
            }           
    )
})

module.exports = Device