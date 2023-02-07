import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { API_URL } from '../../../config/constants';
import './ListProduct.css'

const ListProduct = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch(API_URL + "api/all-product")
            .then(response => response.json())
            .then(result => {
                setProducts(result.products);

            })
    }, [])

    const deleteProduct = (id) => {
        axios.delete(API_URL + 'api/delete/' + id)
            .then(() => {
                window.location.reload();
            });
    }
    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col" className="fs-6">#</th>
                    <th scope="col" className="fs-6">Picture</th>
                    <th scope="col" className="fs-6">Title</th>
                    <th scope="col" className="fs-6">Price</th>
                    <th scope="col" className="fs-6">Discount</th>
                    <th scope="col" className="fs-6">Promo Price</th>
                    <th scope="col" className="fs-6">action</th>
                </tr>
            </thead>
            <tbody>
                {products.map(product => (
                    <tr>
                        <th className='pt-4' scope="row">{product.id}</th>
                        <td className=''><img src={`${API_URL}${product.picture}`} alt="product_img" width="50" height="50" className="rounded-circle mx-auto" /></td>
                        <td className='pt-4'>{product.title}</td>
                        <td className='pt-4'>{product.price}.00 Dh</td>
                        <td className='pt-4'>{product.discount_rate}%</td>
                        <td className='pt-4'>{product.promotion_price}.00 Dh</td>
                        <td className='pt-3'>
                            <NavLink to={`/admin/edit-product/${product.id}`} className="btn btn-warning me-1">Edit</NavLink>
                            <button onClick={() => deleteProduct(product.id)} className="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default ListProduct