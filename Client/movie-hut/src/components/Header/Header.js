import styles from './Header.module.css';
import logo from '../../images/logo.jpg'
import {
    Link
} from "react-router-dom";
export const Header = () => {
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
                            <Link className="nav-link" to='/movie/all'>
                                Movies
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/tv-show/all'>
                                Tv Shows
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/actor/all">
                                Actors
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav me-auto-reverse mb-2 mb-lg-0">
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
                    </ul>
                </div>
            </div>
        </nav>
    )
}