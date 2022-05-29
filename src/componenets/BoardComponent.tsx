import {Board} from "../models/Board";
import {FC, useEffect, useState} from "react";
import React from "react";
import CellComponent from "./CellComponent";
import {Cell} from "../models/Cell";
import {Player} from "../models/Player";
import LostFigures from "./LostFigures";
import Timer from "./Timer";

interface BoardProps {
    board: Board,
    setBoard: (board: Board) => void,
    currentPlayer: Player | null,
    swapPlayer: () => void,
    restart: () => void,
}

const BoardComponent: FC<BoardProps> = ({ board, setBoard, currentPlayer, swapPlayer, restart }) => {

    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    useEffect(() => {
        highLightCells();
    }, [selectedCell]);

    function click(cell: Cell) {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell);
            setSelectedCell(null);
            swapPlayer();
        } else {
            if (cell.figure?.color === currentPlayer?.color) {
                setSelectedCell(cell);
            }
        }
    }

    function highLightCells() {
        board.highLightCells(selectedCell);
        updateBoard();
    }

    function updateBoard() {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    }

    return (
        <div>
            <div className={"board-title__row"}>
                <h3 className={"board-title"}>Current player - {currentPlayer?.name}</h3>
                <Timer currentPlayer={currentPlayer} restart={restart} />
            </div>

            <div className={"flex-container"}>
                <div className={"board-container"}>
                    <div className={"board"}>
                        { board.cells.map((row, index) =>
                            <React.Fragment key={index}>
                                {row.map((cell) =>
                                    <CellComponent
                                        cell={cell}
                                        key={cell.id}
                                        selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                                        click={click}
                                    />
                                )}
                            </React.Fragment>
                        ) }
                    </div>
                </div>
                <div className={"lost-container"}>
                    <LostFigures title={'Dark Figures'} figures={board.lostDarkFigures} />
                    <LostFigures title={'Light Figures'} figures={board.lostLightFigures} />
                </div>

            </div>
        </div>
    )
}

export default BoardComponent;