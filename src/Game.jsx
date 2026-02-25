import { useState } from "react";
import Board from "./Board";
import MoveCounter from "./MoveCounter";

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const [countO, setCountO] = useState(0);
    const [countX, setCountX] = useState(0);

    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);

        // This increases the counter depending on who
        // is currently playing, X or O.
        if (currentMove % 2 == 0) {
            setCountX((prev) => {
                return prev + 1;
            })
        } else {
            setCountO((prev) => {
                return prev + 1;
            })
        }
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
        
        // This handles the counters on time travel.
        // Math.floor rounds down to the next int, and
        // as X is always the first, when the move is 
        // odd, it just needs to add an extra X move.
        if (nextMove % 2 == 0) {
            setCountX(nextMove / 2);
            setCountO(nextMove / 2);
        } else {
            setCountX(Math.floor(nextMove / 2) + 1);
            setCountO(Math.floor(nextMove / 2));
        }
    }

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = 'Go to move #' + move;
        } else {
            description = 'Go to game start';
        }
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>

        );
    });

    return (
        <>
            <div className="game">
                <div className="game-board">
                    <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
                    <MoveCounter countX={countX} countO={countO} />
                </div>
                <div className="game-info">
                    <ol>{moves}</ol>
                </div>
            </div >
        </>

    );
}