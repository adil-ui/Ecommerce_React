import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { API_URL } from '../../../config/constants';
var localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat)

const AllOrders = () => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        axios.get(API_URL + "api/all-orders")
            .then(response => {
                setOrders(response.data.orders)
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col" class="fs-6">#</th>
                    <th scope="col" class="fs-6">Customer</th>
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
                        <td className='pt-4' >{order.user.name}</td>
                        <td className='pt-4'>{order.total}.00 Dh</td>
                        <td className='pt-4'>{order.payment_method} </td>
                        <td className='pt-4'>{dayjs(order.created_at).format("L")}</td>
                        <td>
                            <NavLink to={`/admin/order-details/${order.id}`} className="btn btn-warning">Details</NavLink>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default AllOrders