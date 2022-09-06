import { Link } from "react-router-dom"

export const ActorCard = (props) => {
    return (
        <div className='card my-2'>
            <div className='card-body'>
                <div className="row my-3">
                    <div className="col-sm-3">
                        <Link to={`/actors/details/1`}>
                            <img className='img-fluid w-125 h-125 rounded-circle' src={PaymentResponse.imageUrl} alt='movie img' />
                        </Link>
                    </div>
                    <div className="col mt-2">
                        <h1>{props.name}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}