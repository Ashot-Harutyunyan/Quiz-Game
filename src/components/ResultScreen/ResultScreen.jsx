import './resultScreen.style.scss'
import Pattern from "../Pattern/Pattern.jsx"
import EndActions from '../EndActions/EndActions.jsx'
import { VERDICT } from '../../constants.js'

function ResultScreen({dispatch, points, time, length}) {

    const statistics = [
        {value: points, label: 'Correct'},
        {value: length - points, label: 'Incorrect'},
        {value: points > 0 ? `${points * 2}0%` : '0%', label: 'Accuracy'},
        {value: 60 - time, label: 'Time Used'}
    ]

    return <div className='screen'>
        <Pattern/>
        <span className='end-eyebrow'>Results</span>
        <h2 className='end-score'>{length}<span>/{points}</span></h2>
        <p className='end-verdict'>{VERDICT[points > 0 ? points - 1 : 0].verdict}</p>
        <p className='end-detail'>{VERDICT[points > 0 ? points - 1 : 0].description}</p>
        <div className="end-stats">
            {statistics.map(({value, label}) => (
                <div className='stat-cell' key={`${label}-${value}`}>
                    <p className='stat-val'>{value}</p>
                    <p className='stat-lbl'>{label}</p>
                </div>
            ))}
        </div>
        <EndActions dispatch={dispatch}/>
    </div>
}

export default ResultScreen