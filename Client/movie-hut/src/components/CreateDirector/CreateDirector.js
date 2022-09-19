import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { DirectorContext } from "../../contexts/DirectorContext";
import * as directorService from "../../services/directorService";
import * as imageService from "../../services/imageService";

export const CreateDirector = () => {
    const { auth } = useContext(AuthContext)
    const { create } = useContext(DirectorContext);
    const navigate = useNavigate();
    const [error, setError] = useState({ active: false, message: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [inputData, setInputData] = useState({
        name: "",
        imageUrl: "",
    });

    const [errors, setErrors] = useState({
        name: false
    })

    const [imageData, setImageData] = useState({
        imageFile: '',
    });

    const onChange = (e) => {
        setInputData(state => (
            { ...state, [e.target.name]: e.target.value }))
    }

    const onSelectFile = (e) => {
        setImageData((state) => ({ ...state, imageFile: e.target.files[0] }));
    };
    
    const onSubmit = (e) => {
        e.preventDefault();
        inputData.userId = auth.id;
        const formData = new FormData(e.target);
        //Start spinner
        setIsLoading(true);
        formData.append('imageFile', imageData.imageFile);
        imageService
            .upload(formData, 'Directors')
            .then((imgRes) => {
                //Creating new actor
                directorService
                    .create({ ...inputData, imageUrl: imgRes.imageUrl })
                    .then((res) => {
                        //Add to context
                        create(res);
                        //Stop spinner
                        setIsLoading(false);
                        navigate('/directors/all');
                    })
                    .catch((err) => {
                        //Stop spinner
                        setIsLoading(false);
                        setError({ active: true, message: err.message });
                    });
            })
            .catch((err) => {
                //Stop spinner
                setIsLoading(false);
                setError({ active: true, message: err.message });
            });
    };
    
    //Validation
    const nameValidator = (e) => {
        setErrors(state => ({ ...state, [e.target.name]: inputData.name.length < 3 }))
    }
    const isValidForm = !Object.values(errors).some(x => x);
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card border-0 shadow rounded-3 my-5">
                        <div className="card-body p-4 p-sm-5">
                            <h1 className="card-title text-center mb-5">
                                Create Director
                            </h1>
                            <form
                                encType='multipart/form-data'
                                onSubmit={onSubmit}
                                method='post'>
                                <div className="form-outline">
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="form-control form-control-lg"
                                        placeholder="Enter a valid name"
                                        value={inputData.name}
                                        onChange={onChange}
                                        onBlur={(e) => nameValidator(e)}
                                    />
                                    <label className="form-label" htmlFor="title">
                                        Name
                                    </label>
                                </div>
                                {/* Alert */}
                                {errors.name &&
                                    <div
                                        className="alert alert-danger d-flex align-items-center"
                                        role="alert"
                                    >
                                        <i className="fa-solid fa-triangle-exclamation me-2" />
                                        <div className="text-center">
                                            Please provide a valid name.
                                        </div>
                                    </div>}
                                <div className="mb-4">
                                    <input className="form-control" type="file" name="image" onChange={onSelectFile} />
                                    <label htmlFor="formFile" className="form-label">
                                        Choose Image
                                    </label>
                                </div>
                                {error.active === true ? <div className="alert alert-danger fade show mt-3">
                                    <strong>Error!</strong> {error.message}
                                </div> : null}
                                {/* Button */}
                                <div className="row">
                                    <div className="col-4">
                                        <div className="text-center pt-2">
                                            <button
                                                type="submit"
                                                className="btn btn-success btn-lg"
                                                style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem", backgroundColor: "#32CD32" }}
                                                disabled={!isValidForm || (!inputData.name || !imageData.imageFile)}
                                            >
                                                Create
                                            </button>
                                        </div>
                                    </div>
                                    {isLoading &&
                                        <div className="col">
                                            <div className="spinner-border mt-3 mx-5" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </div>}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}