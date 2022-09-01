import { Link } from "react-router-dom"
import { Card } from "../Card/Card"

export const Genres = () => {
    return (
        <><p className="text-center display-4">Genres</p>
            <div className="container my-5">
                <div className="row justify-content-center gy-5">
                    <Card key={1} title="Action" posterUrl="https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_.jpg" id="1" isGenre = {true}/>
                </div>
            </div></>
    )
}