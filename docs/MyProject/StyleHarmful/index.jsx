// module Kram_a90f946a_StyleHarmful (JSX)
import React from 'react'
import { createRoot } from 'react-dom/client'
const Redux = require('redux')
import Im from 'immutable'
import { Provider, connect } from 'react-redux'



export function Program (css) {
  

  return ({ btnText }) => ({
    
  })
}

const mapStateToProps = state =>
  ( {
      btnText: state.get('btnText')
    } )

export function mount (mountpoint, initial) {

  const init = Im.Map(initial)
  const store = Redux.createStore(update)
  const props = Object.assign(
    mapStateToProps(store.getState()),
    { dispatch: store.dispatch }
  )
  const css = typeof CssModule !== "undefined" ? CssModule.locals : {}

  const krumbs = Program(css)(props)

  return (n, container) => {
    const root = createRoot(container)
    root.render(React.createElement(krumbs[n-1]), container)
  }

  function update (state = init, action = {}) {
      let value = state.get('value')
      switch (action.type) {
          case 'Increment':
              console.log('increment', state)
              return state.set('value', value + 1)
          case 'Decrement':
              console.log('decrement', state)
              return state.set('value', value - 1)
          default:
              return state
      }
  }
}
