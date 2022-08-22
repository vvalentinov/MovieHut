import styles from './Banner.module.css';

export const Banner = () => {
    return (
        <div className = {styles.banner}>
            <div className={`container ${styles.bannerChildren}`}>
                <div className='row'>
                    <div className = 'col-1'></div>
                    <div className='col-6 text-left text-light'>
                        <h1 className='display-1 font-weight-bold'>Movie Hut</h1>
                        <h5>Find information about your favourite movies and actors</h5>
                        <form className="d-flex mt-5" role="search">
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                id="title"
                                placeholder="Search for a movie"
                            />
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