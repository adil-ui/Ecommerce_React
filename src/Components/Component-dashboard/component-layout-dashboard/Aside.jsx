import { Link, Outlet } from 'react-router-dom'
import './Aside.css'
<head>

</head>

const Aside = () =>{
    return(
        <section className='admin'>
            <div className='container mx-auto d-flex justify-content-between  row mt-5 py-5 '>
                <aside className="col-3 bg-white px-0 py-1 rounded-2 shadow-sm">
                        <div className='aside_item'>
                            <Link to="/admin" className='aside_link px-5 fw-semibold'><i className="bi bi-person align-middle fs-4 me-2"></i> My Account</Link>
                        </div>
                        <div className='aside_item '>
                            <Link to="/admin/list-product" className='aside_link px-5 fw-semibold'><i className="bi bi-list-task align-middle fs-4 me-2"></i> List of product</Link>
                        </div>
                        <div className='aside_item'>
                            <Link to="/admin/add-product" className='aside_link px-5 fw-semibold'><i className="bi bi-plus-lg align-middle fs-4 me-2"></i> Add Product</Link>
                        </div>
                        <div className='aside_item'>
                            <Link to="/admin/list-order" className='aside_link px-5 fw-semibold'> <i className="bi bi-box2 align-middle fs-4 me-2"></i> My orders</Link>
                        </div>
                </aside>
                <div className="col-8 bg-white  py-4 rounded-2 shadow-sm height_100" >
                    <Outlet />
                </div>
            </div>
        </section>
    )
}
export default Aside