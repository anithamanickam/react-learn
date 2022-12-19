export const ADD_ITEM_TO_CART = 'Item/ADD_ITEM_TO_CART'
export const REMOVE_ITEM_FROM_CART = 'Item/REMOVE_ITEM_FROM_CART'
export const GET_ITEMS_FROM_SERVER = 'Item/GET_ITEMS_FROM_SERVER'
export const SET_LOADER = 'Item/SET_LOADER'

export const addProductToCart = (item) => {
  return {
    type: ADD_ITEM_TO_CART,
    payload: item
  }
}

export const removeProductFromCart = (item) => {
  return {
    type: REMOVE_ITEM_FROM_CART,
    payload: item
  }
}

export const getItemsForStore = (products) => {
  return {
    type: GET_ITEMS_FROM_SERVER,
    payload: products
  }
}

export const setIsLoading = (isLoading) => {
  return {
    type: SET_LOADER,
    payload: isLoading
  }
}
