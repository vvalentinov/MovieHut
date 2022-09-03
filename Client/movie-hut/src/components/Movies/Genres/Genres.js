import { Link } from "react-router-dom"
import styles from "../Movies.module.css"
export const Genres = () => {
    return (
        <>
            <h4>Genres</h4>
            <ul className={styles.list}>
                <li>
                    <Link to='/movies/all/horror' style={{ textDecoration: 'none' }}>
                        Horror
                    </Link><br />
                    <Link to='/movies/all/sci-fi' style={{ textDecoration: 'none' }}>
                        Sci-Fi
                    </Link><br />
                    <Link to='/movies/all/sports' style={{ textDecoration: 'none' }}>
                        Sports
                    </Link><br />
                    <Link to='/movies/all/war' style={{ textDecoration: 'none' }}>
                        War
                    </Link><br />
                    <Link to='/movies/all/family' style={{ textDecoration: 'none' }}>
                        Family
                    </Link><br />
                    <Link to='/movies/all/history' style={{ textDecoration: 'none' }}>
                        History
                    </Link><br />
                    <Link to='/movies/all/mystery' style={{ textDecoration: 'none' }}>
                        Mystery
                    </Link><br />
                    <Link to='/movies/all/thriller' style={{ textDecoration: 'none' }}>
                        Thriller
                    </Link><br />
                    <Link to='/movies/all/romance' style={{ textDecoration: 'none' }}>
                        Romance
                    </Link><br />
                    <Link to='/movies/all/musicals' style={{ textDecoration: 'none' }}>
                        Musicals
                    </Link><br />
                    <Link to='/movies/all/melodramas' style={{ textDecoration: 'none' }}>
                        Melodramas
                    </Link><br />
                    <Link to='/movies/all/action' style={{ textDecoration: 'none' }}>
                        Action
                    </Link><br />
                    <Link to='/movies/all/crime' style={{ textDecoration: 'none' }}>
                        Crime
                    </Link><br />
                    <Link to='/movies/all/comedy' style={{ textDecoration: 'none' }}>
                        Comedy
                    </Link><br />
                    <Link to='/movies/all/westerns' style={{ textDecoration: 'none' }}>
                        Westerns
                    </Link><br />
                    <Link to='/movies/all/adventure' style={{ textDecoration: 'none' }}>
                        Adventure
                    </Link><br />
                    <Link to='/movies/all/detective' style={{ textDecoration: 'none' }}>
                        Detective
                    </Link><br />
                    <Link to='/movies/all/teen' style={{ textDecoration: 'none' }}>
                        Teen
                    </Link><br />
                    <Link to='/movies/all/animated' style={{ textDecoration: 'none' }}>
                        Animated
                    </Link><br />
                    <Link to='/movies/all/fantasy' style={{ textDecoration: 'none' }}>
                        Fantasy
                    </Link><br />
                    <Link to='/movies/all/biography' style={{ textDecoration: 'none' }}>
                        Biography
                    </Link><br />
                    <Link to='/movies/all/indie' style={{ textDecoration: 'none' }}>
                        Indie
                    </Link><br />
                </li>
            </ul>
        </>
    )
}