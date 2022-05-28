import {Cell} from "../models/Cell";
import {FC} from "react";

interface CellProps {
    cell: Cell,
}

const CellComponent: FC<CellProps> = ({ cell }) => {
    return (
        <div className={['cell', cell.color].join(' ')} key={cell.id}>

        </div>
    )
}

export default CellComponent;