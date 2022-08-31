import { Link } from 'react-router-dom'
import styles from './Movies.module.css'

export const Movies = () => {
    return (
        <div className="container">
            <div className="row gy-3 my-2">
                <div className="col-md-8">
                    <div className={`card ${styles.gradLeft}`}>
                        <div className='card-body'>
                            <div className='container'>
                                {/* Card */}
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
                                {/* Card */}
                                <div className='card my-2'>
                                    <div className='card-body'>
                                        <div className="row my-3">
                                            <div className="col-sm-3">
                                                <Link to='/movies/details/12'>
                                                    <img className='img-fluid w-125 h-125' src='https://pbs.twimg.com/media/FPvLhxrWUAE_iMi?format=jpg&name=large' alt='movie img' />
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
                                {/* Card */}
                                <div className='card my-2'>
                                    <div className='card-body'>
                                        <div className="row my-3">
                                            <div className="col-sm-3">
                                                <Link to='/movies/details/12'>
                                                    <img className='img-fluid w-125 h-125' src='https://m.media-amazon.com/images/M/MV5BMThlOWE3MWEtZjM4Ny00M2FiLTkyMmYtZGY3ZTcyMzM5YmNlXkEyXkFqcGdeQWpnYW1i._V1_.jpg' alt='movie img' />
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
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className={`card ${styles.gradRight}`}>
                        <div className="card-body">
                            <h4>Genres</h4>
                            <ul className={styles.list}>
                                <li>
                                    <Link to='/movies/horror' style={{ textDecoration: 'none' }}>
                                        Horror
                                    </Link><br />
                                    <Link to='/movies/sci-fi' style={{ textDecoration: 'none' }}>
                                        Sci-Fi
                                    </Link><br />
                                    <Link to='/movies/sci-fi' style={{ textDecoration: 'none' }}>
                                        Sports
                                    </Link><br />
                                    <Link to='/movies/sci-fi' style={{ textDecoration: 'none' }}>
                                        War
                                    </Link><br />
                                    <Link to='/movies/sci-fi' style={{ textDecoration: 'none' }}>
                                        Family
                                    </Link><br />
                                    <Link to='/movies/sci-fi' style={{ textDecoration: 'none' }}>
                                        History
                                    </Link><br />
                                    <Link to='/movies/sci-fi' style={{ textDecoration: 'none' }}>
                                        Mystery
                                    </Link><br />
                                    <Link to='/movies/sci-fi' style={{ textDecoration: 'none' }}>
                                        Thriller
                                    </Link><br />
                                    <Link to='/movies/sci-fi' style={{ textDecoration: 'none' }}>
                                        Romance
                                    </Link><br />
                                    <Link to='/movies/sci-fi' style={{ textDecoration: 'none' }}>
                                        Musicals
                                    </Link><br />
                                    <Link to='/movies/sci-fi' style={{ textDecoration: 'none' }}>
                                        Melodramas
                                    </Link><br />
                                    <Link to='/movies/sci-fi' style={{ textDecoration: 'none' }}>
                                        Action
                                    </Link><br />
                                    <Link to='/movies/sci-fi' style={{ textDecoration: 'none' }}>
                                        Crime
                                    </Link><br />
                                    <Link to='/movies/sci-fi' style={{ textDecoration: 'none' }}>
                                        Comedy
                                    </Link><br />
                                    <Link to='/movies/sci-fi' style={{ textDecoration: 'none' }}>
                                        Westerns
                                    </Link><br />
                                    <Link to='/movies/sci-fi' style={{ textDecoration: 'none' }}>
                                        Adventure
                                    </Link><br />
                                    <Link to='/movies/sci-fi' style={{ textDecoration: 'none' }}>
                                        Detective
                                    </Link><br />
                                    <Link to='/movies/sci-fi' style={{ textDecoration: 'none' }}>
                                        Teen
                                    </Link><br />
                                    <Link to='/movies/sci-fi' style={{ textDecoration: 'none' }}>
                                        Animated
                                    </Link><br />
                                    <Link to='/movies/sci-fi' style={{ textDecoration: 'none' }}>
                                        Fantasy
                                    </Link><br />
                                    <Link to='/movies/sci-fi' style={{ textDecoration: 'none' }}>
                                        Biography
                                    </Link><br />
                                    <Link to='/movies/sci-fi' style={{ textDecoration: 'none' }}>
                                        Indie
                                    </Link><br />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}