import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import image from '../../images/register.jpg'
import * as authService from '../../services/authService'
import { AuthContext } from '../../contexts/AuthContext'
import './Register.css'

export const Register = () => {
    const { userLogin } = useContext(AuthContext)
    const navigate = useNavigate();
    const [error, setError] = useState({ active: false, message: "" });

    const [inputData, setInputData] = useState({
        email: "",
        username: "",
        password: "",
        rePassword: ""
    });

    const onChange = (e) => {
        setInputData(state => (
            { ...state, [e.target.name]: e.target.value }))
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (inputData.password === inputData.rePassword) {
            authService.register(inputData)
                .then(res => {
                    authService.login({username: inputData.username, password: inputData.password})
                        .then(res => {
                            userLogin({accessToken: res.token, id: res.userId});
                            navigate('/')
                        })
                })
                .catch(res => {
                    setError({ active: true, message: res.message })
                })
        }
        else {
            setError({ active: true, message: "Password and the re entered password aren't the same." })
        }
    }
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
                        <form onSubmit={onSubmit}>
                            <p className='display-4 font-weight-light'>Register</p>
                            {/* Alert */}
                            {/* <div className="alert alert-danger d-flex align-items-center" role="alert">
                                <i className="fa-solid fa-triangle-exclamation me-2"></i>
                                <div className="text-center">
                                    Please provide a valid email address.
                                </div>
                            </div> */}
                            {/* Email input */}
                            <div className="form-outline mb-4">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-control form-control-lg"
                                    placeholder="Enter a valid email address"
                                    value={inputData.email}
                                    onChange={onChange}
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
                                    name="username"
                                    className="form-control form-control-lg"
                                    placeholder="Enter a valid username"
                                    value={inputData.username}
                                    onChange={onChange}
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
                                    name="password"
                                    className="form-control form-control-lg"
                                    placeholder="Enter password"
                                    value={inputData.password}
                                    onChange={onChange}
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
                                    name="rePassword"
                                    className="form-control form-control-lg"
                                    placeholder="Re Enter Password"
                                    value={inputData.rePassword}
                                    onChange={onChange}
                                />
                                <label className="form-label" htmlFor="rePassword">
                                    Re Password
                                </label>
                            </div>
                            {error.active === true ? <div className="alert alert-danger fade show mt-3">
                                <strong>Error!</strong> {error.message}
                            </div> : null}
                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button
                                    type="submit"
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