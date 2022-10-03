export const Alert = (props) => {
    return (
        <div
            className="alert alert-danger d-flex align-items-center"
            role="alert"
        >
            <i className="fa-solid fa-triangle-exclamation me-2" />
            <div className="text-center">
                {props.message}
            </div>
        </div>
    )
}