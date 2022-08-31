import './card.scss'
const Card = (props) => {
    return (
        <div className={`card`} id={props.cardId}>
            {props.children}
        </div>
    )
}

export default Card;