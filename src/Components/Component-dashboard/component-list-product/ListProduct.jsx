import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { API_URL } from '../../../config/constants';
import AuthContext from '../../../context/auth-context';
import './ListProduct.css'

const ITEMS_PER_PAGE = 5;

const ListProduct = () => {
    const [products, setProducts] = useState([]);
    const [numberPages, setNumberPages] = useState(0);
    const [currenPage, setCurrentPage] = useState(1);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        axios.get(API_URL + "api/all-product", {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
            .then(result => {
                setNumberPages(Math.ceil(result.data.products.length / ITEMS_PER_PAGE));
            })
        fetch(API_URL + "api/products/" + currenPage, {
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

    const previous = () => {
        let newPage = currenPage - 1;
        setCurrentPage(newPage);
        axios.get(API_URL + "api/products/" + newPage, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }).then(result => {
            setProducts(result.data.products);
        })
    };

    const next = () => {
        let newPage = currenPage + 1;
        setCurrentPage(newPage);
        fetch(API_URL + "api/products/" + newPage, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(response => response.json())
            .then(result => {
                setProducts(result.products);
            })
    };

    const goToPage = (page) => {
        setCurrentPage(page);
        fetch(API_URL + "api/products/" + page, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(response => response.json())
            .then(result => {
                setProducts(result.products);
            })
    };
    return (
        <div>
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
            <nav aria-label="..." className='mt-5'>
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${currenPage === 1 ? "disabled" : ""}`}>
                        <button onClick={previous} class="page-link">Previous</button>
                    </li>
                    {new Array(numberPages).fill(0).map((elt, index) => (
                        <li key={index} className={`page-item ${(index + 1) === currenPage ? "active" : ""}`} aria-current="page">
                            <span onClick={() => goToPage(index + 1)} className="page-link">{index + 1}</span>
                        </li>
                    ))}
                    <li className={`page-item ${currenPage === numberPages ? "disabled" : ""}`}>
                        <button className="page-link" onClick={next}>Next</button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default ListProduct