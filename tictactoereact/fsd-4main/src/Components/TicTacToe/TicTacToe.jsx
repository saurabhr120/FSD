import React, { useState } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assests/circle.png';
import cross_icon from '../Assests/cross.png';

const TicTacToe = () => {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);
  const [lock, setLock] = useState(false); // Initialize lock state
  const [winner, setWinner] = useState(null); // Initialize winner state

  const toggle = (num) => {
    if (data[num] !== "" || lock) {
      return;
    }

    const newData = [...data];
    if (count % 2 === 0) {
      newData[num] = 'x';
    } else {
      newData[num] = 'o';
    }

    setData(newData);
    setCount(count + 1);

    checkWin(newData);
  };

  const resetGame = () => {
    setData(["", "", "", "", "", "", "", "", ""]);
    setCount(0);
    setLock(false);
    setWinner(null);
  };

  const checkWin = (currentData) => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (currentData[a] && currentData[a] === currentData[b] && currentData[a] === currentData[c]) {
        setWinner(currentData[a]);
        setLock(true);
        return;
      }
    }

    if (count === 8) {
      // All squares are filled, and no one has won (it's a draw)
      setWinner('draw');
      setLock(true);
    }
  };

  const renderSquare = (index) => {
    return (
      <div className={`boxes`} onMouseDown={() => toggle(index)}>
        {data[index] === 'x' && <img src={cross_icon} alt="cross" />}
        {data[index] === 'o' && <img src={circle_icon} alt="circle" />}
      </div>
    );
  };

  return (
    <div className='container'>
      <h1 className="title">tic - tac - toe</h1>
      <div className="board">
        <div className="row1">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="row2">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="row3">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>

      {winner && (
        <div className="status">
          {winner === 'draw' ? "It's a draw!" : `Player ${winner} wins!`}
        </div>
      )}

      <button className="reset" onClick={resetGame}>Reset</button>
    </div>
  );
};

export default TicTacToe;