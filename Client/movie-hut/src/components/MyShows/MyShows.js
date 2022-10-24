import { useEffect, useState } from 'react'
import { Card } from '../Card/Card'
import * as showService from '../../services/showService'
import './MyShows.css'
import { Missing } from '../Missing/Missing'

export const MyShows = () => {
    const [shows, setShows] = useState();
    useEffect(() => {
        showService.getMine()
            .then(res => setShows(res))
            .catch(err => alert(err))
    }, [])
    return (
        <>
            <p className="text-center display-4">My Shows</p>
            <div className="container my-5">
                <div className="row justify-content-center gy-5">
                    {shows?.length > 0
                        ? shows?.map(x => <Card key={x.id} {...x} isShow={true} />)
                        : <Missing message= {`You haven't created any shows yet.`}/>}
                </div>
            </div>
        </>
    )
}