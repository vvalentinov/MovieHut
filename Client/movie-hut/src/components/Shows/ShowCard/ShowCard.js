import { Link } from "react-router-dom"

export const ShowCard = (props) => {
    console.log(props);
    return (
        <div className='card my-2'>
            <div className='card-body'>
                <div className="row my-3">
                    <div className="col-sm-3">
                        <Link to={`/shows/details/${props.id}`}>
                            <img className='img-fluid w-125 h-125' src={props.posterUrl} alt='shows img' />
                        </Link>
                    </div>
                    <div className='col-sm-9'>
                        <Link to={`/shows/details/${props.id}`} style={{ textDecoration: 'none' }}>
                            <h4>{props.title} ({props.released.slice(0, 4)})</h4>
                        </Link>
                        <p>45 min</p>
                        <p>{props.genres?.join(',')}</p>
                        <p><i className="fa-solid fa-star"></i> 7,8</p>
                        <div>
                            <p>{props.plot}</p>
                        </div>
                        <p>Stars:
                            {props.actors?.map(x =>
                                <Link key = {x.id} to={`/actors/details/${x.id}`} style={{ textDecoration: 'none' }}>
                                    {`${x.name}, `}
                                </Link>)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}