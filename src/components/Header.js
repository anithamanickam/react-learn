import React from 'react'
import CartIcon from '../images/cart.png'
import { useSelector } from 'react-redux'

const Header = () => {
  const cartItems = useSelector(state => state.product.cartItems)
  const hasItemsInCart = cartItems.length > 0
  return (
        <div
            style={{
              padding: '10px 40px',
              fontSize: 20,
              backgroundColor: 'lightpink',
              fontWeight: 700,
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between'
            }}
            >
            <div style={{ cursor: 'pointer' }}>Online Shopping</div>
            <img
             src={CartIcon}
             height={40}
             width={40}
             style={{ opacity: hasItemsInCart ? 1 : 0.2, cursor: hasItemsInCart ? 'pointer' : 'not-allowed' }}>
             </img>
        </div>
  )
}

export default Header
