import { createContext, useEffect, useState } from 'react'

import * as actorService from '../services/actorService'

export const ActorContext = createContext();

export const ActorProvider = ({ children }) => {
    const [actors, setActors] = useState([]);
    useEffect(() => {
        actorService.getAll()
            .then(res => setActors(res))
            .catch(err => alert(err))
    }, [])
    const create = (actor) => {
        setActors(state => [...state, actor])
    }
    const deleteActor = (actorId) => {
        setActors(state => state.filter(x => x.id != actorId))
    }
    const update = (actor) => {
        const newState = actors.map(obj => {
            if (obj.id === actor.id) {
                return actor;
            }
            return obj;
        });
        setActors(newState);
    }

return (
    <ActorContext.Provider value={{ actors, create, deleteActor, update }}>
        {children}
    </ActorContext.Provider>
);
}