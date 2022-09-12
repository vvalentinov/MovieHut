import './MovieDetails.css'
import { useNavigate, useParams } from "react-router-dom";
import { useMovie } from "../../hooks/useMovie";
import image from '../../images/background.jpg'
import { ActorCard } from './ActorCard/Actor';
import * as movieService from '../../services/movieService';
import { useOwner } from '../../hooks/useOwner';

export const MovieDetails = () => {
    const { movieId } = useParams();
    const { movie, deleteMovie } = useMovie(movieId);
    const navigate = useNavigate();
    const {isOwner} = useOwner(movieId);
    
    const onClickDelete = () => {
        movieService.del(movieId)
            .then(res => {
                deleteMovie(movieId)
                navigate('/movies/all')
            }).catch(err => {
                alert(err)
            })
    }
    return (
        <div className="container text-light">
            <div className="card mt-3" style={{ backgroundImage: `url(${image})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
                <div className='card-body'>
                    <div className="row mt-4">
                        <div className="col-10">
                            <p className="display-5">{movie?.title}</p>
                            {isOwner ? <button
                                className="btn btn-outline-light"
                                style={{ backgroundColor: "#32CD32" }}
                                onClick={onClickDelete}
                                type="button"
                            >
                                Delete
                            </button>: null}
                            <p style={{margin: 0}}>{movie?.released.slice(0, 4)}</p>
                            <p style={{margin: 0}}>{movie?.duration} minutes</p>
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
                                src={movie?.trailerUrl}
                                allowFullScreen
                            />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col">
                            <p>{movie?.plot}</p>
                            <hr />
                            <p>{movie?.genres.join(', ')}</p>
                            <hr />
                            <div className='row gy-3'>
                                <ActorCard/>
                                <ActorCard/>
                                <ActorCard/>
                                <ActorCard/>
                                <ActorCard/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}