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
    const [isLoading, setIsLoading] = useState(false);

    const [inputData, setInputData] = useState({
        email: "",
        username: "",
        password: "",
        rePassword: ""
    });

    const onSelectFile = (e) => {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (e) => {
            setInputData(state => (
                { ...state, 'imageUrl': e.target.result }))
        }
    }

    const onChange = (e) => {
        setInputData(state => (
            { ...state, [e.target.name]: e.target.value }))
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (inputData.password === inputData.rePassword) {
            console.log(inputData);
            authService.register(inputData)
                .then(res => {
                    authService.login({ username: inputData.username, password: inputData.password })
                        .then(res => {
                            userLogin({ accessToken: res.token, id: res.userId });
                            setIsLoading(false);
                            navigate('/')
                        })
                })
                .catch(res => {
                    setIsLoading(false);
                    setError({ active: true, message: res.message })
                })
        }
        else {
            setError({ active: true, message: "Password and the re entered password aren't the same." })
        }
    }
    return (
        <div className="container-fluid h-custom my-3">
            <div className="row d-flex justify-content-center align-items-center h-100 gy-3">
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
                        {/* Profile pic */}
                        <div className="mb-4">
                            <input className="form-control" type="file" name="profilePic" onChange={onSelectFile} />
                            <label htmlFor="formFile" className="form-label">
                                Choose Profile Pic
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
                            <div className='row'>
                                <div className='col-5'>
                                    <button
                                        type="submit"
                                        className="btn btn-success btn-lg"
                                        style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem", backgroundColor: "#32CD32" }}
                                    >
                                        Register
                                    </button>
                                </div>
                                {isLoading && <div className='col'>
                                    <div className="spinner-border mt-2" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>}
                            </div>
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
    )
}