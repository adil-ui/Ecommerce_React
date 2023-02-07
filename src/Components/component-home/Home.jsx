import { useEffect, useState } from 'react'
import './Home.css'
import { API_URL } from '../../config/constants';
import { NavLink } from 'react-router-dom';
import {  useCart } from "react-use-cart";


const Home = () =>{
    const { addItem } = useCart();

    const [womenProduct, setWomenProduct] = useState([]);
    const [menProduct, setMenProduct] = useState([]);
    const [kidProduct, setKidProduct] = useState([]);
    useEffect(() => {
        fetch(API_URL + "api/home")
        .then(response => response.json())
        .then(result =>{
            setWomenProduct(result.womens);
            setMenProduct(result.mens);
            setKidProduct(result.kids);     
        })
      }, [])
    return(
        <section className="container mx-auto py-5 row gx-4 gy-5 mt-4" >
            <div className='hero_section row  py-5 mx-auto'> 
                <div className="hero_left col-4 d-flex align-items-center px-5 ">
                    <div>
                        <h2 className="text-white fw-bold mb-4 hero_left_title">We Are OnlineShop</h2>
                        <NavLink to="/our-product" className="btn btn-outline-light px-4 py-2 fw-semibold">Purchase Now!</NavLink>
                    </div>
                </div>
                <div className="hero_right col-8 row gx-4 ms-auto">
                    <div className="col-6 mb-2">
                        <div className="top_left d-flex align-items-center px-4" >
                            <div className="text-center mx-auto">
                                <h3 className="text-white fw-bold mb-4 ">Women</h3>
                                <p className="text-white"><i>Best Clothes For Women</i></p>
                                <NavLink to="/women" className="btn btn-outline-light">Discover More</NavLink>
                            </div>
                        </div>

                    </div>
                    <div className="col-6 mb-2">
                        <div className="top_right d-flex align-items-center px-4 ">
                            <div className="text-center mx-auto">
                                <h3 className="text-white fw-bold mb-4 ">Men</h3>
                                <p className="text-white"><i>Best Clothes For Men</i></p>
                                <NavLink to="/men" className="btn btn-outline-light">Discover More</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="bottom_left d-flex align-items-center px-4 ">
                            <div className="text-center mx-auto">
                                <h3 className="text-white fw-bold mb-4 ">Kids</h3>
                                <p className="text-white"><i>Best Clothes For Kids</i></p>
                                <NavLink to="/kid" className="btn btn-outline-light">Discover More</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="bottom_right d-flex align-items-center px-4 ">
                            <div className="text-center mx-auto">
                                <h3 className="text-white fw-bold mb-4 ">Accessories</h3>
                                <p className="text-white"><i>Best Trend Accessories</i></p>
                                <button className="btn btn-outline-light">Discover More</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <h2 className="fw-bolder">Women's Latest</h2>
            {womenProduct.map(elt =>(
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

            <h2 className="fw-bolder">Men's Latest</h2>
            {menProduct.map(elt =>(
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

            <h2 className="fw-bolder">Men's Latest</h2>
            {kidProduct.map(elt =>(
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
        </section>
    )
}

export default Home