import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../config/constants';
import './Register.css'

const Register = () => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [picture, setPicture] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("address", address);
        formData.append("phone", phone);
        formData.append("picture", picture);
        formData.append("email", email);
        formData.append("password", password);
        try {
          const res = await axios.post(API_URL + "api/register", formData);
          console.log(res.data);
            /*setName("");
            setAddress("");
            setPhone("");
            setPicture("");
            setEmail("");
            setPassword("");
            setMessage("User created successfully");*/
            navigate('/login');
        } catch (err) {
            setMessage(err.message);
            console.log(err.response);
        }
      };

    return(       
        <section class="container row  mx-auto mt-5 py-3">
            <div class="hero_left col-5 d-flex align-items-center px-5 mt-3">
                <div>
                    <h2 class="text-white fw-bold mb-4 ">Welcome</h2>
                    <h2 class="text-white fw-bold mb-4 hero_left_title stroke-text">We Are OnlineShop</h2>
                    <h4 class="text-white fw-bold mb-4 ">Register Now <i class="bi bi-arrow-right fs-4 ms-2 align-middle"></i></h4>
                </div>
            </div>
            <form class="row g-3 col-6 ms-auto mt-0" onSubmit={handleSubmit} encType="multipart/form-data">
                <div class="ms-auto col-md-11 ">
                <label class="form-label">Full Name <span class="text-danger">*</span></label>
                <input type="text" class="form-control" name='name' value={name} onChange={(e) => setName(e.target.value)} required  />
                </div>
                <div class="ms-auto col-md-11 ">
                    <label class="form-label">Address <span class="text-danger">*</span></label>
                    <input type="text" class="form-control"  name='address' value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>
                <div class="ms-auto col-md-11 ">
                    <label class="form-label">Phone <span class="text-danger">*</span></label>
                    <input type="number" class="form-control"  name='phone' value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <div class="ms-auto col-md-11">
                    <label for="formFile" class="form-label">Picture</label>
                    <input class="form-control" type="file" id="formFile" name="picture" onChange={(e) => setPicture(e.target.files[0])} />
                </div>
                <div class="ms-auto col-md-11 ">
                    <label class="form-label">Email <span class="text-danger">*</span></label>
                    <input type="email" class="form-control"  name='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div class="ms-auto col-md-11 ">
                    <label class="form-label">Password <span class="text-danger">*</span></label>
                    <input type="password" class="form-control"  name='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="message">{message ? <p>{message}</p> : null}</div>
                <div class="ms-auto col-11">
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </form>
        </section>
    )
}

export default Register