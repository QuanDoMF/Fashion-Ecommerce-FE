
import React, { useRef, useState, useEffect } from "react";
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";
import nav_dropdown from "../Assets/nav_dropdown.png"
import { cartSelector } from "../../redux-toolkit/selector";
import cartSlice from "../../slices/cartSlice";
import { login } from "../../slices/authSlice";
const Navbar = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const cart = useSelector(cartSelector)
  const username = localStorage.getItem('username');
  const [menu, setMenu] = useState("")
  useEffect(() => {
    // Khi location thay đổi, cập nhật menu tương ứng
    switch (location.pathname) {
      case '/mens':
        setMenu('mens');
        break;
      case '/womens':
        setMenu('women');
        break;
      case '/kids':
        setMenu('kids');
        break;
      default:
        setMenu('shop');
    }
  }, [location.pathname]);
  const menuRef = useRef()
  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible')
    e.target.classList.toggle('open')
  }
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('auth-token');
    dispatch(cartSlice.actions.resetCart())
  };
  return (
    <div className="custom-navbar">
      <Link className="text-decoration-none" to={'/'}>
        <div className="nav-logo d-flex align-items-center justify-content-center">
          <span className="mb-1"><img src={logo} alt="" /></span>
          <span>SHOPPER</span>
        </div>
      </Link>
      <img className="nav-dropdown" onClick={dropdown_toggle} src={nav_dropdown} alt="" />
      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => setMenu("shop")}><Link style={{ textDecoration: 'none' }} to='/'>Shop</Link>{menu === "shop" ? <hr /> : ''} </li>
        <li onClick={() => setMenu("mens")}><Link style={{ textDecoration: 'none' }} to='/mens'>Men</Link>{menu === "mens" ? <hr /> : ''}</li>
        <li onClick={() => setMenu("women")}><Link style={{ textDecoration: 'none' }} to='/womens'>Women</Link>{menu === "women" ? <hr /> : ''}</li>
        <li onClick={() => setMenu("kids")}><Link style={{ textDecoration: 'none' }} to='/kids'>Kids</Link>{menu === "kids" ? <hr /> : ''}</li>
      </ul>
      <div className="nav-login-cart">
        {isLoggedIn ? (
          <>
            <span className="nav-username">
              <span className="username-text">Welcome: {username}</span>
            </span>

            <Link to='/login'><button onClick={handleLogout}>Logout</button></Link>
          </>

        ) : <Link to='/login'><button>Login</button></Link>
        }
        <Link to='/cart'> <img src={cart_icon} alt="" /></Link>
        {cart?.cartDetails?.length > 0 && (
          <div className="nav-cart-count">{cart?.cartDetails?.length}</div>
        )}
      </div>
    </div>
  )
}
export default Navbar