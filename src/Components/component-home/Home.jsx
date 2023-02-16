import { useEffect, useState } from 'react'
import axiosInstance from '../../config/axios';
import './Home.css'
import { API_URL } from '../../config/constants';
import { NavLink } from 'react-router-dom';
import { useCart } from "react-use-cart";
import Footer from '../component-footer/Footer';
import ProductCard from '../ProductCard/ProductCard';


const Home = () => {
    const { addItem } = useCart();

    const [womenProduct, setWomenProduct] = useState([]);
    const [menProduct, setMenProduct] = useState([]);
    const [kidProduct, setKidProduct] = useState([]);
    useEffect(() => {
        axiosInstance.get("api/home")
            .then(response => {
                setWomenProduct(response.data.womens);
                setMenProduct(response.data.mens);
                setKidProduct(response.data.kids);
            })
            .catch(error => {
                console.log(error);
            });
    }, [])
    useEffect(() => {
        window.scroll(0, 0);
    }, [])
    return (
        <>
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
                {womenProduct.map(elt => <ProductCard elt={elt} key={elt.id} />)}

                <h2 className="fw-bolder">Men's Latest</h2>
                {menProduct.map(elt => <ProductCard elt={elt} key={elt.id} />)}

                <h2 className="fw-bolder">Men's Latest</h2>
                {kidProduct.map(elt => <ProductCard elt={elt} key={elt.id} />)}
            </section>
            <Footer />
        </>
    )
}

export default Home