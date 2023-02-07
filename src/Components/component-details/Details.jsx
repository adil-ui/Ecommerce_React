import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from 'react-use-cart';
import { API_URL } from '../../config/constants';
import './Details.css'

const Details =  () =>{
    const { addItem } = useCart();
    const params = useParams();
    const [product, setProduct] = useState(null);
    useEffect(() =>{
        fetch(API_URL +'api/details/'+params.id)
        .then(response => response.json())
        .then(result =>{
            console.log(result);
            setProduct(result.product);
        })     
      }, [])
    return(
        <section class="details row d-flex justify-content-around container mx-auto my-5 py-5">
            <div class="col-4">
                <img src={`${API_URL}${product?.picture}`} alt="product" className='details_img' />
            </div>
            <div class="col-6 d-flex flex-column justify-content-center">
                <h3 class="fw-bold ">{product?.title}</h3>
                <p class="my-4 lh-lg">{product?.description}</p>
                <h3 class="text-warning mb-3">{product?.promotion_price}.00 Dh</h3>
                <h5 class="text-danger"><del>{product?.price}.00 Dh</del></h5>
                <div class="mt-4">
                    <button onClick={() => addItem(product)} class="btn btn-warning fw-semibold">Add To Cart <i class="ms-2 bi bi-cart-plus-fill"></i></button>
                </div>
            </div>
        </section>
    )
}

export default Details