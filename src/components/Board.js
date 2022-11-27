import React, { useEffect } from "react";
import Tile from "./Tile";
import Cell from "./Cell";
import { Board } from "../helper";
import useEvent from "../helper/hooks/useEvent";
import GameOverlay from "./GameOverlay";

const BoardView = () => {
  const [board, setBoard] = React.useState(new Board());
  let startX, startY;
  
  const handleKeyDown = (event) => {
    if (board.hasWon()) {
      return;
    }

    if (event.keyCode >= 37 && event.keyCode <= 40) {
      let direction = event.keyCode - 37;
      let boardClone = Object.assign(
        Object.create(Object.getPrototypeOf(board)),
        board
      );
      let newBoard = boardClone.move(direction);
      setBoard(newBoard);
    }
  };

  const handleTouchStart = (event) =>  {
    if (board.hasWon()) {
      return;
    }
    if (event.touches.length !== 1) {
      return;
    }
    startX = event.touches[0].screenX;
    startY = event.touches[0].screenY;
    event.isDefaultPrevented();
  }
  const handleTouchEnd = (event) => {
    if (board.hasWon()) {
      return;
    }
    if (event.changedTouches.length !== 1) {
      return;
    }
    var deltaX = event.changedTouches[0].screenX - startX;
    var deltaY = event.changedTouches[0].screenY - startY;
    var direction = -1;
    if (Math.abs(deltaX) > 3 * Math.abs(deltaY) && Math.abs(deltaX) > 30) {
      direction = deltaX > 0 ? 2 : 0;
    } else if (Math.abs(deltaY) > 3 * Math.abs(deltaX) && Math.abs(deltaY) > 30) {
      direction = deltaY > 0 ? 3 : 1;
    }
    if (direction !== -1) {
      let boardClone = Object.assign(
        Object.create(Object.getPrototypeOf(board)),
        board
      );
      let newBoard = boardClone.move(direction);
      setBoard(newBoard);
    }
  }

  useEvent('keydown', handleKeyDown)


  const cells = board.cells.map((row, rowIndex) => {
    return (
      <div key={rowIndex}>
        {row.map((col, columnIndex) => {
          return <Cell key={rowIndex * board.size + columnIndex}/>;
        })}
      </div>
    );
  });

  const tiles = board.tiles.filter((tile)=>tile.value !==0).map((tile,index)=>{
    return <Tile tile={tile} key={index}/>
  })

  const resetGame = () => {
    setBoard(new Board());
  };

  return (
    <div>
      <div className="details-box">
        <div className="resetButton" onClick={resetGame}>
          new game
        </div>
        <div className="score-box">
          <div className="score-header">SCORE</div>
          <div>{board.score}</div>
        </div>
      </div>
      <div className="board"  tabIndex="1" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        {cells}
        {tiles}
        <GameOverlay onRestart={resetGame} board={board} />
      </div>
    </div>
  );
};

export default BoardView;
