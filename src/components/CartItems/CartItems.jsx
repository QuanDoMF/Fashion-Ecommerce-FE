
import React, { useContext } from "react";
import "./CartItems.css"
import { ShopContext } from "../../context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png"
const CartItems = () => {
  const {all_product, cartItems, removeFromCart, getTotalCartAmount } = useContext(ShopContext)
  return (
      <div className="cartitems">
          <div className="cartitems-format-main">
              <p>Products</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
          </div>
          <hr />
          {
            all_product?.map((e) => {
              if(cartItems[e.id] > 0) {
                return (
                  <div>
                    <div className="cartitems-format cartitems-format-main">
                        <img src={e.image} alt="" className="carticon-product-icon"/>
                        <p>{e.name}</p>
                        <p>${e.new_price}</p>
                        <button className="cartitems-quantity">{cartItems[e.id]}</button>
                        <p >${e.new_price*cartItems[e.id]}</p>
                        <img className="cartitems-remove-icon" src={remove_icon} onClick={() => {removeFromCart(e.id)}} alt="" />
                    </div>
                    <hr />
                  </div>
                )
              }
              return null;
            })
          }
          <div className="cartitems-down">
              <div className="cartitems-total">
                <h1>cart Totals</h1>
                  <div>
                      <div className="cartitems-total-item">
                        <p>Subtotal</p>
                        <p>${getTotalCartAmount()}</p>
                      </div>
                      <hr />
                      <div className="cartitems-total-item">
                        <p>Shipping Free</p>
                        <p>Free</p>
                      </div>
                      <div className="cartitems-total-item">
                        <p>Total</p>
                        <p>${getTotalCartAmount()}</p>
                      </div>
                  </div>
                  <button>PRECEED TO CHECKOUT</button>
              </div>
              <div className="cartitems-promocode">
                <p>If you have a promo code, Enter it here</p>
                <div className="cartitems-promobox">
                  <input type="text"  placeholder="Promo code"/>
                  <button type="submit">Submit</button>
                </div>
              </div>
          </div>
      </div>
  )
}
export default CartItems