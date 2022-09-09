import { Link } from "react-router-dom"

export const ActorDetailsCard = (props) => {
    return (
        <div className="col-auto grow "><div className="card" style={{ width: 200 }}>
            <img className="card-img-top" src={props.posterUrl} alt="Card img" style={{ height: 200 }} />
            <div className="card-body">
                <h4 className="card-title">{props.title}</h4>
                {props.isGenre ?
                    <Link to={`/movies/all/${props.title.toLowerCase()}`} className="custom-btn">
                        View Movies
                    </Link> :
                    <Link to={`/movies/details/${props.id}`} className="custom-btn">
                        Details
                    </Link>}

            </div>
        </div>
        </div>
    )
}