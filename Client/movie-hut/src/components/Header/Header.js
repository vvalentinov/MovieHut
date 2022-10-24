import styles from './Header.module.css';
import logo from '../../images/logo.jpg'
import {
    Link
} from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export const Header = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <nav className={`navbar navbar-expand-lg ${styles.navbarBackground}`}>
            <div className="container-fluid">
                <Link className="navbar-brand mx-3" to="/">
                    <img src={logo} alt="" width={45} height={45} />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className={`navbar-nav me-auto mb-2 mb-lg-0`}>
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to='/'>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/movies/all'>
                                Movies
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/shows/all'>
                                Shows
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="/movie/create"
                                style={{ fontWeight: 700, fontSize: "large"}}
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Celebrities
                            </a>
                            <ul
                                className="dropdown-menu text-light"
                                aria-labelledby="navbarDropdown"
                            >
                                <li>
                                    <Link className="dropdown-item" to="/actors/all">
                                        Actors
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/directors/all">
                                        Directors
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/genres/all">
                                Genres
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav me-auto-reverse mb-2 mb-lg-0">
                        {isAuthenticated
                            ?
                            <>
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="/movie/create"
                                        style={{ fontWeight: 700, fontSize: "large", paddingRight: 20 }}
                                        id="navbarDropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Create
                                    </a>
                                    <ul
                                        className="dropdown-menu text-light"
                                        aria-labelledby="navbarDropdown"
                                    >
                                        <li>
                                            <Link className="dropdown-item" to="/movies/create">
                                                Movie
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/shows/create">
                                                Show
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/actors/create">
                                                Actor
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/directors/create">
                                                Director
                                            </Link>
                                        </li>
                                    </ul>
                                </li>

                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="/profile"
                                        style={{ fontWeight: 700, fontSize: "large", paddingRight: 60 }}
                                        id="navbarDropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Profile
                                    </a>
                                    <ul
                                        className="dropdown-menu text-light"
                                        aria-labelledby="navbarDropdown"
                                    >
                                        <li>
                                            <Link className="dropdown-item" to="/profile">
                                                Information
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/movies/mine">
                                                My Movies
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/shows/mine">
                                                My Shows
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/logout">
                                                Logout
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            </>
                            : <ul className="navbar-nav me-auto-reverse mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">
                                        Register
                                    </Link >
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">
                                        Login
                                    </Link >
                                </li>
                            </ul>}
                    </ul>
                </div>
            </div>
        </nav>
    )
}