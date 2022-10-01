import React, { useState, useEffect, useRef } from 'react'

const Countdown = () => {

    const DEBOUNCE_TIME = 1000;
    const [counter, setCounter] = useState(0);
    const [timerActions, setTimerActions] = useState({
        start: false,
        pause: false
    });

    useEffect(() => {
        const interval = setInterval(() => {
            if(counter === 0) {
                setTimerActions({ start: false, pause: false })
                return;
            }

            countdown(timerActions)
        }, DEBOUNCE_TIME);

        return () => clearInterval(interval)
    }, [timerActions])

    const countdown = (timerActions) => {
        if (timerActions.start && !timerActions.pause) {
            setCounter((prevState) => prevState > 0 ? prevState - 1 : 0);
        }
    }

    const startCountdown = () => {
        setTimerActions({ ...timerActions, start: true });
    }

    const pauseCountdown = () => {
        setTimerActions({ ...timerActions, pause: true });
    }

    const resumeCountdown = () => {
        setTimerActions({ ...timerActions, pause: false });
    }

    const resetCounter = () => {
        var count = document.getElementById("counter").value;
        setCounter(count);
        setTimerActions({ start: true, pause: false });
    }

    return (
        <div className='countdown-container'>
            <div className='counter-timer'>
                <h1>{counter}</h1>
            </div>
            <div className='counter-field-wrapper'>
                <input type='number' id='counter' onChange={e => setCounter(e.target.value)} />
            </div>
            <div className='counter-actions'>
                <button className='start-timer' onClick={startCountdown}>Start</button>
                {
                    timerActions.pause
                        ? <button className='resume-timer' onClick={resumeCountdown}>Resume</button>
                        : <button className='pause-timer' onClick={pauseCountdown}>Pause</button>
                }
                <button className='reset-timer' onClick={resetCounter}>Reset</button>
            </div>
        </div>
    )
}

export default Countdown