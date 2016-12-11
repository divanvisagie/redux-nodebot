import express from 'express'

function logRequest(req) {
  console.log('-----------------------------------')
  console.log(
    req.connection.remoteAddress,
    req.headers['user-agent'],
    req.url,
    req.params
  );
  console.log('-----------------------------------')
}

var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg
var ARGUMENT_NAMES = /([^\s,]+)/g
function getParamNames(func) {
  var fnStr = func.toString().replace(STRIP_COMMENTS, '')
  var result = fnStr.slice(
    fnStr.indexOf('(')+1,
    fnStr.indexOf(')')
  ).match(ARGUMENT_NAMES)
  if(result === null) {
     result = []
  }
  return result
}


export default function httpEndpoint({store, actions}) {

  const app = express()

  let endpoints = Object.keys(actions).map(key => {
    const parameters = getParamNames(actions[key])
    const httpParams = parameters.map(x => `:${x}`).join('/')
    return {
      function: key,
      path: `/${key}/${httpParams}`,
      params: parameters
    }
  })

  endpoints.forEach((endpoint) => {
    app.use(endpoint.path, (req, res) => {
      logRequest(req)
      const parameters =
            endpoint.params.map(x => req.params[x])
      const result = actions[endpoint.function].apply(this, parameters)
      res.send(result || 'success')
    })
  })

  app.listen(1337)
}
