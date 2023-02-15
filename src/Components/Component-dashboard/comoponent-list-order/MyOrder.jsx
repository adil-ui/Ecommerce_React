import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { API_URL } from '../../../config/constants';
import './MyOrder.css'
var localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat)


const MyOrder = () => {
    const [orders, setOrders] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        axios.get(API_URL + "api/list-orders/" + user.id)
            .then(response => setOrders(response.data.orders))
            .catch(error => {
                console.log(error);
            })
    }, [])

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col" class="fs-6">#</th>
                    <th scope="col" class="fs-6">Total</th>
                    <th scope="col" class="fs-6">Payment Method</th>
                    <th scope="col" class="fs-6">Date</th>
                    <th scope="col" class="fs-6">action</th>
                </tr>
            </thead>
            <tbody>
                {orders.map(order => (
                    <tr>
                        <th className='pt-4' scope="row">{order.id}</th>
                        <td className='pt-4'>{order.total}.00 Dh</td>
                        <td className='pt-4'>{order.payment_method} </td>
                        <td className='pt-4'>{dayjs(order.created_at).format("L")}</td>
                        <td>
                            <NavLink to={`/admin/order-details/${order.id}`} className="btn btn-warning ">Details</NavLink>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default MyOrder