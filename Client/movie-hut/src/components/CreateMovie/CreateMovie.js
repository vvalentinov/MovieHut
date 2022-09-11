import './CreateMovie.css';
import image from '../../images/clipper.jpg'
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as movieService from '../../services/movieService'
import { AuthContext } from '../../contexts/AuthContext';
import { MovieContext } from '../../contexts/MovieContext';
import { Option } from './Option/Option';
import { ActorContext } from '../../contexts/ActorsContext';
import { ActorOption } from './ActorOption/ActorOption';
import { AddedActor } from './AddedActor/AddedActor';

export const CreateMovie = () => {
    const { auth } = useContext(AuthContext)
    const navigate = useNavigate();
    const [error, setError] = useState({ active: false, message: "" });
    const { create } = useContext(MovieContext);
    const [inputData, setInputData] = useState({
        title: "",
        plot: "",
        released: "",
        posterUrl: "",
        trailerUrl: "",
        duration: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const { actors } = useContext(ActorContext);
    const [searchActors, setSearchActors] = useState([]);
    const [addedActors, setAddedActors] = useState([]);
    const [areChecked, setAreChecked] = useState(
        new Array(22).fill(false)
    );

    const addActor = (id) => {
        if(!addedActors.includes(id)){
            setAddedActors(state => [...state, id])
        }
    }

    const removeActor = (id) => {
        if(addedActors.includes(id)){
            setAddedActors(state => state.filter(x => x !== id))
        }
    }

    const filterActors = (e) => {
        const query = e.target.value;
        if (query === '') {
            setSearchActors([]);
        } else {
            setSearchActors(actors.filter(x => x.name.toLowerCase().includes(query)))
        }
    }
    const onCheckboxChange = (e) => {
        const temp = [...areChecked];
        temp[e.target.name] = !temp[e.target.name];
        setAreChecked(temp)
    }

    const onChange = (e) => {
        setInputData(state => (
            { ...state, [e.target.name]: e.target.value }))
    }

    const onSelectFile = (e) => {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (e) => {
            setInputData(state => (
                { ...state, 'posterUrl': e.target.result }))
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        inputData.userId = auth.id;
        let result = areChecked.map((curr, index) => {
            if (curr === true) {
                return index;
            }
        })
        inputData.genresIds = result.filter(function (item) {
            return typeof item === 'number';
        });
        setIsLoading(true);
        movieService.create(inputData)
            .then(res => {
                create(res)
                setIsLoading(false);
                navigate('/movies/all')
            }).catch(err => {
                setError({ active: true, message: err.message })
                setIsLoading(false);
            })
    }
    return (
        <div className="container-fluid h-custom my-3">
            <div className="row d-flex justify-content-center align-items-center h-100 gy-3">
                <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                    <form onSubmit={onSubmit}>
                        <p className='display-4 font-weight-light'>Create Movie</p>
                        {/* Username input */}
                        <div className="form-outline mb-4">
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className="form-control form-control-lg"
                                placeholder="Enter a valid title"
                                value={inputData.title}
                                onChange={onChange}
                            />
                            <label className="form-label" htmlFor="title">
                                Title
                            </label>
                        </div>
                        <div className="form-outline mb-4">
                            <textarea
                                type="text"
                                id="plot"
                                name="plot"
                                className="form-control form-control-lg"
                                placeholder="Enter a valid plot"
                                value={inputData.plot}
                                onChange={onChange}
                                style={{ height: '200px' }}
                            />
                            <label className="form-label" htmlFor="plot">
                                Plot
                            </label>
                        </div>
                        <div className="form-outline mb-4">
                            <input
                                type="text"
                                id="trailerUrl"
                                name="trailerUrl"
                                className="form-control form-control-lg"
                                placeholder="Enter a valid embedded youtube video"
                                value={inputData.trailerUrl}
                                onChange={onChange}
                            />
                            <label className="form-label" htmlFor="trailerUrl">
                                Trailer Url
                            </label>
                            <a href='https://youtu.be/kiyi-C7NQrQ'>   How to get?</a>
                        </div>
                        <div className="form-outline mb-4">
                            <input
                                type="date"
                                min="1900"
                                max="2099"
                                step="1"
                                id="released"
                                name="released"
                                value={inputData.released}
                                onChange={onChange}
                                className="form-control form-control-lg"
                                placeholder="Enter when was released"
                            />
                            <label className="form-label" htmlFor="released">
                                Released
                            </label>
                        </div>
                        <div className="form-outline mb-4">
                            <input
                                type="number"
                                id="duration"
                                name="duration"
                                className="form-control form-control-lg"
                                placeholder="Enter the duration of the movie"
                                value={inputData.duration}
                                onChange={onChange}
                            />
                            <label className="form-label" htmlFor="duration">
                                Duration (in minutes)
                            </label>
                        </div>
                        {/* <div className="form-outline mb-4">
                            <input
                                type="text"
                                id="posterUrl"
                                name="posterUrl"
                                value={inputData.posterUrl}
                                onChange={onChange}
                                className="form-control form-control-lg"
                                placeholder="Enter a valid Poster Url"
                            />
                            <label className="form-label" htmlFor="posterUrl">
                                Poster Url
                            </label>
                        </div> */}
                        <div className="mb-4">
                            <input className="form-control" type="file" name="poster" onChange={onSelectFile} />
                            <label htmlFor="formFile" className="form-label">
                                Choose Poster
                            </label>
                        </div>
                        <div className='mb-1'>
                            {addedActors.map(x => <AddedActor key = {x} id = {x} removeActor={removeActor} name={actors.filter(y => y.id === x)[0].name}/>)}
                        </div>
                        <div className="form-outline mb-4">
                            <input
                                type="text"
                                id="actors"
                                name="actors"
                                className="form-control form-control-lg"
                                placeholder="Enter a valid name"
                                onKeyUp={filterActors}
                            />
                            <label className="form-label" htmlFor="actors">
                                Search for actors
                            </label>
                            {searchActors.length > 0 ?
                                <div className='overflow-scroll scroll-box'>
                                            {searchActors.map(x => <ActorOption key={x.id} {...x} addActor= {addActor}/>)}
                                </div>
                                : null}
                        </div>
                        <h5>Genres</h5>
                        <div className="form-outline mb-4">
                            <Option name='Action' element='1' value={areChecked[1]} handler={onCheckboxChange} />
                            <Option name='Adventure' element='2' value={areChecked[2]} handler={onCheckboxChange} />
                            <Option name='Animated' element='3' value={areChecked[3]} handler={onCheckboxChange} />
                            <Option name='Biology' element='4' value={areChecked[4]} handler={onCheckboxChange} />
                            <Option name='Comedy' element='5' value={areChecked[5]} handler={onCheckboxChange} />
                            <Option name='Crime' element='6' value={areChecked[6]} handler={onCheckboxChange} />
                            <Option name='Detective' element='7' value={areChecked[7]} handler={onCheckboxChange} />
                            <Option name='Family' element='8' value={areChecked[8]} handler={onCheckboxChange} />
                            <Option name='Fantasy' element='9' value={areChecked[9]} handler={onCheckboxChange} />
                            <Option name='History' element='10' value={areChecked[10]} handler={onCheckboxChange} />
                            <Option name='Horror' element='11' value={areChecked[11]} handler={onCheckboxChange} />
                            <Option name='Indie' element='12' value={areChecked[12]} handler={onCheckboxChange} />
                            <Option name='Melodrama' element='13' value={areChecked[13]} handler={onCheckboxChange} />
                            <Option name='Musical' element='14' value={areChecked[14]} handler={onCheckboxChange} />
                            <Option name='Mystery' element='15' value={areChecked[15]} handler={onCheckboxChange} />
                            <Option name='Romance' element='16' value={areChecked[16]} handler={onCheckboxChange} />
                            <Option name='Sci-Fi' element='17' value={areChecked[17]} handler={onCheckboxChange} />
                            <Option name='Sports' element='18' value={areChecked[18]} handler={onCheckboxChange} />
                            <Option name='Teen' element='19' value={areChecked[19]} handler={onCheckboxChange} />
                            <Option name='Thriller' element='20' value={areChecked[20]} handler={onCheckboxChange} />
                            <Option name='War' element='21' value={areChecked[21]} handler={onCheckboxChange} />
                            <Option name='Western' element='22' value={areChecked[22]} handler={onCheckboxChange} />
                        </div>
                        {error.active === true ? <div className="alert alert-danger fade show mt-3">
                            <strong>Error!</strong> {error.message}
                        </div> : null}
                        <div className='row'>
                            <div className='col-4'>
                                <div className="text-center text-lg-start mt-2 pt-2">
                                    <button
                                        type="submit"
                                        className="btn btn-success btn-lg"
                                        style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem", backgroundColor: "#32CD32" }}
                                    >
                                        Create
                                    </button>
                                </div>
                            </div>
                            {isLoading &&
                                <div className='col'>
                                    <div className="spinner-border mt-4" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>}

                        </div>


                    </form>
                </div>
                <div className="col-md-9 col-lg-6 col-xl-5">
                    <img
                        src={image}
                        className="img-fluid"
                        alt="Login img"
                    />
                </div>
            </div>
        </div>
    )
}