import "./ShowDetails.css"
import { Link, useNavigate, useParams } from "react-router-dom";
import { useShow } from "../../hooks/useShow";
import image from '../../images/background.jpg'
import { CelebrityCard } from '../MovieDetails/CelebrityCard/CelebrityCard';
import * as showService from '../../services/showService';
import { useOwner } from '../../hooks/useOwner';
import { useContext } from 'react';
import { ShowContext } from '../../contexts/ShowContext'

export const ShowDetails = () => {
    const { showId } = useParams();
    const { show, setShow } = useShow(showId);
    const { deleteShow } = useContext(ShowContext)
    const navigate = useNavigate();
    const { isOwner } = useOwner(showId, showService);
    return (
        <div className="container text-light">
            <div className="card my-3" style={{ backgroundImage: `url(${image})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
                <div className='card-body'>
                    <div className="row mt-4">
                        <div className="col-10">
                            <p className="display-5">{show?.title}</p>
                            {isOwner ?
                                <>
                                    <Link
                                        className="btn btn-outline-light"
                                        style={{ backgroundColor: "#32CD32" }}
                                        to={`/shows/edit/${showId}`}
                                        type="button"
                                    >
                                        Edit
                                    </Link>
                                </> : null}
                            <p style={{ margin: 0 }}>{show?.released.slice(0, 4)}</p>
                            <p style={{ margin: 0 }}>{show?.seasonsCount} seasons</p>
                        </div>
                        <div className="col">
                            <h3 className="mb-4">Rating</h3>
                            <p><i className="fa-solid fa-star"></i> 7,8</p>
                        </div>
                    </div>
                    <div className="row mt-4 gy-2">
                        <div className="col-md-3">
                            <img className="img-fluid poster" src={show?.posterUrl} alt="Show img" />
                        </div>
                        <div className="col-md-8">
                            <iframe
                                style={{ height: '100%', width: '100%' }}
                                src={show?.trailerUrl}
                                allowFullScreen
                            />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col">
                            <p>{show?.plot}</p>
                            <hr />
                            <p>{show?.genres.join(', ')}</p>
                            <hr />
                            <h4>Actors</h4>
                            <div className='row gy-3'>
                                {show?.actors?.map(x => <CelebrityCard key={x.id} {...x} route='actors' />)}
                            </div>
                            <hr />
                            <h4>Directors</h4>
                            <div className='row gy-3'>
                                {show?.directors?.map(x => <CelebrityCard key={x.id} {...x} route='directors' />)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}