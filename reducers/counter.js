export default function counter(state = 0, action) {
  console.log(action)

  const strat = {
    'INC': () => state + 1,
    'DEC': () => state - 1
  }

  return strat[action.type] && strat[action.type]() || state
}
