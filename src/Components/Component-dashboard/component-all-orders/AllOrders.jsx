import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { API_URL } from '../../../config/constants';
import Pagination from '../../Pagination/Pagination';
var localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat)

const AllOrders = () => {
    const [orders, setOrders] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        fetch(API_URL + "api/orders/1", {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(response => response.json())
            .then(result => {
                setOrders(result.orders);
            })
    }, [])

    return (
        <div className='sectionOrder'>
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
            <Pagination
            setElements={setOrders}
            elementName="orders"
            url={"api/orders/"}
            allElementsUrl={"api/all-orders"}
            />
        </div>
    )
}

export default AllOrders