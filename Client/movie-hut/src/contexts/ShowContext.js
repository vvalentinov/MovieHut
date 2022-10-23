import {createContext, useEffect, useState} from 'react'

import * as showService from '../services/showService'

export const ShowContext = createContext();

export const ShowProvider = ({children}) => {
    const [shows, setShows] = useState([]);
    useEffect(() => {
        showService.getAll()
            .then(res => setShows(res))
            .catch(err => alert(err))
    }, [])
    const create = (show) => {
        setShows(state => [...state, show])
    }
    const deleteShow = (showId) => {
        setShows(state => state.filter(x => {
            return x.id !== showId
        }))
    }
    return (
        <ShowProvider.Provider value={{shows, create, deleteShow}}>
            {children}
        </ShowProvider.Provider>  
    );
}