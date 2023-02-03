import axios from 'axios';
import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../config/constants';
import AuthContext from '../../../context/auth-context';
import './Login.css'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const { setUser } = useContext(AuthContext);

    const navigate = useNavigate();

    let clickLogin = async (e) => {
        e.preventDefault();
        try {
          let res = await axios.post(API_URL + "api/login", { email, password})
          setUser(res.data);
          localStorage.setItem('user', JSON.stringify(res.data));
          navigate('/home')
        } catch (err) {
          console.log(err);
          setMessage('User not Found');
        }
      };
    return(
        <section className="container row  mx-auto mt-5 py-3">
            <div className="hero_left col-5 d-flex align-items-center px-5 mt-3">
                <div>
                    <h2 className="text-white fw-bold mb-4 ">Welcome</h2>
                    <h2 className="text-white fw-bold mb-4 hero_left_title stroke-text">We Are OnlineShop</h2>
                    <h4 className="text-white fw-bold mb-4 ">Register Now <i className="bi bi-arrow-right fs-4 ms-2 align-middle"></i></h4>
                </div>
            </div>
            <div className="login col-5 mx-auto">
                <form onSubmit={clickLogin} className="row g-3 col-8 mx-auto mt-5 pt-5">
                    <div className="mb-2 ">
                        <label className="form-label fw-semibold">Email</label>
                        <input type="email" className="form-control"  name='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="">
                        <label className="form-label fw-semibold">Password</label>
                        <input type="password" className="form-control"  name='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>               
                    <div className="message">{message ? <p>{message}</p> : null}</div>
                    <div className="mt-4 d-flex justify-content-between align-items-center">
                        <button type="submit" className="btn btn-primary fw-semibold px-4">Connect</button>
                        <NavLink to={'/register'} className="text-primary fw-semibold">Register ?</NavLink>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Login