import five from 'johnny-five'

function ledHandler({ store, pin }) {

  //const led = new five.Led(pin)

  function getState() {
    return store.getState().led
  }

  function update() {
    console.log('hardware led:', getState())
    //led[command]()
  }

  store.subscribe(update)
  update()
}


export default function initializeBoard(store) {

  ledHandler({store, pin: 13})
  // const board = new five.Board()
  // board.on('ready', () => {
  //   ledHandler(13)
  // })
}
