import { View, Text } from 'react-native'
import { Provider } from 'react-redux'
import AppWrapper from './AppWrapper'
import store from './redux_store/store'
import React from 'react'

const App = () => {
  return (
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  )
}

export default App