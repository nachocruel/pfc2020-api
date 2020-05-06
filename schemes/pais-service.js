const Pais = require('./pais')
const _  = require('lodash')


Pais.methods(['get', 'post', 'put', 'delete'])

Pais.updateOptions({new: true, runValidators: true})


Pais.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext)

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

Pais.route('count', (req, res, next)=> {
    Pais.count(function(error, value) {
      if(error) {
        res.status(500).json({errors: [error]})
      } else {
        res.json({value})
      }
    })
})
module.exports = Pais