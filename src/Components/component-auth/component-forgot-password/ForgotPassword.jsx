import axios from 'axios';
import { useState } from 'react'
import { API_URL } from '../../../config/constants';
import Footer from '../../component-footer/Footer'
import './ForgotPassword.css'

const ForgotPassword = () => {
    const [email, setEmail] = useState();
    const [message, setMessage] = useState();
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(API_URL + 'api/forgot-password', { email })
            setMessage(res.data.success)
        } catch (error) {
            setMessage(error.response.data.error);
        }

    }
    return (
        <>
            <section className="container row  mx-auto mt-5 py-5">
                <div className="hero_left col-5 d-flex align-items-center px-5 mt-3">
                    <div>
                        <h2 className="text-white fw-bold mb-4 ">Welcome</h2>
                        <h2 className="text-white fw-bold mb-4 hero_left_title stroke-text">We Are OnlineShop</h2>
                        <h4 className="text-white fw-bold mb-4 ">Login Now <i className="bi bi-arrow-right fs-4 ms-2 align-middle"></i></h4>
                    </div>
                </div>
                <div className="login col-5 mx-auto d-flex align-items-center">
                    <form onSubmit={onSubmit} className="row g-3 col-8 mx-auto ">
                        <h4 className='text-center fw-bold mb-4 text-warning'>Forgot Password</h4>
                        <div className="mb-2 ">
                            <label className="form-label fw-semibold">Email <span class="text-danger">*</span></label>
                            <input type="email" className="form-control" name='email' value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>
                        <div className="message">{message ? <p>{message}</p> : null}</div>
                        <div className="mt-4">
                            <button type="submit" className="btn btn-warning col-12 fw-semibold px-4">Submit</button>
                        </div>
                    </form>
                </div>
            </section>
            <Footer />
        </>

    )
}

export default ForgotPassword