import { Card } from '../Card/Card'
import './MyMovies.css'

export const MyMovies = () => {
    return (
        <>
            <p className="text-center display-5">My Movies</p>
            <div className="container my-5">
                <div className="row justify-content-center gy-5">
                    <Card/>
                </div>
            </div>
        </>
    )
}