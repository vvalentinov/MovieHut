import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/AuthContext";

export const useOwner = (id, service) => {
    const [isOwner, setIsOwner] = useState(false);
    const { auth } = useContext(AuthContext);
    useEffect(() => {
        if (auth) {
            service.getOne(id)
                .then(res => {setIsOwner(res.userId === auth?.id)})
            }
        }, [])

    return { isOwner }
}