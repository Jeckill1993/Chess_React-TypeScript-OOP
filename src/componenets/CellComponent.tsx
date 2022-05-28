import {Cell} from "../models/Cell";
import {FC} from "react";

interface CellProps {
    cell: Cell,
    selected: boolean
    click: (cell: Cell) => void
}

const CellComponent: FC<CellProps> = ({ cell, selected, click }) => {
    return (
        <div className={['cell', cell.color, selected ? 'selected' : '',
            cell.available && cell.figure && 'availableFigure'].join(' ')}
             key={cell.id}
             onClick={ () => {click(cell);} }>
            { cell.available && !cell.figure && <div className={"available"}></div> }
            { cell.figure?.logo && <img src={cell.figure.logo} alt="figure" key={cell.figure.id}/> }
        </div>
    )
}

export default CellComponent;