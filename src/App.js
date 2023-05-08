import { useEffect, useState } from 'react';
import './App.css';
import { Square } from './Components/Square';
import { Patterns } from './Patterns';

function App() {

  const [board, setBoard] = useState(['','','','','','','','','']);
  const [player, setPlayer] = useState('O');
  const [result, setResult] = useState({
    winner: "none",
    state: "none"
  });

  useEffect(() => {
    checkWin();
    checkIfTie();
    if(player === "X"){
      setPlayer("O");
    } else{
      setPlayer("X")
    }
  }, [board]);

  useEffect(() => {
    if(result.state !== "none"){
      alert(`Game Finished! Winning Player: ${result.winner}`);
      restartGame()
    }
    
  }, [result]);

  const chooseSquare = (square) => {
    setBoard(board.map((value, index) => {
      if(index === square && value === ""){
        return player;
      }
      return value;
    }));

  }

  const checkWin = () => {
    Patterns.forEach(currentPattern => {
      const firstPlayer = board[currentPattern[0]];
      let foundWinningPattern = true;
      if(firstPlayer === "") return;
      currentPattern.forEach(index => {
        if(board[index] !== firstPlayer){
          foundWinningPattern = false;
        }
      });

      if(foundWinningPattern){
        setResult({winner: player, state: "Won"})
      }
    });
  }

  const checkIfTie = () => {
    let filled = true;
    board.forEach(square => {
      if(square === ""){
        filled = false;
      }
    });

    if(filled){
      setResult({winner: "No One", state: "Tie"});
    }
  }

  const restartGame = () => {
    setBoard(['','','','','','','','','']);
    setPlayer("O");
  }
  return (
    <div className="App">
      <div className="board">
        <div className="row">
          <Square className="square" value={board[0]} chooseSquare={() => chooseSquare(0)} />
          <Square className="square" value={board[1]} chooseSquare={() => chooseSquare(1)} />
          <Square className="square" value={board[2]} chooseSquare={() => chooseSquare(2)} />
        </div>
        <div className="row">
          <Square className="square" value={board[3]} chooseSquare={() => chooseSquare(3)} />
          <Square className="square" value={board[4]} chooseSquare={() => chooseSquare(4)} />
          <Square className="square" value={board[5]} chooseSquare={() => chooseSquare(5)} />
        </div>
        <div className="row">
          <Square className="square" value={board[6]} chooseSquare={() => chooseSquare(6)} />
          <Square className="square" value={board[7]} chooseSquare={() => chooseSquare(7)} />
          <Square className="square" value={board[8]} chooseSquare={() => chooseSquare(8)} />
        </div>
      </div>
    </div>
  );
}

export default App;
