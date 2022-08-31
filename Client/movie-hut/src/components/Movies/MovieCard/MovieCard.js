import { Link } from "react-router-dom"

export const MovieCard = (props) => {
    return (
        <div className='card my-2'>
            <div className='card-body'>
                <div className="row my-3">
                    <div className="col-sm-3">
                        <Link to='/movies/details/12'>
                            <img className='img-fluid w-125 h-125' src='https://media.revistagq.com/photos/62f60c7427f926d4f0858853/master/pass/sandman.jpeg' alt='movie img' />
                        </Link>
                    </div>
                    <div className='col-sm'>
                        <Link to='/movies/details/12' style={{ textDecoration: 'none' }}>
                            <h4>The Sandman (2022)</h4>
                        </Link>
                        <p>45 min</p>
                        <p>Drama, Horror, Fantasy</p>
                        <p><i className="fa-solid fa-star"></i> 7,8</p>
                        <p>Upon escaping after decades of imprisonment by a mortal wizard, Dream, the personification of dreams, sets about to reclaim his lost equipment.</p>
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