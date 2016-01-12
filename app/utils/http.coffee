module.exports = (options, callback) ->

    method = options.method or "GET"
    {url, attributes} = options

    xhr = new XMLHttpRequest()
    xhr.open "POST", url, true

    xhr.onload = ->
        callback null, xhr.response

    xhr.onerror = (err) ->
        err = "Request failed: #{err.target.status}"
        callback err

    window.addEventListener "message", (event) ->
        intent = event.data;
        xhr.setRequestHeader "Content-Type", "application/json"
        token = btoa "#{intent.appName}:#{intent.token}"
        xhr.setRequestHeader "Authorization", "Basic #{token}"

        if attributes?
            xhr.send JSON.stringify(attributes)
        else
            xhr.send()
    , true
