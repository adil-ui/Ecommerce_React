import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../config/axios';
import { API_URL } from '../../../config/constants';

const OrderDetails = () => {
    const params = useParams();
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        axiosInstance.get("api/order-details/" + params.id)
            .then(response => setOrders(response.data.orderItems))
            .catch(error => {
                console.log(error);
            })
    }, [])
    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col" class="fs-6">#</th>
                    <th scope="col" class="fs-6">Picture</th>
                    <th scope="col" class="fs-6">Title</th>
                    <th scope="col" class="fs-6">Quantity</th>
                    <th scope="col" class="fs-6">Price</th>
                    <th scope="col" class="fs-6">Total Price</th>
                </tr>
            </thead>
            <tbody>
                {orders.map(order => (
                    <tr>
                        <th className='pt-4' scope="row">{order.id}</th>
                        <td className='pt-3'><img src={`${API_URL}${order.picture}`} alt="product_img" width="50" height="50" className="rounded-circle mx-auto" /></td>
                        <td className='pt-4'>{order.title}</td>
                        <td className='pt-4 '>{order.qty} </td>
                        <td className='pt-4'>{order.unique_price} Dh</td>
                        <td className='pt-4'>{order.total_price} Dh</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default OrderDetails