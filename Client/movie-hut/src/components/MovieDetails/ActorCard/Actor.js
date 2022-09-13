export const ActorCard = (props) => {
    return (
        <div className='col-auto'>
            <div className='row'>
                <div className='col-3'>
                    <img className="img-fluid rounded-circle" src={props.imageUrl} alt="Cinque Terre" />
                </div>
                <div className='col mt-3'>
                    <h5>{props.name}</h5>
                </div>
            </div>
        </div>
    )
}