import './expirationTimeScreen.style.scss'
import Pattern from '../Pattern/Pattern.jsx'
import EndActions from '../EndActions/EndActions.jsx'

function ExpirationTimeScreen({dispatch, points, current}) {

    const statistics = [
        {value: points, label: 'Correct'},
        {value: current, label: 'Reached'},
    ]

    return <div className='screen'>
        <Pattern/>
        <img src="/timeout-icon.svg" alt="timeout icon" className='timeout-icon'/>
        <h2 className='timeout-title'>Time Expired</h2>
        <p className='timeout-sub'>The clock has spoken its final word.</p>
        <div className='end-stats'>
            {statistics.map(({value, label}) => (
                <div className='stat-cell' key={`${label}-${value}`}>
                    <p className='stat-val'>{value}</p>
                    <p className='stat-lbl'>{label}</p>
                </div>
            ))}
        </div>
        <EndActions dispatch={dispatch} />
    </div>
}

export default ExpirationTimeScreen