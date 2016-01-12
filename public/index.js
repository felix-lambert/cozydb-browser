(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = ({}).hasOwnProperty;

  var endsWith = function(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  };

  var _cmp = 'components/';
  var unalias = function(alias, loaderPath) {
    var start = 0;
    if (loaderPath) {
      if (loaderPath.indexOf(_cmp) === 0) {
        start = _cmp.length;
      }
      if (loaderPath.indexOf('/', start) > 0) {
        loaderPath = loaderPath.substring(start, loaderPath.indexOf('/', start));
      }
    }
    var result = aliases[alias + '/index.js'] || aliases[loaderPath + '/deps/' + alias + '/index.js'];
    if (result) {
      return _cmp + result.substring(0, result.length - '.js'.length);
    }
    return alias;
  };

  var _reg = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (_reg.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';
    path = unalias(name, loaderPath);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has.call(cache, dirIndex)) return cache[dirIndex].exports;
    if (has.call(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  require.list = function() {
    var result = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  require.brunch = true;
  require._cache = cache;
  globals.require = require;
})();
require.register("index", function(exports, require, module) {
var Model, request;

request = require('./utils/http');

Model = (function() {
  function Model() {}

  Model.prototype.create = function(attributes, callback) {
    var options;
    options = {
      method: 'POST',
      url: '/ds-api/data/',
      attributes: attributes
    };
    return request(options, function(err, body) {
      if (err) {
        alert(err);
      } else {
        console.log(body);
      }
      return callback(err, body);
    });
  };

  return Model;

})();

module.exports.getModel = function(doctypeName, fields) {
  return new Model();
};


/*

cozydb = require './path/to/cozydb-browser'

Contact = cozydb.getModel 'Contact', {}

Contact.create data, (err, body) ->
    console.log err, body
 */
});

;require.register("utils/http", function(exports, require, module) {
module.exports = function(options, callback) {
  var attributes, method, url, xhr;
  method = options.method || "GET";
  url = options.url, attributes = options.attributes;
  xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.onload = function() {
    return callback(null, xhr.response);
  };
  xhr.onerror = function(err) {
    err = "Request failed: " + err.target.status;
    return callback(err);
  };
  return window.addEventListener("message", function(event) {
    var intent, token;
    intent = event.data;
    xhr.setRequestHeader("Content-Type", "application/json");
    token = btoa(intent.appName + ":" + intent.token);
    xhr.setRequestHeader("Authorization", "Basic " + token);
    if (attributes != null) {
      return xhr.send(JSON.stringify(attributes));
    } else {
      return xhr.send();
    }
  }, true);
};
});

;
//# sourceMappingURL=index.js.map