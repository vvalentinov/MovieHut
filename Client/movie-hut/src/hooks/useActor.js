import { useEffect, useState } from "react"
import * as actorService from "../services/actorService";

export const useActor = (actorId) => {
    const [actor, setActor] = useState();
    useEffect(() => {
        actorService.getOne(actorId)
            .then(res => setActor(res))
            .catch(err => alert(err))
    },[])

    return {
        actor,
        setActor
    }
}