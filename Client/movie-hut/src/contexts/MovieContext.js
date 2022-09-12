import {createContext, useEffect, useState} from 'react'

import * as movieService from '../services/movieService'

export const MovieContext = createContext();

export const MovieProvider = ({children}) => {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        movieService.getAll()
            .then(res => setMovies(res))
            .catch(err => alert(err))
    }, [])
    const create = (movie) => {
        setMovies(state => [...state, movie])
    }
    const deleteMovie = (movieId) => {
        setMovies(state => state.filter(x => x.id !== movieId))
    }
    return (
        <MovieContext.Provider value={{movies, create, deleteMovie}}>
            {children}
        </MovieContext.Provider>  
    );
}