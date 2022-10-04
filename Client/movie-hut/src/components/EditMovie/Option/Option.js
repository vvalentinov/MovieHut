export const Option = (props) => {
    return (
        <div className="form-check form-check-inline">
            <input
                className="form-check-input"
                type="checkbox"
                id={"inlineCheckbox" + props.element}
                name={props.element}
                defaultValue={props.element}
                checked={props.value}
                onChange={props.handler}
            />
            <label className="form-check-label" htmlFor={"inlineCheckbox" + props.element}>
                {props.name}
            </label>
        </div>
    )
}