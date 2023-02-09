import './ForgotPassword.css'

const ForgotPassword = () =>{
    return(
        <section className="container row  mx-auto mt-5 py-3">
            <div className="hero_left col-5 d-flex align-items-center px-5 mt-3">
                <div>
                    <h2 className="text-white fw-bold mb-4 ">Welcome</h2>
                    <h2 className="text-white fw-bold mb-4 hero_left_title stroke-text">We Are OnlineShop</h2>
                    <h4 className="text-white fw-bold mb-4 ">Login Now <i className="bi bi-arrow-right fs-4 ms-2 align-middle"></i></h4>
                </div>
            </div>
            <div className="login col-5 mx-auto d-flex align-items-center">
                <form onSubmit={''} className="row g-3 col-8 mx-auto ">
                    <h5 className='text-center fw-bold mb-4 text-warning'>Forgot Password</h5>
                    <div className="mb-2 ">
                        <label className="form-label fw-semibold">Email</label>
                        <input type="email" className="form-control" name='email' value={''} required />
                    </div>
                    <div className="mt-4">
                        <button type="submit" className="btn btn-primary col-12 fw-semibold px-4">Submit</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default ForgotPassword