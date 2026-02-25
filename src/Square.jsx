export default function Square({ value, onSquareClick, style }) {
    return (
        <button className="square" onClick={onSquareClick} style={style}>
            {value}
        </button>
    );
}