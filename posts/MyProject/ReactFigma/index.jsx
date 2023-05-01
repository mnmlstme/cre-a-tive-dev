// module Kram_160b9720_ReactFigma (JSX)
import React from 'react'
import { AppRegistry } from 'react-native'
const Redux = require('redux')
import Im from 'immutable'
import { Provider, connect } from 'react-redux'
import {StyleSheet,Text,View} from 'react-native'

const tagStyles = StyleSheet.create({
  root: {
    backgroundColor: "#423248",
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  content: {
    color: "white",
    fontFamily: 'Verdana, Futura, "Trebuchet MS", sans-serif',
  },
});


const Program = ({ name }) => ({
  "0": () => (<><Text className="hi">Hello, {name}</Text>
</>),
"1": () => (<><View style={tagStyles.root}>
  <Text style={tagStyles.content}>Tag Text</Text>
</View>
</>)
})

const mapStateToProps = state =>
  ( {
      name: state.get('name')
    } )

export function mount (mountpoint, initial) {

  const init = Im.Map(initial)
  const store = Redux.createStore(update)
  const props = Object.assign(
    mapStateToProps(store.getState()),
    {dispatch: store.dispatch}
  )

  const krumbs = Program(props)

  return (n, container) => {
    const appname = ['Scene', n].join('-')
    AppRegistry.registerComponent(appname, () => krumbs[n-1])
    AppRegistry.runApplication(appname, { rootTag: container })
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
