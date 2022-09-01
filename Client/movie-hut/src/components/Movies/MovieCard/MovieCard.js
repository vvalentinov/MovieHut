import { Link } from "react-router-dom"

export const MovieCard = (props) => {
    return (
        <div className='card my-2'>
            <div className='card-body'>
                <div className="row my-3">
                    <div className="col-sm-3">
                        <Link to={`/movies/details/${props.id}`}>
                            <img className='img-fluid w-125 h-125' src={props.posterUrl} alt='movie img' />
                        </Link>
                    </div>
                    <div className='col-sm'>
                        <Link to={`/movies/details/${props.id}`} style={{ textDecoration: 'none' }}>
                            <h4>{props.title} ({props.released.slice(0,4)})</h4>
                        </Link>
                        <p>45 min</p>
                        <p>Drama, Test, Fantasy</p>
                        <p><i className="fa-solid fa-star"></i> 7,8</p>
                        <p>{props.plot}</p>
                        <p>Stars:
                            <Link to="/actors/1" style={{ textDecoration: 'none' }}>
                                {'Tom Sturridge'}
                            </Link>,
                            <Link to="/actors/1" style={{ textDecoration: 'none' }}>
                                {'Boyd Holbrook'}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}