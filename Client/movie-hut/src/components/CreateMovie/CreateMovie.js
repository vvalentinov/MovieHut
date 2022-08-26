import './CreateMovie.css';
import image from '../../images/clipper.jpg'
import { useState } from 'react';
export const CreateMovie = () => {
    return (
        <section className="vh-100">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form>
                            <p className='display-4 font-weight-light'>Create Movie</p>
                            {/* Username input */}
                            <div className="form-outline mb-4">
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    className="form-control form-control-lg"
                                    placeholder="Enter a valid title"
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