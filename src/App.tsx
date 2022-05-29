import React, {useEffect, useState} from 'react';

import BoardComponent from "./componenets/BoardComponent";

import './App.css';
import {Board} from "./models/Board";
import {Player} from "./models/Player";
import {Colors} from "./models/Colors";

function App() {

    const [board, setBoard] = useState(new Board());
    const [darkPlayer, setDarkPlayer] = useState(new Player(Colors.DARK));
    const [lightPlayer, setLightPlayer] = useState(new Player(Colors.LIGHT));
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

    useEffect(() => {
        restart();
    }, []);

    function restart() {
        const newBoard = new Board();
        newBoard.initCells();
        newBoard.addFigures();
        setBoard(newBoard);
        setCurrentPlayer(lightPlayer);
    }

    function swapPlayer() {
        setCurrentPlayer(currentPlayer?.color === Colors.LIGHT ? darkPlayer : lightPlayer);
    }

  return (
    <div className={"app"}>
      <BoardComponent board={board} setBoard={setBoard}
      currentPlayer={currentPlayer} swapPlayer={swapPlayer} restart={restart}/>
    </div>
  );
}

export default App;
