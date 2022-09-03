import { useEffect, useState } from "react"
import * as movieService from "../services/movieService";

export const useMovie = (movieId) => {
    const [movie, setMovie] = useState();
    useEffect(() => {
        movieService.getOne(movieId)
            .then(res => setMovie(res))
            .catch(err => alert(err))
    },[])

    return {
        movie,
        setMovie
    }
}