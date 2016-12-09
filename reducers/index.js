import { combineReducers } from 'redux'
import counter from './counter'
import led from './led'

export default combineReducers({
  counter,
  led
})
