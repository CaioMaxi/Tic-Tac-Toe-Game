export default function MoveCounter({ countX, countO }) {
    return (
        <>
            <div className="status">
                <p>X Move Count: {countX}</p>
                <p>O Move Count: {countO}</p>
            </div>
        </>
    )
}