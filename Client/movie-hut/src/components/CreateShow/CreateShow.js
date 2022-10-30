import './CreateShow.css';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as showService from '../../services/showService';
import * as imageService from "../../services/imageService";
import { AuthContext } from '../../contexts/AuthContext';
import { ShowContext } from '../../contexts/ShowContext';
import { Option } from '../CreateMovie/Option/Option';
import { ActorContext } from '../../contexts/ActorContext';
import { CelebrityOption } from '../CreateMovie/CelebrityOption/CelebrityOption';
import { AddedCelebrity } from '../CreateMovie/AddedCelebrity/AddedCelebrity';
import { DirectorContext } from '../../contexts/DirectorContext';
import { Alert } from '../Alert/Alert';

export const CreateShow = () => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const { create } = useContext(ShowContext);
    const [visualizationImageUrl, setVisualizationImageUrl] = useState('');
    const [inputData, setInputData] = useState({
        title: '',
        plot: '',
        released: '',
        posterUrl: '',
        trailerUrl: '',
        seasonsCount: ''
    });
    const [error, setError] = useState({ active: false, message: '' });
    const [errors, setErrors] = useState({
        title: false,
        plot: false,
        released: false,
        posterUrl: false,
        trailerUrl: false,
        actors: false,
        directors: false,
        genres: false,
        seasonsCount: false
    })
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
        //Setting error whenever they array is populated with false only
        setErrors(state => ({ ...state, genres: !temp.some(x => x === true)}))
    };

    const onChange = (e) => {
        setInputData((state) => ({ ...state, [e.target.name]: e.target.value }));
    };

    const onSelectFile = (e) => {
        setImageData((state) => ({ ...state, imageFile: e.target.files[0] }));
        //Creating local image url for visualization
        if (e.target.files[0]) {
            setVisualizationImageUrl(URL.createObjectURL(e.target.files[0]));
            //Turn off validation error
            setErrors(state => ({ ...state, posterUrl: false }))
        } else {
            setVisualizationImageUrl('');
            //Turn on validation error
            setErrors(state => ({ ...state, posterUrl: true }))
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
        formData.append('folderName', 'Shows');
        //Start spinner
        setIsLoading(true);
        imageService
            .upload(formData)
            .then(imgRes => {
                showService
                    .create({ ...inputData, posterUrl: imgRes.imageUrl })
                    .then((res) => {
                        //Add to context
                        create(res);
                        //Stop spinner
                        setIsLoading(false);
                        navigate(`/shows/details/${res.id}`);
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
    //Validation
    const minMaxValidator = (e, min, max) => {
        setErrors(state => ({ ...state, [e.target.name]: inputData[e.target.name].length < min || inputData[e.target.name].length > max }))
    }
    const emptyValidator = (e) => {
        setErrors(state => ({ ...state, [e.target.name]: !inputData[e.target.name] }))
    }
    const emptyAddActorsValidator = () => {
        setErrors(state => ({ ...state, actors: addedActors.length <= 0}))
    }
    const emptyAddDirectorsValidator = () => {
        setErrors(state => ({ ...state, directors: addedDirectors.length <= 0}))
    }
    const youtubeUrlValidator = (e) => {
        var re = /^(https|http):\/\/(?:www\.)?youtube.com\/embed\/[A-z0-9]+/;
        setErrors(state => ({ ...state, [e.target.name]: !re.test(inputData[e.target.name]) }))
    }
    const minMaxNumberValidation = (e, min, max) => {
        setErrors(state => ({ ...state, [e.target.name]: inputData[e.target.name] < min || inputData[e.target.name] > max }))
    }
    const isValidForm = !Object.values(errors).some(x => x);
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
                                    Create Show
                                </h1>
                                {/* Title input */}
                                <div className='form-outline'>
                                    <input
                                        type='text'
                                        id='title'
                                        name='title'
                                        className='form-control form-control-lg'
                                        placeholder='Enter a valid title'
                                        value={inputData.title}
                                        onChange={onChange}
                                        onBlur={(e) => minMaxValidator(e, 2, 100)}
                                    />
                                    <label className='form-label' htmlFor='title'>
                                        Title
                                    </label>
                                </div>
                                {/* Title alert */}
                                {errors.title &&
                                    <Alert message="The title must be between 2 and 100 characters long." />
                                }
                                {/* Plot input */}
                                <div className='form-outline'>
                                    <textarea
                                        type='text'
                                        id='plot'
                                        name='plot'
                                        className='form-control form-control-lg'
                                        placeholder='Enter a valid plot'
                                        value={inputData.plot}
                                        onChange={onChange}
                                        onBlur={(e) => minMaxValidator(e, 100, 2000)}
                                        style={{ height: '200px' }}
                                    />
                                    <label className='form-label' htmlFor='plot'>
                                        Plot
                                    </label>
                                </div>
                                {/* Plot alert */}
                                {errors.plot &&
                                    <Alert message="The plot must be between 100 and 2000 characters long." />
                                }

                                {/*Trailer input*/}
                                <div className='form-outline'>
                                    <input
                                        type='text'
                                        id='trailerUrl'
                                        name='trailerUrl'
                                        className='form-control form-control-lg'
                                        placeholder='Enter a valid embedded youtube video'
                                        value={inputData.trailerUrl}
                                        onChange={onChange}
                                        onBlur={(e) => youtubeUrlValidator(e)}
                                    />
                                    <label className='form-label' htmlFor='trailerUrl'>
                                        Trailer Url
                                    </label>
                                    <a href='https://youtu.be/kiyi-C7NQrQ'> How to get?</a>
                                </div>
                                {/*Trailer view*/}
                                {/* {inputData.trailerUrl &&
                                    <iframe
                                        style={{ height: 200, width: '100%' }}
                                        src={inputData.trailerUrl}
                                        allowFullScreen
                                    />
                                } */}
                                {/*Trailer alert*/}
                                {errors.trailerUrl &&
                                    <Alert message={<p>"Please provide a valid trailer URL. <a href='https://youtu.be/kiyi-C7NQrQ'> How to get?</a>"</p>} />
                                }
                                {/*Released input*/}
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
                                        onBlur={(e) => emptyValidator(e)}
                                        className='form-control form-control-lg'
                                        placeholder='Enter when was released'
                                    />
                                    <label className='form-label' htmlFor='released'>
                                        Released
                                    </label>
                                </div>
                                {/*Released alert*/}
                                {errors.released &&
                                    <Alert message="Please provide a date." />
                                }
                                {/*SeasonsCount input*/}
                                <div className='form-outline'>
                                    <input
                                        type='number'
                                        id='seasonsCount'
                                        name='seasonsCount'
                                        className='form-control form-control-lg'
                                        placeholder='Enter the count of the seasons of the show'
                                        value={inputData.seasonsCount}
                                        onBlur={(e) => minMaxNumberValidation(e, 1, 30)}
                                        onChange={onChange}
                                    />
                                    <label className='form-label' htmlFor='seasonsCount'>
                                        Seasons
                                    </label>
                                </div>
                                {/*SeasonsCount alert*/}
                                {errors.seasonsCount &&
                                    <Alert message="The count of the seasons must be between 1 and 30" />
                                }
                                {/*Poster input*/}
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
                                {/*Poster alert*/}
                                {errors.posterUrl &&
                                    <Alert message="Please provide valid poster." />
                                }
                                {visualizationImageUrl &&
                                    <>
                                        <img className='img-fluid' src={visualizationImageUrl} alt='actor img' style={{ height: 300 }} />
                                    </>
                                }
                                
                                {/* Actor view*/}
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
                                {/* Actor search*/}
                                <div className='form-outline'>
                                    <input
                                        type='text'
                                        id='actors'
                                        name='actors'
                                        className='form-control form-control-lg'
                                        placeholder='Enter a valid name'
                                        onKeyUp={filterActors}
                                        onBlur = {emptyAddActorsValidator}
                                    />
                                    <label className='form-label' htmlFor='actors'>
                                        Search for actors
                                    </label>
                                    {searchActors.length > 0 ? (
                                        <div className='overflow-scroll scroll-box' style={{zIndex: 10}}>
                                            {searchActors.map((x) => (
                                                <CelebrityOption 
                                                key={x.id} 
                                                {...x} 
                                                addCelebrity={addActor} />
                                            ))}
                                        </div>
                                    ) : null}
                                </div>
                                {/*Actors alert*/}
                                {errors.actors &&
                                    <Alert message="Please add at least one actor."/>
                                }

                                {/* Director view*/}
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
                                {/* Director search*/}
                                <div className='form-outline'>
                                    <input
                                        type='text'
                                        id='directors'
                                        name='directors'
                                        className='form-control form-control-lg'
                                        placeholder='Enter a valid name'
                                        onKeyUp={filterDirectors}
                                        onBlur = {emptyAddDirectorsValidator}
                                    />
                                    <label className='form-label' htmlFor='directors'>
                                        Search for directors
                                    </label>
                                    {searchDirectors.length > 0 ? (
                                        <div className='overflow-scroll scroll-box' style={{zIndex: 10}}>
                                            {searchDirectors.map((x) => (
                                                <CelebrityOption 
                                                key={x.id} 
                                                {...x} 
                                                addCelebrity={addDirector} />
                                            ))}
                                        </div>
                                    ) : null}
                                </div>
                                {/*Director alert*/}
                                {errors.directors &&
                                    <Alert message="Please add at least one director."/>
                                }
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
                                {/*Genres alert*/}
                                {errors.genres &&
                                    <Alert message="Please add at least one genre."/>
                                }
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
                                                disabled={!isValidForm || (!inputData.title || !inputData.plot || !inputData.released || !inputData.trailerUrl || !imageData.imageFile || addedActors.length <= 0 || addedDirectors.length <= 0 || !areChecked.some(x => x === true))}
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
