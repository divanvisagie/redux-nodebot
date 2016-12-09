import { createStore } from 'redux'
import reducer from './reducers/index'
import initializeBoard from './board'
import express from 'express'
import actionsFactory from './actions'

let store = createStore(reducer)
const actions = actionsFactory(store)
initializeBoard(store)

function logRequest(req) {
  console.log('-----------------------------------')
  console.log(req.connection.remoteAddress, req.headers['user-agent'], req.url);
  console.log('-----------------------------------')
}

const app = express()

for (const key in actions) {
  app.use(`/${key}`, (req, res) => {
    logRequest(req)
    actions[key]()
    res.send(store.getState().led)
  })
}

app.listen(1337)
