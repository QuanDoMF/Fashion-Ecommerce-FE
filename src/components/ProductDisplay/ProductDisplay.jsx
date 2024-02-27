
import React from "react";
import "./ProductDisplay.css"
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { useNavigate } from 'react-router-dom'
// import { fetchProductThunkAction } from "../../slices/productsSlice";
// import { productListSelector } from "../../redux-toolkit/selector";
import { useDispatch } from "react-redux";
import cartSlice from "../../slices/cartSlice";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ProductDisplay = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { product } = props;

  const handleAddToCart = () => {
    const isLoggedIn = localStorage.getItem('auth-token') ? true : false;
    if (isLoggedIn) {
      dispatch(cartSlice.actions.addToCart(product))
      toast.success(`${product.name} added to cart`, { autoClose: 500 })
    }
    else {
      Swal.fire({
        title: 'Authentication Required',
        text: 'Please login or register to add items to cart.',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: 'rgb(214 48 48)',
        cancelButtonColor: '#000000',
        confirmButtonText: 'Login',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login')
        }
      });
    }
  }
  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-img">
        <img className="productdisplay-main-img" src={product.image} alt="" />
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-star">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">${product.old_price}</div>
          <div className="productdisplay-right-price-new">${product.new_price}</div>
        </div>
        <div className="productdisplay-right-description">
          A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves,
          worn as an undershirt or outer garment
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <button onClick={() => handleAddToCart(product)}>ADD TO CART</button>
        <p className="productdisplay-right-category">
          <span>Category :</span>Women, T-Shirt, Crop Top
        </p>
        <p className="productdisplay-right-category">
          <span>Tags :</span>Modern, Latest
        </p>
      </div>
    </div>
  )
}
export default ProductDisplay