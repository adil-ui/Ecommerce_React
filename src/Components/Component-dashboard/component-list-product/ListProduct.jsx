import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { API_URL } from '../../../config/constants';
import Pagination from '../../Pagination/Pagination';
import './ListProduct.css'

const ListProduct = () => {
    const [products, setProducts] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        fetch(API_URL + "api/products/1", {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(response => response.json())
            .then(result => {
                setProducts(result.products);
            })
    }, [])

    const deleteProduct = (id) => {
        axios.delete(API_URL + 'api/delete/' + id, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
            .then(() => {
                window.location.reload();
            });
    }

    return (
        <div className='all_product'>
            <div className=' mb-4'>
                <Link to="/admin/add-product" className='btn btn-success  px-3 '><i className="bi bi-plus align-middle"></i> Add Product</Link>
            </div>
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
            <Pagination
                setElements={setProducts}
                elementName="products"
                url={"api/products/"}
                allElementsUrl={"api/all-product"}
            />
            {/*<nav aria-label="..." className='mt-5 pagination_product'>
                <ul className="pagination ">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <span onClick={previous} class="page-link">Previous</span>
                    </li>
                    {new Array(numberPages).fill(0).map((elt, index) => (
                        <li key={index} className={`page-item ${(index + 1) === currentPage ? "active" : ""}`} aria-current="page">
                            <span onClick={() => goToPage(index + 1)} className="page-link">{index + 1}</span>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === numberPages ? "disabled" : ""}`}>
                        <span className="page-link" onClick={next}>Next</span>
                    </li>
                </ul>
                    </nav>*/}
        </div>
    )
}

export default ListProduct