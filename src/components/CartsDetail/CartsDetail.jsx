import "./CartsDetail.css"
import { useDispatch, useSelector } from "react-redux";
import { cartSelector } from "../../redux-toolkit/selector";
import cartSlice, { checkoutThunkAction } from "../../slices/cartSlice";
import { toast } from 'react-toastify'
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import { v4 as uuid } from "uuid";

const schema = yup.object({
  fullname: yup.string().required(),
  address: yup.string().required(),
  email: yup.string().required(),
  mobile: yup.string().required()
})
const CartItems = () => {
  const cart = useSelector(cartSelector)
  const dispatch = useDispatch()
  const { cartInfo, cartDetails } = cart
  const email = useSelector(state => state.auth.email);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const handleIncrementQuantity = (cartItem) => {
    dispatch(cartSlice.actions.incrementQuantity(cartItem))
    toast.success(`${cartItem.title} has increment quantity`)
  }
  const handleDescrementQuantity = (cartItem) => {
    dispatch(cartSlice.actions.descrementQuantity(cartItem))
    toast.success(`${cartItem.title} has descrement quantity`)
  }
  const handleRemoveCartItem = (cartItem) => {
    Swal.fire({
      title: "Confirm remove cart item",
      text: 'Are you sure to remove this cart item',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: "Confirm"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(cartSlice.actions.removeCartItem(cartItem))
        toast.info(`${cartItem.title} has been removed`)
      }
    })
  }
  const handleCheckoutCart = (data) => {
    Swal.fire({
      title: "Confirm checkout",
      text: 'Are you sure checkout',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: "Confirm"
    }).then((result) => {
      if (result.isConfirmed) {
        const order = {
          orderId: uuid(),
          orderInfo: {
            ...cartInfo,
            orderDate: Date.now()
          },
          orderDetails: [...cartDetails],
          customerInfo: {
            ...data
          }
        }
        dispatch(checkoutThunkAction(order))
        reset()
        toast.success('Checkout success')
      }
    })
  }
  return (
    <>
      <div className="container mt-1">
        <div className="row">
          <div className="col-md-12">
            <h3 className=" py-2">Cart Detail</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-8">
            <table className="table cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th className="text-end">Price</th>
                  <th className="text-center">Quantity</th>
                  <th className="text-end">Total</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  cartDetails?.map((cartItem) => (
                    <tr key={cartItem.id}>
                      <td style={{ maxWidth: '200px' }}>
                        <div className="d-flex align-items-center">
                          <img className="product-image" src={cartItem.image} alt="" />
                          <div className="d-inline">
                            <div className="d-block fw-bolder mb-2">{cartItem.name}</div>
                            <div className="badge py-2" style={{ backgroundColor: cartItem.color }}>{cartItem.color}</div>
                          </div>
                        </div>
                      </td>
                      <td className="text-end">
                        ${cartItem.new_price}
                      </td>
                      <td >
                        <div className="cart-quantity-wrap">
                          <div className="cart-quantity">
                            {
                              cartItem.quantity > 1 ? (
                                <span onClick={() => handleDescrementQuantity(cartItem)}>-</span>
                              ) : (
                                <span>-</span>
                              )
                            }

                            <span>{cartItem.quantity}</span>
                            <span
                              onClick={() => handleIncrementQuantity(cartItem)}
                            >+</span>
                          </div>
                        </div>

                      </td>
                      <td className="text-end">
                        ${cartItem.amount}
                      </td>
                      <td>
                        <div className="action-wrap">
                          <span className="btn-remove"
                            onClick={() => handleRemoveCartItem(cartItem)}
                          >&times;</span>
                        </div>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
            <div className="row col-md-12">
              <Link to={'/'}>
                <button className="btn btn-danger">
                  <FaArrowLeft className="me-2" />
                  Countinue shopping
                </button>
              </Link>
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-4" style={{ minWidth: '300px' }}>
            <form onSubmit={handleSubmit(handleCheckoutCart)}>
              <div className="order-summary p-3">
                <h3 className="border-bottom py-2">Order Summary</h3>
                <div className="d-flex flex-column">
                  <div className="d-flex align-items-center justify-content-between py-2">
                    <span>Subtotal</span>
                    <span className="fw-bolder">${cartInfo.subTotal}</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between py-2">
                    <span>Shipping</span>
                    <span className="fw-bolder">{`${cartInfo.shipping ? '$' + cartInfo.shipping : 'Free'}`}</span>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between border-top mt-2 py-2">
                  <span className="fs-6">Total</span>
                  <span className="fw-bolder fs-6">${cartInfo.total}</span>
                </div>
              </div>
              <div className="customer-info p-3">
                <h3 className="border-bottom py-2">Customer Info</h3>
                <div className="form-group mb-3">
                  <label className="form-label">Fullname</label>
                  <input type="text"
                    className={`form-control ${errors?.fullname?.message ? 'is-invalid' : ''}`}
                    placeholder="Fullname"
                    {...register('fullname')}
                  />
                  <span className="invalid-feedback">{errors?.fullname?.message}</span>
                </div>
                <div className="form-group mb-3">
                  <label className="form-label">Address</label>
                  <input type="text"
                    className={`form-control ${errors?.address?.message ? 'is-invalid' : ''}`}
                    placeholder="Address"
                    {...register('address')}
                  />
                  <span className="invalid-feedback">{errors?.address?.message}</span>
                </div>
                <div className="form-group mb-3">
                  <label className="form-label">Email</label>
                  <input type="text"
                    className={`form-control ${errors?.email?.message ? 'is-invalid' : ''}`}
                    value={email}
                    placeholder="Email"
                    {...register('email')}
                  />
                  <span className="invalid-feedback">{errors?.email?.message}</span>
                </div>
                <div className="form-group mb-3">
                  <label className="form-label">Mobile</label>
                  <input type="text"
                    className={`form-control ${errors?.mobile?.message ? 'is-invalid' : ''}`}
                    placeholder="Mobile"
                    {...register('mobile')}
                  />
                  <span className="invalid-feedback">{errors?.mobile?.message}</span>
                </div>
              </div>
              <div >
                <button className="btn btn-danger w-100 btn-block btn-checkout" type="submit">CHECKOUT</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <hr />
    </>
  )
}
export default CartItems