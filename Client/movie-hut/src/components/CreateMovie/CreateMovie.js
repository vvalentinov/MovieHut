import './CreateMovie.css';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as movieService from '../../services/movieService';
import * as imageService from "../../services/imageService";
import { AuthContext } from '../../contexts/AuthContext';
import { MovieContext } from '../../contexts/MovieContext';
import { Option } from './Option/Option';
import { ActorContext } from '../../contexts/ActorContext';
import { CelebrityOption } from './CelebrityOption/CelebrityOption';
import { AddedCelebrity } from './AddedCelebrity/AddedCelebrity';
import { DirectorContext } from '../../contexts/DirectorContext';

export const CreateMovie = () => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState({ active: false, message: '' });
    const { create } = useContext(MovieContext);
    const [visualizationImageUrl, setVisualizationImageUrl] = useState('');
    const [inputData, setInputData] = useState({
        title: '',
        plot: '',
        released: '',
        posterUrl: '',
        trailerUrl: '',
        duration: '',
    });
    const [imageData, setImageData] = useState({
        imageFile: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    //Genres
    const [areChecked, setAreChecked] = useState(new Array(22).fill(false));

    //Actors
    const { actors } = useContext(ActorContext);
    const [searchActors, setSearchActors] = useState([]);
    const [addedActors, setAddedActors] = useState([]);

    const addActor = (id) => {
        if (!addedActors.includes(id)) {
            setAddedActors((state) => [...state, id]);
        }
    };

    const removeActor = (id) => {
        if (addedActors.includes(id)) {
            setAddedActors((state) => state.filter((x) => x !== id));
        }
    };

    const filterActors = (e) => {
        const query = e.target.value;
        if (query === '') {
            setSearchActors([]);
        } else {
            setSearchActors(
                actors.filter((x) => x.name.toLowerCase().includes(query.toLowerCase()))
            );
        }
    };
    
    //Directors
    const { directors } = useContext(DirectorContext);
    const [searchDirectors, setSearchDirectors] = useState([]);
    const [addedDirectors, setAddedDirectors] = useState([]);

    const addDirector = (id) => {
        if (!addedDirectors.includes(id)) {
            setAddedDirectors((state) => [...state, id]);
        }
    };

    const removeDirector = (id) => {
        if (addedDirectors.includes(id)) {
            setAddedDirectors((state) => state.filter((x) => x !== id));
        }
    };

    const filterDirectors = (e) => {
        const query = e.target.value;
        if (query === '') {
            setSearchDirectors([]);
        } else {
            setSearchDirectors(
                directors.filter((x) => x.name.toLowerCase().includes(query.toLowerCase()))
            );
        }
    };

    const onCheckboxChange = (e) => {
        const temp = [...areChecked];
        temp[e.target.name] = !temp[e.target.name];
        setAreChecked(temp);
    };

    const onChange = (e) => {
        setInputData((state) => ({ ...state, [e.target.name]: e.target.value }));
    };

    const onSelectFile = (e) => {
        setImageData((state) => ({ ...state, imageFile: e.target.files[0] }));
        //Creating local image url for visualization
        if (e.target.files[0]) {
            setVisualizationImageUrl(URL.createObjectURL(e.target.files[0]));
        }else{
            setVisualizationImageUrl('');
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        inputData.userId = auth.id;
        let result = areChecked.map((curr, index) => {
            if (curr === true) {
                return index;
            }
        });
        inputData.genresIds = result.filter(function (item) {
            return typeof item === 'number';
        });
        //Adding actorsIds and directorsIds
        inputData.actorsIds = addedActors;
        inputData.directorsIds = addedDirectors;
        //Creating formdata for image request
        const formData = new FormData(e.target);
        formData.append('imageFile', imageData.imageFile);
        //Start spinner
        setIsLoading(true);
        imageService
            .upload(formData, 'Movies')
            .then(imgRes => {
                movieService
                    .create({ ...inputData, posterUrl: imgRes.imageUrl })
                    .then((res) => {
                        //Add to context
                        create(res);
                        //Stop spinner
                        setIsLoading(false);
                        navigate('/movies/all');
                    })
                    .catch((err) => {
                        setError({ active: true, message: err.message });
                        //Stop spinner
                        setIsLoading(false);
                    });
            })
            .catch((err) => {
                //Stop spinner
                setIsLoading(false);
                setError({ active: true, message: err.message });
            });
    };
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-sm-9 col-md-7 col-lg-5 mx-auto'>
                    <div className='card border-0 shadow rounded-3 my-5'>
                        <div className='card-body p-4 p-sm-5'>
                            <form encType='multipart/form-data'
                                onSubmit={onSubmit}
                                method='post'>
                                <h1 className="card-title text-center mb-5">
                                    Create Movie
                                </h1>
                                {/* Username input */}
                                <div className='form-outline'>
                                    <input
                                        type='text'
                                        id='title'
                                        name='title'
                                        className='form-control form-control-lg'
                                        placeholder='Enter a valid title'
                                        value={inputData.title}
                                        onChange={onChange}
                                    />
                                    <label className='form-label' htmlFor='title'>
                                        Title
                                    </label>
                                </div>
                                <div className='form-outline'>
                                    <textarea
                                        type='text'
                                        id='plot'
                                        name='plot'
                                        className='form-control form-control-lg'
                                        placeholder='Enter a valid plot'
                                        value={inputData.plot}
                                        onChange={onChange}
                                        style={{ height: '200px' }}
                                    />
                                    <label className='form-label' htmlFor='plot'>
                                        Plot
                                    </label>
                                </div>
                                <div className='form-outline'>
                                    <input
                                        type='text'
                                        id='trailerUrl'
                                        name='trailerUrl'
                                        className='form-control form-control-lg'
                                        placeholder='Enter a valid embedded youtube video'
                                        value={inputData.trailerUrl}
                                        onChange={onChange}
                                    />
                                    <label className='form-label' htmlFor='trailerUrl'>
                                        Trailer Url
                                    </label>
                                    <a href='https://youtu.be/kiyi-C7NQrQ'> How to get?</a>
                                </div>
                                <div className='form-outline'>
                                    <input
                                        type='date'
                                        min='1900'
                                        max='2099'
                                        step='1'
                                        id='released'
                                        name='released'
                                        value={inputData.released}
                                        onChange={onChange}
                                        className='form-control form-control-lg'
                                        placeholder='Enter when was released'
                                    />
                                    <label className='form-label' htmlFor='released'>
                                        Released
                                    </label>
                                </div>
                                <div className='form-outline'>
                                    <input
                                        type='number'
                                        id='duration'
                                        name='duration'
                                        className='form-control form-control-lg'
                                        placeholder='Enter the duration of the movie'
                                        value={inputData.duration}
                                        onChange={onChange}
                                    />
                                    <label className='form-label' htmlFor='duration'>
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
                                <div>
                                    <input
                                        className='form-control'
                                        type='file'
                                        name='poster'
                                        onChange={onSelectFile}
                                    />
                                    <label htmlFor='formFile' className='form-label'>
                                        Choose Poster
                                    </label>
                                </div>
                                {visualizationImageUrl &&
                                    <>
                                        <img className='img-fluid' src={visualizationImageUrl} alt='actor img' style={{ height: 300 }} />
                                    </>
                                }
                                {/* Actor search*/}
                                <div className='mb-1'>
                                    {addedActors.map((x) => (
                                        <AddedCelebrity
                                            key={x}
                                            id={x}
                                            removeCelebrity={removeActor}
                                            name={actors.filter((y) => y.id === x)[0].name}
                                        />
                                    ))}
                                </div>
                                <div className='form-outline'>
                                    <input
                                        type='text'
                                        id='actors'
                                        name='actors'
                                        className='form-control form-control-lg'
                                        placeholder='Enter a valid name'
                                        onKeyUp={filterActors}
                                    />
                                    <label className='form-label' htmlFor='actors'>
                                        Search for actors
                                    </label>
                                    {searchActors.length > 0 ? (
                                        <div className='overflow-scroll scroll-box'>
                                            {searchActors.map((x) => (
                                                <CelebrityOption key={x.id} {...x} addCelebrity={addActor} />
                                            ))}
                                        </div>
                                    ) : null}
                                </div>
                                {/* Director search*/}
                                <div className='mb-1'>
                                    {addedDirectors.map((x) => (
                                        <AddedCelebrity
                                            key={x}
                                            id={x}
                                            removeCelebrity={removeDirector}
                                            name={directors.filter((y) => y.id === x)[0].name}
                                        />
                                    ))}
                                </div>
                                <div className='form-outline'>
                                    <input
                                        type='text'
                                        id='directors'
                                        name='directors'
                                        className='form-control form-control-lg'
                                        placeholder='Enter a valid name'
                                        onKeyUp={filterDirectors}
                                    />
                                    <label className='form-label' htmlFor='directors'>
                                        Search for directors
                                    </label>
                                    {searchDirectors.length > 0 ? (
                                        <div className='overflow-scroll scroll-box'>
                                            {searchDirectors.map((x) => (
                                                <CelebrityOption key={x.id} {...x} addCelebrity={addDirector} />
                                            ))}
                                        </div>
                                    ) : null}
                                </div>
                                <h5>Genres</h5>
                                <div className='form-outline mb-4'>
                                    <Option
                                        name='Action'
                                        element='1'
                                        value={areChecked[1]}
                                        handler={onCheckboxChange}
                                    />
                                    <Option
                                        name='Adventure'
                                        element='2'
                                        value={areChecked[2]}
                                        handler={onCheckboxChange}
                                    />
                                    <Option
                                        name='Animated'
                                        element='3'
                                        value={areChecked[3]}
                                        handler={onCheckboxChange}
                                    />
                                    <Option
                                        name='Biology'
                                        element='4'
                                        value={areChecked[4]}
                                        handler={onCheckboxChange}
                                    />
                                    <Option
                                        name='Comedy'
                                        element='5'
                                        value={areChecked[5]}
                                        handler={onCheckboxChange}
                                    />
                                    <Option
                                        name='Crime'
                                        element='6'
                                        value={areChecked[6]}
                                        handler={onCheckboxChange}
                                    />
                                    <Option
                                        name='Detective'
                                        element='7'
                                        value={areChecked[7]}
                                        handler={onCheckboxChange}
                                    />
                                    <Option
                                        name='Family'
                                        element='8'
                                        value={areChecked[8]}
                                        handler={onCheckboxChange}
                                    />
                                    <Option
                                        name='Fantasy'
                                        element='9'
                                        value={areChecked[9]}
                                        handler={onCheckboxChange}
                                    />
                                    <Option
                                        name='History'
                                        element='10'
                                        value={areChecked[10]}
                                        handler={onCheckboxChange}
                                    />
                                    <Option
                                        name='Horror'
                                        element='11'
                                        value={areChecked[11]}
                                        handler={onCheckboxChange}
                                    />
                                    <Option
                                        name='Indie'
                                        element='12'
                                        value={areChecked[12]}
                                        handler={onCheckboxChange}
                                    />
                                    <Option
                                        name='Melodrama'
                                        element='13'
                                        value={areChecked[13]}
                                        handler={onCheckboxChange}
                                    />
                                    <Option
                                        name='Musical'
                                        element='14'
                                        value={areChecked[14]}
                                        handler={onCheckboxChange}
                                    />
                                    <Option
                                        name='Mystery'
                                        element='15'
                                        value={areChecked[15]}
                                        handler={onCheckboxChange}
                                    />
                                    <Option
                                        name='Romance'
                                        element='16'
                                        value={areChecked[16]}
                                        handler={onCheckboxChange}
                                    />
                                    <Option
                                        name='Sci-Fi'
                                        element='17'
                                        value={areChecked[17]}
                                        handler={onCheckboxChange}
                                    />
                                    <Option
                                        name='Sports'
                                        element='18'
                                        value={areChecked[18]}
                                        handler={onCheckboxChange}
                                    />
                                    <Option
                                        name='Teen'
                                        element='19'
                                        value={areChecked[19]}
                                        handler={onCheckboxChange}
                                    />
                                    <Option
                                        name='Thriller'
                                        element='20'
                                        value={areChecked[20]}
                                        handler={onCheckboxChange}
                                    />
                                    <Option
                                        name='War'
                                        element='21'
                                        value={areChecked[21]}
                                        handler={onCheckboxChange}
                                    />
                                    <Option
                                        name='Western'
                                        element='22'
                                        value={areChecked[22]}
                                        handler={onCheckboxChange}
                                    />
                                </div>
                                {error.active === true ? (
                                    <div className='alert alert-danger fade show mt-3'>
                                        <strong>Error!</strong> {error.message}
                                    </div>
                                ) : null}
                                <div className='row'>
                                    <div className='col-4'>
                                        <div className='text-center text-lg-start mt-2 pt-2'>
                                            <button
                                                type='submit'
                                                className='btn btn-success btn-lg'
                                                style={{
                                                    paddingLeft: '2.5rem',
                                                    paddingRight: '2.5rem',
                                                    backgroundColor: '#32CD32',
                                                }}
                                            >
                                                Create
                                            </button>
                                        </div>
                                    </div>
                                    {isLoading && (
                                        <div className='col'>
                                            <div className='spinner-border mt-4' role='status'>
                                                <span className='sr-only'>Loading...</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
