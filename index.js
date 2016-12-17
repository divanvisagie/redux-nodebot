import { createStore } from 'redux'
import reducer from './reducers/index'
import initializeBoard from './board/board'
import actionsFactory from './actions'
import httpEndpoint from './http-endpoint'
import commandParser from './command-parser/command-parser'

let store = createStore(reducer)
const actions = actionsFactory(store)
initializeBoard(store)

httpEndpoint({store, actions})


function dispatchCommandForText(text){
    const command = commandParser.getCommandForText(text)
    const action = {
        type: command.command,
    }
    store.dispatch(action)
}

dispatchCommandForText('turn the light off');
dispatchCommandForText('turn the light on')