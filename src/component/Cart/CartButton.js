import React, { useState } from 'react'
import Button from '../Button/Button'
import CartModal from './CartItems';
import InventoryContext from "../Store/InvertoryContext";
import { useContext } from "react";
import './CartButton.css'

function CartButton() {
  const [orderInCart, setOrderInCart] = useState(false);
    
 const MedsCtx = useContext(InventoryContext);
 
 const { addToCart } = MedsCtx;
let cartQty = addToCart.length

const handleCartModal=()=>{
  setOrderInCart(!orderInCart)
}


  return (
    <div className='modal-cart'>
      <h1>Inventory</h1>
      {!orderInCart && <CartModal onClick={handleCartModal} />}
      <Button type="button" onClick={handleCartModal} className="cart-btn">
        Open-Cart<span>{cartQty}</span>
      </Button>
    </div>
  );
}

export default CartButton