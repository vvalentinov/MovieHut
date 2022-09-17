import { Link } from "react-router-dom"

export const DirectorCard = (props) => {
    return (
        <div className='card my-2'>
            <div className='card-body'>
                <div className="row my-3">
                    <div className="col-sm-3">
                        <Link to={`/actors/details/${props.id}`}>
                            <img className='img-fluid w-125 h-125 rounded-circle' src={props.imageUrl} alt='movie img' />
                        </Link>
                    </div>
                    <div className="col mt-2">
                        <Link to={`/actors/details/${props.id}`} style = {{textDecoration: 'none'}}>
                            <h1>{props.name}</h1>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}