import { Cell } from "./Cell";
import { Colors } from './Colors';

export class Board {

    cells: Cell[][] = [];   // многомерный массив ( массив с колонками (колонка - массив ячеек) )

    public initCells() {
        for (let i = 0; i < 8; i++) {
            const row: Cell[] = [];  // колонка - массив ячеек

            for (let j = 0; j < 8; j++) {
                if((i + j) % 2 === 0) {
                    row.push(new Cell(this, i, j, Colors.DARK, null));
                } else {
                    row.push(new Cell(this, i, j, Colors.LIGHT, null));
                }
            }

            this.cells.push(row);
        }
    }
}