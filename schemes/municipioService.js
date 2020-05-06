const _  = require('lodash')
const Municipio = require('./municipio')

Municipio.methods(['get', 'post', 'put', 'delete'])

Municipio.updateOptions({new: true, runValidators: true})


Municipio.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext)

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

Municipio.route('count', (req, res, next)=> {
    Municipio.count(function(error, value) {
      if(error) {
        res.status(500).json({errors: [error]})
      } else {
        res.json({value})
      }
    })
})
module.exports = Municipio