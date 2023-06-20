export default function Item(props) {
    const { id, date, distance } = props.steps;
    const { handleClickDelete, handleClickUpdate } = props;

    return (
        <ul className="item-row" data-id={id}>
            <li className="item-date">
                {date}
            </li>
            <li className="item-distance">
                {distance}
            </li>
            <li className="item-action">
                <button className="btn-update" onClick={() => handleClickUpdate(id)}>
                    &#9998;
                </button>
                <button className="btn-delete" onClick={() => handleClickDelete(id)}>
                    &#10006;
                </button>
            </li>
        </ul>
    )
}