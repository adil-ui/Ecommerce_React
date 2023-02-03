import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../config/constants';
import './ListOrder.css'

const ListOrder = () =>{
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetch(API_URL + "api/all-orders")
        .then(response => response.json())
        .then(result =>{
            setOrders(result.orderItems);
             
        })
      }, [])
      const navigateTo = (item) => {
        navigate(`${item.id}`)
    }
    return(        
        <table className="table table-hover">
            <thead>
            <tr>
                    <th scope="col" class="fs-6">#</th>
                    <th scope="col" class="fs-6">Picture</th>
                    <th scope="col" class="fs-6">Title</th>
                    <th scope="col" class="fs-6">Quantity</th>
                    <th scope="col" class="fs-6">Price</th>
                    <th scope="col" class="fs-6">Total Price</th>
                    <th scope="col" class="fs-6">action</th>
                </tr>
            </thead>
            <tbody>
            {orders.map(order => (
                <tr>
                    <th className='pt-4' scope="row">{order.id}</th>
                    <td className='pt-3'><img src={`${API_URL}${order.picture}`} alt="product_img" width="50" height="50" className="rounded-circle mx-auto" /></td>
                    <td className='pt-4'>{order.title}</td>
                    <td className='pt-4'>{order.qty} </td>
                    <td className='pt-4'>{order.unique_price} Dh</td>
                    <td className='pt-4'>{order.total_price} Dh</td>
                    <td>
                        <a href="/edit-product" onClick={() => navigateTo(order)} className="btn btn-warning me-1">Edit</a>
                        <a href="/delete-product" className="btn btn-danger">Delete</a>
                    </td>
                </tr>
            ))}                    
            </tbody>
        </table>
    )
}

export default ListOrder