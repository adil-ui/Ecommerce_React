import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from 'react-use-cart';
import { API_URL } from '../../config/constants';
import AuthContext from '../../context/auth-context';
import './Navbar.css'

const Navbar = () => {
  const { totalItems } = useCart();

  const [userName, setUserName] = useState('');
  const [userPicture, setUserPicture] = useState('');
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      setUserName(user.name);
      setUserPicture(user.picture);
    }
  }, [user])
  const logout = () => {
    axios.post(API_URL + 'api/revoke-tokens/', { id: user.id }, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
      .then(response => {
        localStorage.removeItem("user");
        setUserName("");
        setUserPicture("");
        setUser(null);
        navigate('/login')
      }).catch(error => {
        console.log(error);
      });
  }

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm fixed-top top-0">
      <div className="container">
        <NavLink to="/" className="navbar-brand fw-bolder d-flex align-items-end " ><img src="/images/logo.png" alt="logo" width="35px" className="me-2" /><span className='logo_online'>Online</span><span className='logo_shop'>Shope</span></NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav my-2 my-lg-0 ms-auto d-flex align-items-center">
            <li className="nav-item me-2">
              <NavLink className="nav-link fw-semibold" to="/">Home</NavLink>
            </li>
            <li classNameName="nav-item me-2">
              <NavLink className="nav-link fw-semibold" to="/our-product">Our Product</NavLink>
            </li>
            <li className="nav-item me-2">
              <NavLink className="nav-link fw-semibold" to="/men">Men's</NavLink>
            </li>
            <li className="nav-item me-2">
              <NavLink className="nav-link fw-semibold" to="/women">Woman's</NavLink>
            </li>
            <li className="nav-item me-2">
              <NavLink className="nav-link fw-semibold" to="/kid">Kids's</NavLink>
            </li>
            <li className="nav-item me-2">
              <NavLink className="nav-link fw-semibold" to="/contact">Contact</NavLink>
            </li>
            <li className="nav-item dropdown me-2">
              <span className="nav-link dropdown-toggle " style={{ cursor: 'pointer' }} data-bs-toggle="dropdown" aria-expanded="false">
                {user ? <><img src={API_URL + userPicture} alt="" width='40px' className='align-middle me-2 border border-2 border-warning rounded-circle' /><span className='fw-semibold user_name'>Hi, {userName}</span></> : <i className="bi bi-person-circle fs-4 "></i>}
              </span>
              <ul className="dropdown-menu">
                {user ?
                  <>
                    <li><Link className="dropdown-item nav-link py-2 px-4 fw-semibold" to="/admin"><i className="bi bi-person-lines-fill align-middle fs-5 me-2 text-warning"></i> Your Profile</Link></li>
                    <li><Link className="dropdown-item nav-link py-2 px-4 fw-semibold" to="/admin/list-order"><i className="bi bi-box2-fill align-middle fs-5 me-2 text-warning"></i> Your Orders</Link></li>
                    <li><hr class="dropdown-divider p-0 " /></li>
                    <li><span className="dropdown-item nav-link  py-2 px-4 logout fw-semibold" onClick={logout}><i className="bi bi-door-closed-fill align-middle fs-5 me-2 text-warning"></i> Log Out</span></li>
                  </>
                  : <>
                    <li><Link className="dropdown-item nav-link py-2 px-4 fw-semibold" to="/login"><i className="bi bi-door-open-fill align-middle fs-5 me-2 text-warning"></i> Login</Link></li>
                    <li><Link className="dropdown-item nav-link py-2 px-4 fw-semibold" to="/register"><i className="bi bi-person-fill-add align-middle fs-5 me-2 text-warning"></i> Register</Link></li>
                  </>
                }
              </ul>
            </li>
            <li className="nav-item position-relative">
              <NavLink className="nav-link" to="/cart"><i className="bi bi-cart3 fs-4"></i></NavLink>
              <NavLink to="/cart" className="nav-link rounded-circle position-absolute  text-white cart">{totalItems} </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar