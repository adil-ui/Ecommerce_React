import { useState } from 'react';
import Footer from '../component-footer/Footer';
import './Contact.css'

const Contact = () =>{
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");
    const contact = async (e) => {
        e.preventDefault();
    };
    return(
        <>
        <section className="container row  mx-auto mt-5 py-5">
            <div className="hero_left col-5 d-flex align-items-center px-5 mt-3">
                <div>
                    <h2 className="text-white fw-bold mb-4 ">Welcome</h2>
                    <h2 className="text-white fw-bold mb-4 hero_left_title stroke-text">We Are OnlineShop</h2>
                    <h4 className="text-white fw-bold mb-4 ">Contact Now <i className="bi bi-arrow-right fs-4 ms-2 align-middle"></i></h4>
                </div>
            </div>
            <div className="login col-7 mx-auto d-flex align-items-center">
                <form onSubmit={contact} className="row g-3 col-8 mx-auto">
                <h3 className='text-center fw-bolder mb-3 text-warning'>Contact Us</h3>
                <div className="mb-2 ">
                        <label className="form-label fw-semibold">Name <span class="text-danger">*</span></label>
                        <input type="text" className="form-control" name='email' value={name} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-2 ">
                        <label className="form-label fw-semibold">Email <span class="text-danger">*</span></label>
                        <input type="email" className="form-control" name='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div class="mb-2">
                        <label class="form-label fw-semibold">Message <span class="text-danger">*</span></label>
                        <textarea name="message" class="form-control" rows="5" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea >
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

export default Contact