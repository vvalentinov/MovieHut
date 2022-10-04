import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import image from '../../images/register.jpg'
import * as authService from '../../services/authService'
import { AuthContext } from '../../contexts/AuthContext'
import './Register.css'
import { Alert } from '../Alert/Alert';

export const Register = () => {
    const { userLogin } = useContext(AuthContext)
    const navigate = useNavigate();
    const [error, setError] = useState({ active: false, message: "" });
    const [isLoading, setIsLoading] = useState(false);

    const [errors, setErrors] = useState({
        email: false,
        username: false,
        password: false,
        rePassword: false
    })
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

    //Validation
    const usernameValidator = (e) => {
        setErrors(state => ({ ...state, [e.target.name]: inputData.username.length < 3}))
    }
    const emailValidator = (e) => {
        var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        setErrors(state => ({ ...state, [e.target.name]: !re.test(inputData.email) }))
    }
    //ToDO corect password validation
    const passwordValidator = (e) => {
        setErrors(state => ({ ...state, [e.target.name]: !inputData.password }))
    }

    //If it is valid the form can be submitted
    const isValidForm = !Object.values(errors).some(x => x);
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
                        {/* Email input */}
                        <div className="form-outline">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control form-control-lg"
                                placeholder="Enter a valid email address"
                                value={inputData.email}
                                onChange={onChange}
                                onBlur = {(e) => emailValidator(e)}
                            />
                            <label className="form-label" htmlFor="email">
                                Email address
                            </label>
                        </div>
                        
                        {/* Alert */}
                        {errors.email && 
                            <Alert message="Please provide a valid email address."/>
                        }
                        {/* Username input */}
                        <div className="form-outline">
                            <input
                                type="username"
                                id="username"
                                name="username"
                                className="form-control form-control-lg"
                                placeholder="Enter a valid username"
                                value={inputData.username}
                                onChange={onChange}
                                onBlur = {(e) => usernameValidator(e)}
                            />
                            <label className="form-label" htmlFor="username">
                                Username
                            </label>
                        </div>
                        {/* Alert */}
                        {errors.username && 
                            <Alert message="Please provide a valid username."/>
                        }
                        {/* Profile pic */}
                        <div>
                            <input className="form-control" type="file" name="profilePic" onChange={onSelectFile} />
                            <label htmlFor="formFile" className="form-label">
                                Choose Profile Pic
                            </label>
                        </div>
                        {/* Password input */}
                        <div className="form-outline">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="form-control form-control-lg"
                                placeholder="Enter password"
                                value={inputData.password}
                                onChange={onChange}
                                onBlur = {(e) => passwordValidator(e)}
                            />
                            <label className="form-label" htmlFor="password">
                                Password
                            </label>
                        </div>
                        {/* Alert */}
                        {errors.password && 
                            <Alert message="Please provide a password."/>
                        }
                        {/* Re-Password input */}
                        <div className="form-outline">
                            <input
                                type="password"
                                id="rePassword"
                                name="rePassword"
                                className="form-control form-control-lg"
                                placeholder="Re Enter Password"
                                value={inputData.rePassword}
                                onChange={onChange}
                                onBlur = {(e) => passwordValidator(e)}
                            />
                            <label className="form-label" htmlFor="rePassword">
                                Re Password
                            </label>
                        </div>
                        {/* Alert */}
                        {errors.rePassword && 
                            <Alert message="Please provide a rePassword."/>
                        }
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
                                        disabled={!isValidForm || (!inputData.email || !inputData.username || !inputData.password || !inputData.rePassword)}
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