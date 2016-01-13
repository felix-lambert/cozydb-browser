# Public: the Model constructor
module.exports.Model = Model = require './model'

# Public: the CozyModel constructor
module.exports.CozyModel = CozyModel = require './cozymodel'

{NoSchema} = require './utils/type_checking'
module.exports.NoSchema = NoSchema

module.exports.getModel = (name, schema) ->
  window.parent.postMessage({action: 'getToken'}, '*');
  # Internal: Generated Class from getModel
  klass = class ClassFromGetModel extends CozyModel
    @schema: schema

  klass.displayName = klass.name = name
  klass.toString = -> "#{name}Constructor"
  klass.docType = name

  return klass
