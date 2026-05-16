import './startScreen.style.scss'
import Pattern from '../Pattern/Pattern.jsx'
import { QUIZ_GAME_CONTENT, QUIZ_GAME_META } from '../../constants.js'

function StartScreen({dispatch}) {
    return <div className='screen'>
        <Pattern />
        {QUIZ_GAME_CONTENT.map((elem, index) => {
            return elem.tegName === 'p'
                ? <p key={index} className={`quiz-game-${elem.className}`}>{elem.text}</p>
                : <h1 key={index} className={`quiz-game-${elem.className}`}>
                    {elem.text.split(' ').slice(0, 2).join(' ')} <br/>
                    <em>{elem.text.split(' ').slice(-1).join(' ')}</em>
                </h1>
        })}
        <div className="quiz-game-meta">
            {QUIZ_GAME_META.map((item, index) => (
                <div className="meta-item" key={index}>
                    <div className="meta-num">{item.number}</div>
                    <div className="meta-label">{item.label}</div>
                </div>
            ))}
        </div>
        <button className="quiz-game-btn-start"
                onClick={() => {
                    dispatch({type: 'CHANGE_SCREEN', payload: 'quiz'})
                    dispatch({type: 'RESET_POINT'})
                }}
        >Begin the Challenge
        </button>
    </div>
}

export default StartScreen