import { createStore } from 'redux'
import reducer from './reducers/index'
import initializeBoard from './board/board'
import actionsFactory from './actions'
import httpEndpoint from './http-endpoint'

let store = createStore(reducer)
const actions = actionsFactory(store)
initializeBoard(store)

httpEndpoint({store, actions})
