import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMovie } from "../../hooks/useMovie";
import image from '../../images/background.jpg'

export const MovieDetails = () => {
    const { movieId } = useParams();
    const { movie, setMovie } = useMovie(movieId);
    return (
        <div className="container text-light">
            <div className="card mt-3" style={{ backgroundImage: `url(${image})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
                <div className='card-body'>
                    <div className="row mt-4">
                        <div className="col-10">
                            <p className="display-5">{movie?.title}</p>
                            <p>{movie?.released.slice(0, 4)}</p>
                        </div>
                        <div className="col">
                            <h3 className="mb-4">Rating</h3>
                            <p><i className="fa-solid fa-star"></i> 7,8</p>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-3">
                            <img className="img-fluid poster" src={movie?.posterUrl} alt="Movie img" />
                        </div>
                        <div className="col-md-8">
                            <iframe
                                style={{ height: '100%', width: '100%' }}
                                src="https://www.youtube.com/embed/Nrk8IT9xtkM"
                                allowFullScreen
                            />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col">
                            <p>{movie?.plot}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}