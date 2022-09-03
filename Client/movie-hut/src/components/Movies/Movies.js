import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { MovieContext } from '../../contexts/MovieContext'
import { Missing } from '../Missing/Missing'
import { Genres } from './Genres/Genres'
import { MovieCard } from './MovieCard/MovieCard'
import styles from './Movies.module.css'

export const Movies = () => {
    const params = useParams();
    const { movies } = useContext(MovieContext);
    return (
        <div className="container">
            <div className="row gy-3 my-2">
                <div className="col-md-8">
                    <div className={`card ${styles.gradLeft}`}>
                        <div className='card-body'>
                            <p className='display-6'>Movies</p>
                            <div className='container'>
                                {movies.length > 0
                                    ? movies?.map(x => {
                                        if (params.genre) {
                                            if (x.genres.some(y => y.toLowerCase() === params.genre)) {
                                                return <MovieCard key={x.id} {...x} />
                                            }else{
                                                return null;
                                            }
                                        } else {
                                            return <MovieCard key={x.id} {...x} />
                                        }

                                    })
                                    : <Missing message={`No movies yet.`} />}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className={`card ${styles.gradRight}`}>
                        <div className="card-body">
                            <Genres />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}