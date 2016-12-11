const initialLedState = {
  on: false,
  value: 0
}

function setLedValue(currentState, value) {
  currentState.value = value
  if (currentState.value > 0) {
    currentState.on = true
  } else {
    currentState.on = false
  }
  return currentState
}

function toggleState(state) {
  if (state.on === true) {
    return setLedValue(state, 0)
  } else {
    return setLedValue(state, 255)
  }
}

export default function led(state = initialLedState, action) {


  switch (action.type) {
    case 'ON':
      return setLedValue(state, 255)
    case 'OFF':
      return setLedValue(state, 0)
    case 'TOGGLE':
      return toggleState(state)
    default:
      return state
  }

}
