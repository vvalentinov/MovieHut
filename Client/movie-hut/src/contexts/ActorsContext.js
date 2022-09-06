import {createContext, useEffect, useState} from 'react'

import * as actorService from '../services/actorService'

export const ActorContext = createContext();

export const ActorProvider = ({children}) => {
    const [actors, setActors] = useState([]);
    useEffect(() => {
        actorService.getAll()
            .then(res => setActors(res))
            .catch(err => alert(err))
    }, [])
    const create = (actor) => {
        setActors(state => [...state, actor])
    }
    return (
        <ActorContext.Provider value={{actorService, create}}>
            {children}
        </ActorContext.Provider>  
    );
}