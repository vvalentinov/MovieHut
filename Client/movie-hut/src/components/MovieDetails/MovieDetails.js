import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMovie } from "../../hooks/useMovie";

export const MovieDetails = () => {
    const {movieId} = useParams();
    const {movie, setMovie} = useMovie(movieId);
    return (
        <>
        <h3>{movie?.title}</h3>
        <p>{movie?.plot}</p>
        <img src ={movie?.posterUrl} alt="img"/>
        </>
    )
}