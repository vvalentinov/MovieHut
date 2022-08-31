import { Link } from 'react-router-dom'
import { MovieCard } from './MovieCard/MovieCard'
import styles from './Movies.module.css'

export const Movies = () => {
    return (
        <div className="container">
            <div className="row gy-3 my-2">
                <div className="col-md-8">
                    <div className={`card ${styles.gradLeft}`}>
                        <div className='card-body'>
                            <p className='display-6'>Movies</p>
                            <div className='container'>
                                <MovieCard/>
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