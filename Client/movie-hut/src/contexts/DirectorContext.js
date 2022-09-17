import {createContext, useEffect, useState} from 'react'

import * as directorService from '../services/directorService'

export const DirectorContext = createContext();

export const DirectorProvider = ({children}) => {
    const [directors, setDirectors] = useState([]);
    useEffect(() => {
        directorService.getAll()
            .then(res => setDirectors(res))
            .catch(err => alert(err))
    }, [])
    const create = (director) => {
        setDirectors(state => [...state, director])
    }
    const deleteDirector = (directorId) => {
        setDirectors(state => state.filter(x => x.id != directorId))
    }
    return (
        <DirectorContext.Provider value={{directors, create, deleteDirector}}>
            {children}
        </DirectorContext.Provider>  
    );
}