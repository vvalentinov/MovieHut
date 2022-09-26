import { Link, useNavigate, useParams } from "react-router-dom"
import { useOwner } from "../../hooks/useOwner";
import { DirectorDetailsCard } from "./DirectorDetailsCard/DirectorDetailsCard";
import { Missing } from "../Missing/Missing";
import * as directorService from '../../services/directorService';
import { useContext } from "react";
import { DirectorContext } from '../../contexts/DirectorContext'
import { useDirector } from "../../hooks/useDirector";

export const DirectorDetails = () => {
    const { directorId } = useParams();
    const { director, setDirector } = useDirector(directorId);
    const navigate = useNavigate();
    const { deleteDirector } = useContext(DirectorContext)
    const { isOwner } = useOwner(directorId, directorService);

    const onClickDelete = () => {
        directorService.del(directorId)
            .then(res => {
                deleteDirector(directorId)
                navigate('/directors/all')
            }).catch(err => {
                alert(err)
            })
    }
    return (
        <div className="container my-4">
            <div className={'card'}>
                <div className='card-body'>
                    <div className="row">
                        <div className="col-md-2">
                            <img className="img-fluid" src={director?.imageUrl} alt="photo" />
                            {isOwner ?
                                <>
                                    <button
                                        className="btn btn-outline-light"
                                        style={{ backgroundColor: "#32CD32" }}
                                        onClick={onClickDelete}
                                        type="button"
                                    >
                                        Delete
                                    </button>
                                    <Link
                                        className="btn btn-outline-light"
                                        style={{ backgroundColor: "#32CD32" }}
                                        to={`/directors/edit/${directorId}`}
                                        type="button"
                                    >
                                        Edit
                                    </Link>
                                </>
                                : null}
                        </div>
                        <div className="col">
                            <h1>{director?.name}</h1>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        </div>
                        <div className="row my-3">
                            <div className="col-md-2">

                            </div>
                            <div className="col">
                                <h3>Movies</h3>
                                <div className="container my-5">
                                    <div className="row justify-content-center gy-5">
                                        {director?.movies?.length > 0 ?
                                            director?.movies?.map(x => <DirectorDetailsCard key={x.id} {...x} />)
                                            : <Missing message="No movies yet." />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}