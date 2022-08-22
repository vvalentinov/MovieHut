import styles from './Header.module.css';
import logo from '../../images/logo.jpg'

export const Header = () => {
    return (
        <nav className={`navbar navbar-expand-lg ${styles.navbarBackground}`}>
            <div className="container-fluid">
                <a className="navbar-brand mx-3" to="/">
                    <img src={logo} alt="" width={45} height={45} />
                </a>
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
                            <a className="nav-link" aria-current="page" href="#">
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Movies
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Actors
                            </a>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <button className="btn btn-outline-success" type="submit">
                            Search
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    )
}