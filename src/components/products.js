import axios from 'axios'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { addProductToCart, getItemsForStore, removeProductFromCart, setIsLoading } from '../actions/items'

const Product = () => {
  const locatation = useLocation()
  const products = locatation.pathname === '/' ? useSelector(state => state.products.products) : useSelector(state => state.products.cartItems)
  const cartItems = useSelector(state => state.products.cartItems)
  const isLoading = useSelector(state => state.products.isLoading)
  const dispatch = useDispatch();
  const canFetchProducts = useRef(true);

  useEffect(() => {
    if(canFetchProducts.current) {
    dispatch(setIsLoading(true))
    axios.get('https://dummyjson.com/products').then(response => {
      dispatch(getItemsForStore(response.data.products))
      dispatch(setIsLoading(false))
    });
canFetchProducts.current = false;
  }
  }, [])

  const onClickProduct = (product, isItemInCart) => {
    if (isItemInCart) dispatch(removeProductFromCart(product))
    else dispatch(addProductToCart(product))
  }

  if (isLoading) {
    return <div
    style={{
      display: 'flex',
      margin: 50,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
        Loading.........
    </div>
  }

  return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
            {products.length
              ? products.map(product => {
                const isItemInCart = cartItems.map(cartItem => cartItem.title).includes(product.title)
                return (
                  <div key={product.id} style={{ marginLeft: 20, padding: 40, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={product.thumbnail} height={150} width={170} style={{ padding: '30px 20px', backgroundColor: '#F0F0F0' }} alt='image'></img>
                    <div style={{ fontWeight: 600 }}>{product.title}</div>
                    <div>$ {product.price}</div>
                    <button onClick={() => onClickProduct(product, isItemInCart)} style={{ marginTop: 5, cursor: 'pointer', border: 'none', width: 'max-content', padding: '10px 30px', backgroundColor: isItemInCart ? 'lavenderblush' : '#ECFFDC' }}>{isItemInCart ? 'REMOVE' : 'ADD'}</button>
                  </div>
                )
              })
              : null}
        </div>
  )
}

export default Product
