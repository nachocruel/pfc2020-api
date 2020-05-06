const medicao = require('./medicao')
const restful = require('node-restful')
const _ = require('lodash')

const Medicao = restful.model('Medicao', medicao, 'medicao')
Medicao.methods(['get', 'post', 'put', 'delete'])

Medicao.updateOptions({new: true, runValidators: true})


Medicao.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext)

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

Medicao.route('count', (req, res, next)=> {
  Medicao.count(function(error, value) {
      if(error) {
        res.status(500).json({errors: [error]})
      } else {
        res.json({value})
      }
    })
})
module.exports = Medicao