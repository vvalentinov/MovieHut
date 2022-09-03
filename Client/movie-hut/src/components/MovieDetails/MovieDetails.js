import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as movieService from "../../services/movieService";

export const MovieDetails = () => {
    const {movieId} = useParams();
    const [movie, setMovie] = useState();
    useEffect(() => {
        movieService.getOne(movieId)
            .then(res => setMovie(res))
            .catch(err => alert(err))
    },[])
    return (
        <>
        <h3>{movie?.title}</h3>
        <p>{movie?.plot}</p>
        <img src ={movie?.posterUrl} alt="img"/>
        </>
    )
}