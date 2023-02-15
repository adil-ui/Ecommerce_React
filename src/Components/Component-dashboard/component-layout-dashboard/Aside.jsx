import { useContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom'
import AuthContext from '../../../context/auth-context';
import './Aside.css'
<head>

</head>

const Aside = () =>{
  const { user } = useContext(AuthContext);
  const [userRole, setUserRole] = useState('');
  useEffect(() => {
    if (user) {
        setUserRole(user.role);
    }
  }, [user])
    return(
        <section className='admin position-relative'>
            <div className='container mx-auto d-flex justify-content-between  row mt-5 py-5 '>
                <aside className="col-3 bg-white px-0 py-1 rounded-2 shadow-sm">
                        <div className='aside_item'>
                            <Link to="/admin" className='aside_link px-5 fw-semibold'><i className="bi bi-person-lines-fill align-middle fs-4 me-2 icon_color"></i> My Account</Link>
                        </div>
                        {userRole === 'admin' &&
                        <>
                            <div className='aside_item '>
                                <Link to="/admin/list-product" className='aside_link px-5 fw-semibold'><i className="bi bi-list-columns-reverse align-middle fs-4 me-2 icon_color"></i> All products</Link>
                            </div>
                            <div className='aside_item'>
                                <Link to="/admin/add-product" className='aside_link px-5 fw-semibold'><i className="bi bi-database-fill-add align-middle fs-4 me-2 icon_color"></i> Add Product</Link>
                            </div>
                            <div className='aside_item'>
                                <Link to="/admin/all-orders" className='aside_link px-5 fw-semibold'> <i className="bi bi-list-columns-reverse align-middle fs-4 me-2 icon_color"></i> All orders</Link>
                            </div>
                            </>                       
                        }
                        <div className='aside_item'>
                            <Link to="/admin/list-order" className='aside_link px-5 fw-semibold'> <i className="bi bi bi-box2-fill align-middle fs-4 me-2 icon_color"></i> My orders</Link>
                        </div>
                </aside>
                <div className="col-8 bg-white  py-4 rounded-2 shadow-sm height_100" >
                    <Outlet />
                </div>
            </div>
            <div className='admin_back'></div>
        </section>
    )
}
export default Aside