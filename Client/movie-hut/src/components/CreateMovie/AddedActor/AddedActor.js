export const AddedActor = (props) => {
    return (
        <span className="badge rounded-pill mx-1" style={{backgroundColor: '#32CD32'}}>{props.name}<i onClick={() => props.removeActor(props.id)} className="fa-solid fa-xmark mx-1"></i></span>
    )
}