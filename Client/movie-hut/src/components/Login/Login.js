import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import image from '../../images/login.jpg'
import * as authService from '../../services/authService'
import './Login.css'

export const Login = () => {
    const { userLogin } = useContext(AuthContext)
    const navigate = useNavigate();
    const [error, setError] = useState({ active: false, message: "" });
    const [errors, setErrors] = useState({
        username: false,
        password: false
    })
    const [inputData, setInputData] = useState({
        username: "",
        password: ""
    });

    const onChange = (e) => {
        setInputData(state => (
            { ...state, [e.target.name]: e.target.value }))
    }
    const onSubmit = (e) => {
        e.preventDefault();
        authService.login(inputData)
            .then(res => {
                userLogin({accessToken: res.token, id: res.userId});
                navigate('/')
            })
            .catch(res => {
                setError({active: true, message: res.message})
            })
    }
    const usernameValidator = (e) => {
        setErrors(state => ({ ...state, [e.target.name]: inputData.username.length < 3}))
    }
    const passwordValidator = (e) => {
        setErrors(state => ({ ...state, [e.target.name]: !inputData.password }))
    }
    const isValidForm = !Object.values(errors).some(x => x);
    return (
        <section className="vh-100">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form onSubmit={onSubmit}>
                            <p className='display-4 font-weight-light'>Log In</p>
                            {/* Username input */}
                            <div className="form-outline mb-1">
                                <input
                                    type="username"
                                    id="username"
                                    name = "username"
                                    className="form-control form-control-lg"
                                    placeholder="Enter a valid username"
                                    value={inputData.email}
                                    onChange = {onChange}
                                    onBlur = {(e) => usernameValidator(e)}
                                />
                                <label className="form-label" htmlFor="username">
                                    Username
                                </label>
                            </div>
                            {/* Alert */}
                            {errors.username &&
                                        <div
                                            className="alert alert-danger d-flex align-items-center"
                                            role="alert"
                                        >
                                            <i className="fa-solid fa-triangle-exclamation me-2" />
                                            <div className="text-center">
                                                Please provide a valid username.
                                            </div>
                                        </div>}
                            {/* Password input */}
                            <div className="form-outline mb-1">
                                <input
                                    type="password"
                                    id="password"
                                    name = "password"
                                    className="form-control form-control-lg"
                                    placeholder="Enter password"
                                    value={inputData.password}
                                    onChange = {onChange}
                                    onBlur = {(e) => passwordValidator(e)}
                                />
                                <label className="form-label" htmlFor="password">
                                    Password
                                </label>
                            </div>
                            {/* Alert */}
                            {errors.password &&
                                        <div
                                            className="alert alert-danger d-flex align-items-center"
                                            role="alert"
                                        >
                                            <i className="fa-solid fa-triangle-exclamation me-2" />
                                            <div className="text-center">
                                                Please provide a valid password.
                                            </div>
                                        </div>}
                            {error.active === true ? <div className="alert alert-danger fade show mt-3">
                                        <strong>Error!</strong> {error.message}
                                    </div>: null}
                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button
                                    type="submit"
                                    className="btn btn-success btn-lg"
                                    disabled={!isValidForm || (!inputData.username || !inputData.password)}
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