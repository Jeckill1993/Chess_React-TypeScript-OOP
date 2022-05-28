import {Colors} from "./Colors";
import {Board} from "./Board";
import {Figure} from "./figures/Figure";

export class Cell {
    readonly x: number;
    readonly y: number;
    readonly color: Colors;
    figure: Figure | null;
    board: Board;
    available: boolean;  //can figure move to the cell
    id: number  // for react's keys

    constructor(board: Board, y: number, x: number, color: Colors, figure: Figure | null) {
        this.y = y;
        this.x = x;
        this.color = color;
        this.figure = figure;
        this.board = board;
        this.available = false;
        this.id = Math.random();
    }
}