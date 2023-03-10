import React from 'react'
import { NavLink } from 'react-router-dom'
import { useCart } from 'react-use-cart'
import { API_URL } from '../../config/constants'

const ProductCard = ({ elt }) => {
    const { addItem } = useCart();
    console.log(elt)
    return (
        <div className="col-md-3 mt-4 mb-5">
            <div className="product_card shadow position-relative" >
                <div className="position-absolute bg-warning px-3 py-1 rounded-5 discount">-{elt.discount_rate}%</div>
                <div className="product_img">
                    <NavLink to={`/details/${elt.id}`}><img src={`${API_URL}${elt.picture}`} className="" alt="product_img" /></NavLink>
                </div>
                <div className="p-4">
                    <NavLink to={`/details/${elt.id}`}><h5 className="fw-semibold mb-3">{elt.title}</h5></NavLink>
                    <small className="">{elt.description.substring(1, 80)}...</small>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <h6 className="text-danger"><del>{elt.price}.00 Dh</del> </h6>
                        <h5 className="price_color fw-bolder" >{elt.promotion_price}.00 Dh</h5>
                    </div>
                    <div className="d-flex justify-content-end mt-3">
                        <button onClick={() => addItem(elt)} className="btn btn-warning fw-semibold">Add To Cart <i className="ms-2 bi bi-cart-plus-fill"></i></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard