

export default function actionsFactory(store) {
  return {
    on() {
      store.dispatch({ type: 'ON' })
    },
    off() {
      store.dispatch({ type: 'OFF' })
    },
    toggle() {
      store.dispatch({ type: 'TOGGLE' })
    }
  }
}
