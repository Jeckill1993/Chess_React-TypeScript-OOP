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

    isEnemy(target: Cell): boolean {
        if(target.figure) {
            return this.figure?.color !== target.figure.color;
        }

        return false;
    }

    isEmpty(): boolean {
        return this.figure === null;
    }

    isEmptyVertical(target: Cell): boolean {
        if (this.x !== target.x) return false;

        const max = Math.max(this.y, target.y);
        const min = Math.min(this.y, target.y);

        for (let y = min + 1; y < max; y++) {
            if (!this.board.getCell(this.x, y).isEmpty()) {
                return false;
            }
        }

        return true;
    }

    isEmptyHorizontal(target: Cell): boolean {
        if (this.y !== target.y) return false;

        const max = Math.max(this.x, target.x);
        const min = Math.min(this.x, target.x);

        for (let x = min + 1; x < max; x++) {
            if (!this.board.getCell(x, this.y).isEmpty()) {
                return false;
            }
        }

        return true;
    }

    isEmptyDiagonal(target: Cell): boolean {
        const absX = Math.abs(target.x - this.x);
        const absY = Math.abs(target.y - this.y);
        if (absX !== absY) return false;

        const dy = this.y < target.y ? 1 : -1;
        const dx = this.x < target.x ? 1 : -1;

        for (let i = 1; i < absY; i++) {
            if(!this.board.getCell(this.x + i * dx, this.y + i * dy).isEmpty()) return false;
        }

        return true;
    }

    isEmptyKnightCells(target: Cell):boolean {
        const dx = Math.abs(this.x - target.x);
        const dy = Math.abs(this.y - target.y);

        if((dx == 1 && dy == 2) || (dy == 1 && dx == 2)) return true;

        return false;
    }

    setFigure(figure: Figure) {
        this.figure = figure;
        this.figure.cell = this;
    }

    moveFigure(target: Cell) {
        if (this.figure && this.figure?.canMove(target)) {
            this.figure.moveFigure(target);
            if (target.figure) {
                this.board.addLostFigure(target.figure);
            }
            target.setFigure(this.figure);
            target.figure = this.figure;
            this.figure = null;
        }
    }

}