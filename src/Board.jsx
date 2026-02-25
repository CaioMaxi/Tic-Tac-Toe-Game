import Square from "./Square";

export default function Board({ xIsNext, squares, onPlay }) {
    function handleClick(i) {
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }
        onPlay(nextSquares);
    }

    // This checks if calculateWinne didn't return null so it can
    // pass the winner array from the function to the variable winnerArr
    let winner;
    let winnerArr = [];
    if (calculateWinner(squares) !== null) {
        winner = calculateWinner(squares)[0];
        winnerArr = calculateWinner(squares)[1];
    } else {
        winner = calculateWinner(squares);
    }

    // To be able to show the final result was a Draw, it checks
    // if winner is null and squares don't include any null item.
    let status;
    if (winner) {
        status = "Winner: " + winner[0];
    } else if (winner === null && !squares.includes(null)) {
        status = "Game Result: Draw";
    } else {
        status = "Next player: " + (xIsNext ? 'X' : 'O');
    }

    const myStyle = { backgroundColor: "yellow" };

    // Adapted the squares to receive a new style prop so it can
    // compare the Square value with the winnerArr and highlight
    // the correct squares on the board.
    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} style={winnerArr.includes(0) ? myStyle : null} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} style={winnerArr.includes(1) ? myStyle : null} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} style={winnerArr.includes(2) ? myStyle : null} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} style={winnerArr.includes(3) ? myStyle : null} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} style={winnerArr.includes(4) ? myStyle : null} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} style={winnerArr.includes(5) ? myStyle : null} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} style={winnerArr.includes(6) ? myStyle : null} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} style={winnerArr.includes(7) ? myStyle : null} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} style={winnerArr.includes(8) ? myStyle : null} />
            </div>
        </>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return [squares[a], lines[i]];
        }
    }
    return null;
}