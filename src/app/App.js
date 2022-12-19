import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import Product from '../features/product/Product'
import RouteNavigation from '../routeNavigation'
import Header from '../components/Header'

function App () {
  return (
    <Provider store={store} >
      <RouteNavigation />
    </Provider>
  )
}

export default App
