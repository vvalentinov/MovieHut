import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Banner.module.css';

export const Banner = () => {
    const [selection, setSelection] = useState('Actors');
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const changeSelection = (e) => {
        setSelection(e.target.innerText)
    }
    const changeSearch = (e) => {
        setSearch(e.target.value)
    }
    const onSubmit = (e) => {
        e.preventDefault();
        navigate(`/${selection.toLowerCase()}/all?search=${search}`);
    }
    return (
        <div className={styles.banner}>
            <div className={`container ${styles.bannerChildren}`}>
                <div className='row'>
                    <div className='col-1'></div>
                    <div className='col-6 text-left text-light'>
                        <h1 className='display-1 font-weight-bold'>Movie Hut</h1>
                        <h5>Find information about your favourite movies and actors</h5>
                        <form className="d-flex mt-5" role="search" onSubmit={onSubmit}>
                            <div className='input-group'>
                                <div className="input-group-prepend">
                                    <div className="dropdown">
                                        <a
                                            className="dropdown-toggle btn btn-outline-light"
                                            href="/movie/create"
                                            style={{ backgroundColor: "#32CD32" }}
                                            id="navbarDropdown"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            {selection}
                                        </a>
                                        <ul
                                            className="dropdown-menu text-light"
                                            aria-labelledby="navbarDropdown"
                                        >
                                            <li>
                                                <h5 className="dropdown-item" onClick={changeSelection} >
                                                    Movies
                                                </h5>
                                            </li>
                                            <li>
                                                <h5 className="dropdown-item" onClick={changeSelection} >
                                                    Shows
                                                </h5>
                                            </li>
                                            <li>
                                                <h5 className="dropdown-item" onClick={changeSelection} >
                                                    Actors
                                                </h5>
                                            </li>
                                            <li>
                                                <h5 className="dropdown-item" onClick={changeSelection} >
                                                    Directors
                                                </h5>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="search"
                                    id="search"
                                    value={search}
                                    onChange={changeSearch}
                                    placeholder="Search here..."
                                />
                            </div>
                            <button
                                className="btn btn-outline-light"
                                style={{ backgroundColor: "#32CD32" }}
                                type="submit"
                            >
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}