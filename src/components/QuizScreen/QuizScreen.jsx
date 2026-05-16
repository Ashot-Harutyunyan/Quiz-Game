import './quizScreen.style.scss'
import { useState } from 'react'
import CounterAndTimer from '../CounterAndTimer/CounterAndTimer.jsx'
import Questions from '../Questions/Questions.jsx'

function QuizScreen({dispatch, questions}) {

    const [countQuestions, setCountQuestions] = useState(0)
    const [seconds, setSeconds] = useState(60)
    const [showPoints, setShowPoints] = useState(false)

    return <div className='screen'>
        <div className={`points-toast ${showPoints ? 'show' : ''}`}>+1</div>
        <CounterAndTimer
            countQuestions={countQuestions}
            dispatch={dispatch}
            questionsLength={questions.length}
            onTick={setSeconds}
        />
        <Questions
            data={questions[countQuestions]}
            countQuestions={countQuestions}
            setCountQuestions={setCountQuestions}
            dispatch={dispatch}
            questionsList={questions}
            seconds={seconds}
            setShowPoints={setShowPoints}
        />
    </div>
}

export default QuizScreen