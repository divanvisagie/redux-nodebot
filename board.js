import five from 'johnny-five'

export default function initializeBoard(store) {

  function ledHandler({ pin }) {

    const led = new five.Led(pin)

    function getState() {
      return store.getState().led
    }

    store.subscribe(() => {
      let command = getState() ? 'on' : 'off'
      led[command]()
    })

    let command = getState() ? 'on' : 'off'
    led[command]()
  }

  const board = new five.Board()
  board.on('ready', () => {
    ledHandler(13)
  })
}
