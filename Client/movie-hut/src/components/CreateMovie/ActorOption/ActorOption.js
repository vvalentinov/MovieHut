export const ActorOption = (props) => {
    return (
        <div className='row m-2'>
            <div className='col'>
                <p>{props.name}</p>
            </div>
            <div className='col'>
                <button className="btn btn-success btn-sm"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem", backgroundColor: "#32CD32" }}>
                    Add
                </button>
            </div>
        </div>
    )
}