import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useCart } from 'react-use-cart';
import { API_URL } from '../../config/constants';
import AuthContext from '../../context/auth-context';
import Footer from '../component-footer/Footer';
import './Order.css'

const Order = () => {
    const {
        items,
        removeItem,
        cartTotal,
        totalItems,
        emptyCart

    } = useCart();
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [userName, setUserName] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [message, setMessage] = useState("");

    const { user } = useContext(AuthContext);
    useEffect(() => {
        if (user) {
            setUserName(user.name);
            setUserPhone(user.phone);
            setUserAddress(user.adress);
        }
    }, [user])
    const order = async (e) => {
        e.preventDefault();
        if (paymentMethod === "card") {
            /*const data = {
                vendor_id: 10714,
                vendor_auth_code: '45833e76c5a8584576e577259195702eee6ee310e1020bb650',
                title: 'Paiement Produits',
                webhook_url: 'https://test.com',
                prices: items.map(item => item.price),
                customer_email: user.email,
            }
            axios.post("https://stoplight.io/mocks/paddle/api-reference/30744709/2.0/product/generate_pay_link", data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .then(({ data }) => {
                }).catch(error => {
                    console.log(error);
                })*/
            const Paddle = window.Paddle;
            try {
                Paddle.Checkout.open({
                    product: 44954,
                    email: user.email,
                    successCallback: (data, err) => {
                        postData();
                    }
                });
            } catch (error) {
                console.log(error);
            }
        } else {
            postData();
        }
    }
    const postData = async () => {
        const formData = new FormData();
        formData.append("user", JSON.stringify({
            'address': userAddress,
            'phone': userPhone,
        }
        ));
        formData.append("order", JSON.stringify({
            'user_id': user.id,
            'total': cartTotal,
            'payment_method': paymentMethod,
        }
        ))
        formData.append("orderItems", JSON.stringify(items))
        try {
            const response = await axios.post(API_URL + "api/new-order", formData);
            console.log(response);
            setMessage(response.data.success);
            emptyCart();
        } catch (err) {
            setMessage(err.message);
            console.log(err);
        }
    }
    useEffect(() => {
        window.scroll(0, 0);
    }, [])
    return (
        <>
            <section className='myCart mt-5 py-5'>
                <div class=" container mx-auto row d-flex justify-content-between ">
                    <div class="col-7 bg-white shadow-sm rounded-1 py-4 myOrder">
                        <form class="row g-3 col-10 mx-auto " onSubmit={order} method='POST' encType="multipart/form-data">
                            <div class="col-md-12 mb-3">
                                <label class="form-label fw-semibold">Name</label>
                                <input type="text" class="form-control" name='name' value={userName} disabled />
                            </div>
                            <div class="col-md-12 mb-3">
                                <label class="form-label fw-semibold">Phone</label>
                                <input type="number" class="form-control" name='phone' value={userPhone} onChange={(e) => setUserPhone(e.target.value)} required />
                            </div>
                            <div class="col-md-12 mb-3">
                                <label class="form-label fw-semibold">Address</label>
                                <input type="text" class="form-control" name='address' value={userAddress} onChange={(e) => setUserAddress(e.target.value)} required />
                            </div>
                            <div class="col-md-12 mb-3">
                                <label class="form-label fw-semibold">Shipping Method</label>
                                <select class="form-select" onChange={(e) => { setPaymentMethod(e.target.value) }} aria-label="Default select example" name='checkout_method'>
                                    <option value="cash">Cash</option>
                                    <option value="paypal">Paypal</option>
                                    <option value="card">Card</option>
                                </select>
                            </div>
                            {message && <div className='alert alert-warning text-center'>{message}</div>}
                            <div class="col-md-12 d-flex justify-content-end">
                                <button type="submit" class="btn btn-warning px-4 fw-semibold  py-2 shadow-sm">Checkout</button>
                            </div>
                        </form>
                    </div>
                    <div class="col-4 bg-white shadow-sm rounded-1 px-4 myOrder">
                        <div class="pt-4">
                            <h5 class="fw-bolder mb-2 ">Order Summary </h5>
                            <div class="d-flex justify-content-between align-items-center m-0">
                                <h5 class="my-4 fw-semibold">Total: </h5>
                                <h4 class="text-warning fw-bold">{cartTotal}.00 Dh </h4>
                            </div>
                        </div>
                        <hr />
                        <h5 className='fw-semibold mb-3 '>Order ({totalItems})</h5>
                        {items.map(item => (
                            <div class="row pb-4 mb-2" key={item.id}>
                                <div class="col-4">
                                    <img src={`${API_URL}${item.picture}`} alt="order_img" class="img-fluid" />
                                </div>
                                <div class="col-8">
                                    <h6 class="fw-bold mb-2">{item.title}</h6>
                                    <h6 class="text-warning fw-bold">{item.price}.00 Dh</h6>
                                    <p class="fw-semibold text-success">Qty: {item.quantity}</p>
                                    <button onClick={() => removeItem(item.id)} class="btn btn-white p-0 m-0 fw-semibold"><i class="bi bi-trash3-fill me-1 align-midlle"></i> Delete </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </>

    )
}

export default Order