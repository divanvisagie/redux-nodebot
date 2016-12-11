

export default function actionsFactory(store) {
  return {
    on() {
      store.dispatch({ type: 'ON' })
      return store.getState().led
    },
    off() {
      store.dispatch({ type: 'OFF' })
      return store.getState().led
    },
    toggle() {
      store.dispatch({ type: 'TOGGLE' })
      return store.getState().led
    },
    brightness(value) {
      store.dispatch({
        type: 'BIGHTNESS',
        value: 150
      })
      return store.getState().led
    }
  }
}
