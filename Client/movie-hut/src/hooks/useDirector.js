import { useEffect, useState } from "react"
import * as directorService from "../services/directorService";

export const useDirector = (directorId) => {
    const [director, setDirector] = useState();
    useEffect(() => {
        directorService.getOne(directorId)
            .then(res => setDirector(res))
            .catch(err => alert(err))
    },[])

    return {
        director,
        setDirector
    }
}