import { useEffect, useState } from 'react'
import { Card } from '../Card/Card'
import * as movieService from '../../services/movieService'
import './MyMovies.css'

export const MyMovies = () => {
    const [movies, setMovies] = useState();
    useEffect(() => {
        movieService.getMine()
            .then(res => setMovies(res))
            .catch(err => alert(err))
    }, [])
    return (
        <>
            <p className="text-center display-5">My Movies</p>
            <div className="container my-5">
                <div className="row justify-content-center gy-5">
                    {movies?.map(x => <Card key = {x.id} {...x}/>)}
                </div>
            </div>
        </>
    )
}