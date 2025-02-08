import React, { useState, useEffect } from "react";

const App = () => {
    type Player = "X" | "O" | null;
    const createBoard = () => Array.from({ length: 3 }, () => Array(3).fill(null));

    const [board, setBoard] = useState(createBoard);
    const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
    const [winner, setWinner] = useState<Player | "Draw" | null>(null);
    const [score, setScore] = useState<{ X: number; O: number }>({ X: 0, O: 0 });

    const checkWinner = (board: Player[][]): Player | "Draw" | null => {
        for (let i = 0; i < 3; i++) {
            if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) return board[i][0];
            if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) return board[0][i];
        }
        if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) return board[0][0];
        if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) return board[0][2];
        if (board.flat().every((cell) => cell)) return "Draw";
        return null;
    };

    const handleClick = (row: number, col: number) => {
        if (board[row][col] || winner) return;
        setBoard((prevBoard) =>
            prevBoard.map((r, i) => r.map((cell, j) => (i === row && j === col ? currentPlayer : cell)))
        );
        setCurrentPlayer((prev) => (prev === "X" ? "O" : "X"));
    };

    useEffect(() => {
        const gameResult = checkWinner(board);
        if (gameResult) {
            setWinner(gameResult);
            if (gameResult !== "Draw") {
                setScore((prev) => ({ ...prev, [gameResult]: prev[gameResult] + 1 }));
            }
        }
    }, [board]);

    const restartGame = () => {
        setBoard(createBoard());
        setWinner(null);
        setCurrentPlayer("X");
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Tic Tac Toe</h1>
            <div className="grid grid-cols-3 gap-2">
                {board.map((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                        <button
                            key={`${rowIndex}-${colIndex}`}
                            className="w-20 h-20 text-2xl font-bold flex items-center justify-center border border-gray-400 bg-white hover:bg-gray-200"
                            onClick={() => handleClick(rowIndex, colIndex)}
                        >
                            {cell}
                        </button>
                    ))
                )}
            </div>
            {winner && (
                <h2 className="mt-4 text-xl font-semibold">
                    {winner === "Draw" ? "It's a draw!" : `Winner: ${winner}`}
                </h2>
            )}
            <button
                onClick={restartGame}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
            >
                Restart Game
            </button>
            <h3 className="mt-4 text-lg font-medium">Score:</h3>
            <p className="text-lg">
                X: {score.X} | O: {score.O}
            </p>
        </div>
    );
};

export default App;
