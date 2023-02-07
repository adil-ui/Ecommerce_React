import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from 'react-use-cart';
import { API_URL } from '../../../config/constants';
import './Men.css'

const Men = () =>{
    const { addItem } = useCart();
    const [MenCategory, setMenCategory] = useState([]);
    useEffect(() => {
        fetch(API_URL + "api/men-category")
        .then(response => response.json())
        .then(result =>{
            setMenCategory(result.mens);
             
        })
      }, [])

    
    return(
        <section className='container mx-auto mt-5 pt-4'>
            <div class="Product_category  mt-5 mb-4 d-flex justify-content-center align-items-center " >
                <h2 className='category_title' class="text-white fw-bolder category_title">Check Men's Products</h2>
            </div>

            <div class="py-5 row gx-4 gy-5">
                <h2 class="fw-bolder text-center ">Men's Products</h2>
                {MenCategory.map(elt => (
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
                                <h5 className="price_color text-bold" >{elt.promotion_price}.00 Dh</h5>
                            </div>
                            <div className="d-flex justify-content-end mt-3">
                                <button onClick={() => addItem(elt)} className="btn btn-warning fw-semibold">Add To Cart <i className="ms-2 bi bi-cart-plus-fill"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
                
            </div>
        </section>
        
    )
}

export default Men