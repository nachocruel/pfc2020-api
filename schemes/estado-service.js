const _  = require('lodash')
const Estado = require('./estado')

Estado.methods(['get', 'post', 'put', 'delete'])

Estado.updateOptions({new: true, runValidators: true})


Estado.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext)

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

Estado.route('count', (req, res, next)=> {
  Estado.count(function(error, value) {
      if(error) {
        res.status(500).json({errors: [error]})
      } else {
        res.json({value})
      }
    })
})
module.exports = Estado