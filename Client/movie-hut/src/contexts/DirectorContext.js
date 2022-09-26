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
    const update = (director) => {
        const newState = directors.map(obj => {
            if (obj.id === director.id) {
                return director;
            }
            return obj;
        });
        setDirectors(newState);
    }
    return (
        <DirectorContext.Provider value={{directors, create, deleteDirector, update}}>
            {children}
        </DirectorContext.Provider>  
    );
}