import { Link } from 'react-router-dom'
import './Card.css'

export const Card = (props) => {
    return (
        <div className="col-auto grow "><div className="card" style={{ width: 300 }}>
            <img className="card-img-top" src={props.posterUrl} alt="Card img" />
            <div className="card-body">
                <h4 className="card-title">{props.title}</h4>
                <Link to={`/movies/details/${props.id}`} className="custom-btn">
                    Details
                </Link>
            </div>
        </div>
        </div>
    )
}