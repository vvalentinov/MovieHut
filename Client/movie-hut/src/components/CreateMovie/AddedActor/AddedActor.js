export const AddedActor = (props) => {
    return (
        <span className="badge rounded-pill bg-primary mx-1">{props.name}<i onClick={() => props.removeActor(props.id)} className="fa-solid fa-xmark mx-1"></i></span>
    )
}