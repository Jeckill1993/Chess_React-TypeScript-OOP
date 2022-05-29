import {Figure} from "../models/figures/Figure";
import {FC} from "react";

interface LostFiguresProps {
    title: string,
    figures: Figure[],
}

const LostFigures: FC<LostFiguresProps> = ({ title, figures }) => {

    return (
        <div className={"lost"}>
            <h3>{title}</h3>
            <div className={"lost-figures"}>
                {figures.map((figure) =>
                    <div key={figure.id}>
                        {figure.name}
                        {figure.logo && <img className={"lost__icon"} src={figure.logo} alt={figure.name}/>}
                    </div>
                )}
            </div>
        </div>
    )

}

export default LostFigures;