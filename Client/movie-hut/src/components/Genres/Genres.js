import { Link } from "react-router-dom"
import { Card } from "../Card/Card"

export const Genres = () => {
    return (
        <>
            <p className="text-center display-4">Genres</p>
            <div className="container my-5">
                <div className="row justify-content-center gy-5">
                    <Card key={1} title="Action" posterUrl="https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_.jpg" id="1" isGenre={true} />
                    <Card key={2} title="Adventure" posterUrl="https://www.boredpanda.com/blog/wp-content/uploads/2022/05/adventure_movies_10-6273871bdbc6a__700.jpg" id="2" isGenre={true} />
                    <Card key={3} title="Animated" posterUrl="https://m.media-amazon.com/images/M/MV5BZWFlNzRmOTItZjY1Ni00ZjZkLTk5MDgtOGFhOTYzNWFhYzhmXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg" id="3" isGenre={true} />
                    <Card key={4} title="Biology" posterUrl="https://fffmovieposters.com/wp-content/uploads/53104.jpg" id="4" isGenre={true} />
                    <Card key={5} title="Comedy" posterUrl="https://m.media-amazon.com/images/M/MV5BYmY3ZGY5ZWMtNmVmZS00NTc3LTgxYTgtYTU4YjM0ZGQxNDY5XkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_.jpg" id="5" isGenre={true} />
                    <Card key={6} title="Crime" posterUrl="https://m.media-amazon.com/images/M/MV5BMjM5YTRlZmUtZGVmYi00ZjE2LWIyNzAtOWVhMDk1MDdkYzhjXkEyXkFqcGdeQXVyMjMxOTE0ODA@._V1_FMjpg_UX1000_.jpg" id="6" isGenre={true} />
                    <Card key={7} title="Detective" posterUrl="https://m.media-amazon.com/images/M/MV5BMWY3NTljMjEtYzRiMi00NWM2LTkzNjItZTVmZjE0MTdjMjJhL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTQ4NTc5OTU@._V1_.jpg" id="7" isGenre={true} />
                    <Card key={8} title="Family" posterUrl="https://m.media-amazon.com/images/M/MV5BOTY0NDNjY2ItYWE2NC00YWJmLWJlNjctNDgyMGRlZTFkNDZiXkEyXkFqcGdeQXVyMTQyMTMwOTk0._V1_.jpg" id="8" isGenre={true} />
                    <Card key={9} title="Fantasy" posterUrl="https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_FMjpg_UX1000_.jpg" id="9" isGenre={true} />
                    <Card key={10} title="History" posterUrl="https://m.media-amazon.com/images/M/MV5BMmI3YjQ4NjctZTk0Zi00ZDFhLTgyZjAtYWRjZTJjMjMwNjM2L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg" id="10" isGenre={true} />
                    <Card key={11} title="Horror" posterUrl="https://m.media-amazon.com/images/M/MV5BZDVkZmI0YzAtNzdjYi00ZjhhLWE1ODEtMWMzMWMzNDA0NmQ4XkEyXkFqcGdeQXVyNzYzODM3Mzg@._V1_.jpg" id="11" isGenre={true} />
                    <Card key={12} title="Indie" posterUrl="https://m.media-amazon.com/images/M/MV5BZTNmOGFiOGEtMDQyZS00NDhmLThiMTAtZDk2YjAxZmExZDJiXkEyXkFqcGdeQXVyOTgxNDIzMTY@._V1_.jpg" id="12" isGenre={true} />
                    <Card key={13} title="Melodrama" posterUrl="https://m.media-amazon.com/images/M/MV5BNGRhZWVkZGUtY2FjMi00NjhlLThhNGYtYTY4ZThhMzdkMjg3XkEyXkFqcGdeQXVyNjc0MzMzNjA@._V1_.jpg" id="13" isGenre={true} />
                    <Card key={14} title="Musical" posterUrl="https://m.media-amazon.com/images/M/MV5BMzUzNDM2NzM2MV5BMl5BanBnXkFtZTgwNTM3NTg4OTE@._V1_FMjpg_UX1000_.jpg" id="14" isGenre={true} />
                    <Card key={15} title="Mystery" posterUrl="https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg" id="15" isGenre={true} />
                    <Card key={16} title="Romance" posterUrl="https://m.media-amazon.com/images/M/MV5BMTk3OTM5Njg5M15BMl5BanBnXkFtZTYwMzA0ODI3._V1_FMjpg_UX1000_.jpg" id="16" isGenre={true} />
                    <Card key={17} title="Sci-Fi" posterUrl="https://m.media-amazon.com/images/M/MV5BN2FjNmEyNWMtYzM0ZS00NjIyLTg5YzYtYThlMGVjNzE1OGViXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg" id="17" isGenre={true} />
                    <Card key={18} title="Sports" posterUrl="https://m.media-amazon.com/images/M/MV5BNzY0MDVjZGYtMDdmZC00NTRjLWE2ZTYtOWFhMTViYzhlZmI3XkEyXkFqcGdeQXVyMjMwNDgzNjc@._V1_FMjpg_UX1000_.jpg" id="18" isGenre={true} />
                    <Card key={19} title="Teen" posterUrl="https://m.media-amazon.com/images/M/MV5BMmVhZjhlZDYtMDAwZi00MDcyLTgzOTItOWNiZjY0YmE0MGE0XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg" id="19" isGenre={true} />
                    <Card key={20} title="Thriller" posterUrl="https://m.media-amazon.com/images/M/MV5BMjY2YmEwNTMtN2RiMy00NGVmLTkwYWMtNGFlY2QwOWQ0MTdjXkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_.jpg" id="20" isGenre={true} />
                    <Card key={21} title="War" posterUrl="https://m.media-amazon.com/images/M/MV5BMjQ1NjM3MTUxNV5BMl5BanBnXkFtZTgwMDc5MTY5OTE@._V1_FMjpg_UX1000_.jpg" id="21" isGenre={true} />
                    <Card key={22} title="Western" posterUrl="https://m.media-amazon.com/images/M/MV5BNjJlYmNkZGItM2NhYy00MjlmLTk5NmQtNjg1NmM2ODU4OTMwXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_FMjpg_UX1000_.jpg" id="22" isGenre={true} />
                </div>
            </div>
        </>
    )
}