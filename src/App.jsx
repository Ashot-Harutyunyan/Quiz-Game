import './app.style.scss'
import { useReducer } from 'react'
import { useQuestions } from './components/Hooks/useQuestions'
import StartScreen from './components/StartScreen/StartScreen.jsx'
import QuizScreen from './components/QuizScreen/QuizScreen.jsx'
import ResultScreen from './components/ResultScreen/ResultScreen.jsx'
import ExpirationTimeScreen from './components/ExpirationTimeScreen/ExpirationTimeScreen.jsx'
import Loading from './components/Loading/Loading.jsx'
import Error from './components/Error/Error.jsx'

function reducer(state, {type, payload}) {
  switch(type) {
    case 'CHANGE_SCREEN':
      return {...state, screen: payload}
    case 'ADD_POINT':
      return {...state, points: state.points + 1}
    case 'RESET_POINT':
      return {...state, points: 0}
    case 'GET_TIME':
      return {...state, time: payload}
    case 'CURRENT_QUESTION':
      return {...state, current: payload}
    default:
      return state
  }
}

function App() {

  const [state, dispatch] = useReducer(reducer, {screen: "start", points: 0, time: 0, current: 0})
  const { questions, loading, error } = useQuestions(state.screen === 'quiz')

  return (<>
      {state.screen === "start" && <StartScreen dispatch={dispatch} />}
      {state.screen === "quiz" && (
        loading ? <Loading />
        : error ? <Error message={error} />
        : <QuizScreen 
            dispatch={dispatch}
            questions={questions}
          />
      )}
      {state.screen === 'result' &&
          <ResultScreen
              dispatch={dispatch}
              points={state.points}
              time={state.time}
              length={questions.length}
          />
      }
      {state.screen === 'expired' &&
          <ExpirationTimeScreen
              dispatch={dispatch}
              points={state.points}
              current={state.current}
          />
      }
  </>)
}

export default App