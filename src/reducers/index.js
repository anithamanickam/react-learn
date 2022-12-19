import { combineReducers } from 'redux'
import productReducer from './items'

export default combineReducers({
  products: productReducer
})
