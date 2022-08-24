import { Link } from 'react-router-dom'
import image from '../../images/login.jpg'
import './Login.css'

export const Login = () => {

    return (
        <section className="vh-100">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form>
                            <p className='display-4 font-weight-light'>Log In</p>
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
                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button
                                    type="button"
                                    className="btn btn-success btn-lg"
                                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem", backgroundColor: "#32CD32" }}
                                >
                                    Login
                                </button>
                                <p className="small mt-2 pt-1 mb-0">
                                    Don't have an account?{" "}
                                    <Link to="/register" className="link-success">
                                        Register
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img
                            src={image}
                            className="img-fluid"
                            alt="Login img"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}