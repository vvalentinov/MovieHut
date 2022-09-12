import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/AuthContext";
import * as movieService from "../services/movieService"

export const useOwner = (movieId) => {
    const [isOwner, setIsOwner] = useState(false);
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        if (auth) {
            movieService.getOne(movieId)
                .then(res => setIsOwner(res.useId === auth?.id))
            }
        }, [])

    return { isOwner }
}