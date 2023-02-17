import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { API_URL } from '../../../config/constants';
import BreadCrumbs from '../../BreadCrumbs/BreadCrumbs';
import Footer from '../../component-footer/Footer';
import ProductCard from '../../ProductCard/ProductCard';
import './Kid.css'

const Kid = () =>{
    const [kidCategory, setkidCategory] = useState([]);
    useEffect(() => {
        fetch(API_URL + "api/kid-category")
        .then(response => response.json())
        .then(result =>{
            setkidCategory(result.kids);
             
        })
      }, [])
      useEffect(() => {
        window.scroll(0, 0);
    }, [])
    return(
        <>
        <section className='container mx-auto mt-5 pt-5'>
        <BreadCrumbs />
            <div class="Product_category  mt-5 mb-4 d-flex justify-content-center align-items-center " >
                <h2 className='category_title' class="text-white fw-bolder category_title">Check Kid's Products</h2>
            </div>
            <div class="py-5 row gx-4 gy-5">
                <h2 class="fw-bolder text-center ">Kid's Products</h2>
                <div className='text-end mb-4'>
                    <span className='fw-semibold me-2 order_by'>Order By: </span>
                    <NavLink to={''} className='text-warning fw-semibold order_by me-3'> price ascending</NavLink>
                    <NavLink to={''} className='text-warning fw-semibold order_by '> price descending </NavLink>
                </div>
                 {kidCategory.map(elt => <ProductCard elt={elt} key={elt.id} />)}
                
            </div>
        </section>
        <Footer />
        </>
    )
}

export default Kid