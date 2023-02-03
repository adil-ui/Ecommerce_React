import { useContext, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { API_URL } from '../../config/constants';
import AuthContext from '../../context/auth-context';
import './Navbar.css'

const Navbar = () =>{
  const [userName, setUserName] = useState('');
  const [userPicture, setUserPicture] = useState('');
  const { user, setUser } = useContext(AuthContext);
    useEffect(() => {
      if(user){
        setUserName(user.name);
        setUserPicture(user.picture);
      }
    }, [user])
    const logout = () =>{
      localStorage.removeItem("user");
      setUserName("");
      setUserPicture("");
      setUser(null);
    }

    return(
        <nav className="navbar navbar-expand-lg bg-white shadow-sm fixed-top top-0">
            <div className="container">
              <NavLink to="/home" className="navbar-brand fw-bolder d-flex align-items-end " ><img src="/images/logo.png" alt="logo" width="35px" className="me-2" /><span className='logo_online'>Online</span><span className='logo_shop'>Shope</span></NavLink>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarScroll">
                <ul className="navbar-nav my-2 my-lg-0 ms-auto d-flex align-items-center">
                  <li className="nav-item me-2">
                    <NavLink className="nav-link fw-semibold"  to="/home">Home</NavLink>
                  </li>
                  <li classNameName="nav-item me-2">
                    <NavLink className="nav-link fw-semibold" to="/ourproduct">Our Product</NavLink>
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
                  <li className="nav-item dropdown me-2">
                            <NavLink to='' className="nav-link dropdown-toggle"  data-bs-toggle="dropdown" aria-expanded="false">
                            {userName ? <><img src={API_URL + userPicture} alt="" width='40px' className='align-middle me-1' /><span className='fw-semibold user_name'>Hi,{userName}</span></> : <i className="bi bi-person-circle fs-4 "></i>}
                            </NavLink>
                    <ul className="dropdown-menu">
                            {userName ?
                            <>
                              <li><span className="dropdown-item  py-2 px-4" onClick={logout}><i className="bi bi-box-arrow-left align-middle fs-5 me-2"></i> Log Out</span></li>
                              <li><Link className="dropdown-item py-2 px-4" to="/admin"><i className="bi bi-person align-middle fs-5 me-2"></i> profile</Link></li>
                            </>
                            : <>
                              <li><Link className="dropdown-item py-2 px-4" to="/login"><i className="bi bi-box-arrow-in-right align-middle fs-5 me-2"></i> Login</Link></li>
                              <li><Link className="dropdown-item py-2 px-4" to="/register"><i className="bi bi-person-plus align-middle fs-5 me-2"></i> Register</Link></li>
                            </>
                            }

                            
                    </ul>
                  </li>
                  <li className="nav-item position-relative">
                    <NavLink className="nav-link" to="#cart"><i className="bi bi-cart3 fs-4"></i></NavLink>
                    <div className="rounded-circle position-absolute  text-white cart">0</div>
                </li>
                </ul>
              </div>
            </div>
        </nav>
    )
}

export default Navbar