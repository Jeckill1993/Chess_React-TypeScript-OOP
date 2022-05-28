import {Cell} from "../models/Cell";
import {FC} from "react";

interface CellProps {
    cell: Cell,
}

const CellComponent: FC<CellProps> = ({ cell }) => {
    return (
        <div className={['cell', cell.color].join(' ')} key={cell.id}>
            { cell.figure?.logo && <img src={cell.figure.logo} alt="figure" key={cell.figure.id}/> }
        </div>
    )
}

export default CellComponent;