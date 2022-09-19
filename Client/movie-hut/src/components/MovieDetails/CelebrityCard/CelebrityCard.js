import { Link } from "react-router-dom"

export const CelebrityCard = (props) => {
    return (
        <div className='col-auto'>
            <div className="container" style={{ width: 400 }}>
                <div className='row'>
                    <div className='col-4'>
                        <Link to={`/${props.route}/details/${props.id}`} style={{ textDecoration: 'none' }}>
                            <img className="img-fluid rounded-circle" src={props.imageUrl} alt="actor img" />
                        </Link>
                    </div>
                    <div className='col mt-3'>
                        <Link to={`/${props.route}/details/${props.id}`} style={{ textDecoration: 'none' }}>
                            <h4>{props.name}</h4>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}