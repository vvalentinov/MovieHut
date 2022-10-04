export const AddedCelebrity = (props) => {
    return (
        <span className="badge rounded-pill mx-1" style={{backgroundColor: '#32CD32'}}>{props.name}<i onClick={() => props.removeCelebrity(props.id)} className="fa-solid fa-xmark mx-1"></i></span>
    )
}