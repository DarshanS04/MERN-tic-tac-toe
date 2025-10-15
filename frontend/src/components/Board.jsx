import React from "react";

export default function Board({ board, onCellClick, disabled }) {
  const getCellClass = (value) => {
    if (value === "X") return "cell x-cell";
    if (value === "O") return "cell o-cell";
    return "cell";
  };

  return (
    <div className="board">
      {board.map((cell, idx) => (
        <button
          key={idx}
          className={getCellClass(cell)}
          onClick={() => onCellClick(idx)}
          disabled={disabled || !!cell}
        >
          {cell}
        </button>
      ))}
    </div>
  );
}
