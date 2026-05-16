import './counterAndTimer.style.scss'
import { useState, useEffect } from 'react'

function CounterAndTimer({countQuestions, dispatch, onTick}) {

    const [seconds, setSeconds] = useState(60)
    const totalTime = 60

    useEffect(()=> {        
        if(seconds === 0) {
            dispatch({type: 'CURRENT_QUESTION', payload: countQuestions})
            dispatch({type: 'CHANGE_SCREEN', payload: 'expired'})
        }
            
        if(seconds <= 0) return

        onTick?.(seconds)

        const interval = setInterval(() => {
            setSeconds(t => t - 1)
        },1000)

        return () => clearInterval(interval)

    },[seconds])

    const percentage = ((totalTime - seconds) / totalTime) * 100

    return <div className="quiz-header">
        <div className='container-counter-timer-label'>
            <div className="q-counter">0{countQuestions + 1}<span>/5</span></div>
            <div className='container-timer-label'>
                <p className='timer-label'>Seconds</p>
                <div className='round'>
                    <div className='circle'
                         style={{background: `conic-gradient(#5A5650 ${percentage * 3.6}deg, #C9A96E 0deg)`}}>
                        <div className='round-text'>{seconds}</div>
                    </div>
                </div>
            </div>
        </div>
        <div className="progress-bar">
            <div className="progress-fill" style={{width: `${countQuestions * 2 }0%`}}></div>
            <div className="progress-dot" style={{left: `${countQuestions * 2 }0%`}}></div>
        </div>
    </div>
}

export default CounterAndTimer