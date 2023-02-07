import './Cart.css'
import { useCart } from "react-use-cart";
import { NavLink } from 'react-router-dom';
import { API_URL } from '../../config/constants';
import { useEffect } from 'react';

const Cart = () => {
    const {
        items,
        updateItemQuantity,
        removeItem,
        cartTotal,
        totalItems

    } = useCart();
    useEffect(() => {
        window.scroll(0, 0);
    }, [])
    return (
        <section className='myCart mt-5 py-5'>
            <div className=" container mx-auto row d-flex justify-content-between ">
                <div className="cartItem col-8 bg-white rounded-1 py-2 shadow-sm">
                    <h4 className='fw-semibold m-3'>Cart ({totalItems})</h4>
                    {items.map(item => (
                        <div className="col-12 mt-2 p-4 shadow-sm" key={item.id}>
                            <div className="row">
                                <div className="col-3">
                                    <img src={`${API_URL}${item.picture}`} alt="" className="cart_img" />
                                </div>
                                <div className="col-6">
                                    <h5 className="fw-bolder mb-3">{item.title} </h5>
                                    <small className="col-11 description">{item.description.substring(1, 120)}... </small>
                                </div>
                                <div className="col-3 text-end">
                                    <h4 className="text-warning fw-semibold">{item.price}.00 Dh</h4>
                                    <h5 className="text-success "> -{item.discount_rate}%</h5>
                                    <h6 className="text-danger "><del>{item.promotion_price}.00 Dh</del> </h6>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between mt-3">
                                <div>
                                    <button onClick={() => removeItem(item.id)} className="btn btn-danger px-4 fw-semibold"><i
                                        className="bi bi-trash3-fill me-1 align-midlle "></i> Delete</button>
                                </div>
                                <div>
                                    <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)} className="btn btn-warning fw-semibold">-</button>
                                    <span className="px-3 fw-semibold">{item.quantity}</span>
                                    <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)} className="btn btn-warning fw-semibold">+</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="cartItem col-3 bg-white rounded-1 p-4 shadow-sm">
                    <h5 className="fw-bolder mb-3">Cart Summary </h5>
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="my-4 fw-semibold">Total: </h5>
                        <h4 className="text-warning fw-semibold">{cartTotal}.00 Dh</h4>
                    </div>
                    <NavLink to='/order' className="btn btn-warning fw-semibold">Command</NavLink>
                </div>
            </div>
        </section>

    )
}

export default Cart