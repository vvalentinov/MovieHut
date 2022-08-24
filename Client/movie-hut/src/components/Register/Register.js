import { Link } from 'react-router-dom'
import image from '../../images/register.jpg'
import './Register.css'

export const Register = () => {

    return (
        <section className="vh-100">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img
                            src={image}
                            className="img-fluid"
                            alt="Login img"
                        />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form>
                            <p className='display-4 font-weight-light'>Register</p>

                            {/* Alert */}
                            <div className="alert alert-danger d-flex align-items-center" role="alert">
                                <i className="fa-solid fa-triangle-exclamation me-2"></i>
                                <div className="text-center">
                                    Please provide a valid email address.
                                </div>
                            </div>
                            {/* Email input */}
                            <div className="form-outline mb-4">
                                <input
                                    type="email"
                                    id="email"
                                    className="form-control form-control-lg"
                                    placeholder="Enter a valid email address"
                                />
                                <label className="form-label" htmlFor="email">
                                    Email address
                                </label>
                            </div>
                            {/* Username input */}
                            <div className="form-outline mb-4">
                                <input
                                    type="username"
                                    id="username"
                                    className="form-control form-control-lg"
                                    placeholder="Enter a valid username"
                                />
                                <label className="form-label" htmlFor="username">
                                    Username
                                </label>
                            </div>
                            {/* Password input */}
                            <div className="form-outline mb-3">
                                <input
                                    type="password"
                                    id="password"
                                    className="form-control form-control-lg"
                                    placeholder="Enter password"
                                />
                                <label className="form-label" htmlFor="password">
                                    Password
                                </label>
                            </div>
                            {/* Re-Password input */}
                            <div className="form-outline mb-3">
                                <input
                                    type="password"
                                    id="rePassword"
                                    className="form-control form-control-lg"
                                    placeholder="Re Enter Password"
                                />
                                <label className="form-label" htmlFor="rePassword">
                                    Re Password
                                </label>
                            </div>
                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button
                                    type="button"
                                    className="btn btn-success btn-lg"
                                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem", backgroundColor: "#32CD32" }}
                                >
                                    Register
                                </button>
                                <p className="small mt-2 pt-1 mb-0">
                                    Already have an account?{" "}
                                    <Link to="/login" className="link-success">
                                        Log in
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}