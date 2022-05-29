import {Player} from "../models/Player";
import {FC, useEffect, useRef, useState} from "react";
import {Colors} from "../models/Colors";

interface TimerProps {
    currentPlayer: Player | null;
    restart: () =>void;
}

const Timer: FC<TimerProps> = ({ currentPlayer, restart }) => {

    const [blackTime, setBlackTime] = useState(300);
    const [whiteTime, setWhiteTime] = useState(300);
    const timer = useRef<null | ReturnType<typeof setInterval>>(null);

    useEffect(() => {
        startTimer();
    }, [currentPlayer]);

    function startTimer() {
        if(timer.current) {
            clearInterval(timer.current);
        }
        const callback = currentPlayer?.color === Colors.DARK ? decrementBlackTimer : decrementWhiteTimer;
        timer.current = setInterval(callback, 1000);
    }

    function handleRestart() {
        setBlackTime(300);
        setWhiteTime(300);
        restart();
    }

    function decrementBlackTimer() {
        setBlackTime((prev => prev - 1));
    }

    function decrementWhiteTimer() {
        setWhiteTime((prev => prev - 1));
    }

    return (
        <div>
            <button onClick={ () => {handleRestart()} }>Restart game</button>
            <div>
                <h4>Black - {blackTime}</h4>
                <h4>White - {whiteTime}</h4>
            </div>
        </div>
    )
}

export default Timer;