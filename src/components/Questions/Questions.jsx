import './questions.style.scss'
import { useState, useEffect, useRef } from 'react'
import { ANSWER_DELAY_MS, LETTER_LABELS } from '../../constants.js'

function getAnswerStates(length, selectedIndex, correctIndex) {
    return Array.from({ length }, (_, i) => {
        if (i === selectedIndex && i === correctIndex) return 'correct'
        if (i === selectedIndex) return 'wrong'
        if (i === correctIndex) return 'correct'
        return 'disabled'
    })
}

function Questions({data, countQuestions, setCountQuestions, dispatch, questionsList, seconds, setShowPoints}) {

    const answerCount = data?.answer?.length ?? 0
    const [answers, setAnswers] = useState(() => new Array(answerCount).fill(''))
    const [isLocked, setIsLocked] = useState(false)
    const timerRef = useRef(null)

    useEffect(() => {
        setAnswers(new Array(answerCount).fill(''))
        setIsLocked(false)
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current)
        }
    }, [countQuestions, answerCount])

    function handleAnswerClick(clickedIndex) {
        if (isLocked || !data) return

        const correctIndex = data.answer.findIndex(e => e === data.correctAnswer)

        setAnswers(getAnswerStates(answerCount, clickedIndex, correctIndex))
        setIsLocked(true)

        if (clickedIndex === correctIndex) {
            dispatch({type: 'ADD_POINT'})
            setShowPoints(true)
        }

        timerRef.current = setTimeout(() => {
            const isLastQuestion = countQuestions >= questionsList.length - 1
            if (isLastQuestion) {
                dispatch({ type: 'CHANGE_SCREEN', payload: 'result' })
                dispatch({type: 'GET_TIME', payload: seconds})
                return
            }
            setCountQuestions(prev => prev + 1)
            setShowPoints(false)
        }, ANSWER_DELAY_MS)
    }

    return <div>
        <p className="question-text">{data?.questions}</p>
        <div className="answers">
            {data?.answer.length && data.answer.map((elem, index) => (
                <button className={`answer-btn ${answers[index]}`} key={index} onClick={()=> handleAnswerClick(index)}>
                    <span className="answer-idx">{LETTER_LABELS[index]}</span>{elem}
                </button>
            ))}
        </div>
    </div>
}

export default Questions