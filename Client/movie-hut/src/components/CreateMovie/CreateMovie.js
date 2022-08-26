import './CreateMovie.css';
import image from '../../images/clipper.jpg'
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as movieService from '../../services/movieService'
import { AuthContext } from '../../contexts/AuthContext';

export const CreateMovie = () => {
    const {auth} = useContext(AuthContext)
    const navigate = useNavigate();
    const [error, setError] = useState({ active: false, message: "" });

    const [inputData, setInputData] = useState({
        title: "",
        plot: "",
        year: 0,
        released: "",
        posterUrl: ""
    });

    const onChange = (e) => {
        setInputData(state => {
            if(e.target.name === 'year'){
                return { ...state, [e.target.name]: Number(e.target.value) }
            }else{
                return { ...state, [e.target.name]: e.target.value }
            }
        })
    }
    const onSubmit = (e) => {
        e.preventDefault();
        inputData.userId = auth.id;
        movieService.create(inputData)
            .then(res => {
                console.log(res);
                navigate('/movies/all')
            }).catch(err => {
                setError({active: true, message: err.message})
            })
    }
    return (
        <section className="vh-100">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form onSubmit= {onSubmit}>
                            <p className='display-4 font-weight-light'>Create Movie</p>
                            {/* Username input */}
                            <div className="form-outline mb-4">
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    className="form-control form-control-lg"
                                    placeholder="Enter a valid title"
                                    value = {inputData.title}
                                    onChange = {onChange}
                                />
                                <label className="form-label" htmlFor="title">
                                    Title
                                </label>
                            </div>
                            <div className="form-outline mb-4">
                                <input
                                    type="text"
                                    id="plot"
                                    name="plot"
                                    className="form-control form-control-lg"
                                    placeholder="Enter a valid plot"
                                    value = {inputData.plot}
                                    onChange = {onChange}
                                />
                                <label className="form-label" htmlFor="plot">
                                    Plot
                                </label>
                            </div>
                            <div className="form-outline mb-4">
                                <input
                                    type="number"
                                    min="1900"
                                    max="2099"
                                    step="1" 
                                    id="year"
                                    name="year"
                                    value = {inputData.year}
                                    onChange = {onChange}
                                    className="form-control form-control-lg"
                                    placeholder="Enter a valid year"
                                />
                                <label className="form-label" htmlFor="year">
                                    Year
                                </label>
                            </div>
                            <div className="form-outline mb-4">
                                <input
                                    type="date"
                                    min="1900"
                                    max="2099"
                                    step="1" 
                                    id="released"
                                    name="released"
                                    value = {inputData.released}
                                    onChange = {onChange}
                                    className="form-control form-control-lg"
                                    placeholder="Enter when was released"
                                />
                                <label className="form-label" htmlFor="released">
                                    Released
                                </label>
                            </div>
                            <div className="form-outline mb-4">
                                <input
                                    type="text"
                                    id="posterUrl"
                                    name="posterUrl"
                                    value = {inputData.posterUrl}
                                    onChange = {onChange}
                                    className="form-control form-control-lg"
                                    placeholder="Enter a valid Poster Url"
                                />
                                <label className="form-label" htmlFor="posterUrl">
                                    Poster Url
                                </label>
                            </div>
                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button
                                    type="submit"
                                    className="btn btn-success btn-lg"
                                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem", backgroundColor: "#32CD32" }}
                                >
                                    Create
                                </button>
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