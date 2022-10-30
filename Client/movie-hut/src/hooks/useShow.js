import { useEffect, useState } from "react"
import * as showService from "../services/showService";

export const useShow = (showId) => {
    const [show, setShow] = useState();
    useEffect(() => {
        showService.getOne(showId)
            .then(res => setShow(res))
            .catch(err => alert(err))
    },[])

    return {
        show,
        setShow
    }
}