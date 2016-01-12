request = require './utils/http'

class Model

    create: (attributes, callback) ->
        options =
            method: 'POST'
            url: '/ds-api/data/'
            attributes: attributes

        request options, (err, body) ->
            if err
                alert err
            else
                console.log body

            callback err, body


module.exports.getModel = (doctypeName, fields) ->

    return new Model()




###

cozydb = require './path/to/cozydb-browser'

Contact = cozydb.getModel 'Contact', {}

Contact.create data, (err, body) ->
    console.log err, body

###
