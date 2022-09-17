import { Link } from "react-router-dom"

export const DirectorDetailsCard = (props) => {
    return (
        <div className="col-auto grow "><div className="card" style={{ width: 200 }}>
            <img className="card-img-top" src={props.posterUrl} alt="Card img" style={{ height: 200 }} />
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <Link to={`/movies/details/${props.id}`} className="custom-btn">
                    Details
                </Link>
            </div>
        </div>
        </div>
    )
}