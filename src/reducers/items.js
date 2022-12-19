
import { ADD_ITEM_TO_CART, GET_ITEMS_FROM_SERVER, REMOVE_ITEM_FROM_CART, SET_LOADER } from '../actions/items'

const initialState = {
  products: [],
  cartItems: [],
  isLoading: false
}

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS_FROM_SERVER:
      return { ...state, products: action.payload }
    case SET_LOADER:
      return { ...state, isLoading: action.payload }
    case ADD_ITEM_TO_CART:
      return { ...state, cartItems: [...state.cartItems, action.payload] }
    case REMOVE_ITEM_FROM_CART:
      return { ...state, cartItems: state.cartItems.filter(item => item.title !== action.payload.title) }
    default:
      return state
  }
}

export default productReducer
