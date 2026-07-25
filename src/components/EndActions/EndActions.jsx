import './endActions.style.scss'

function EndActions({dispatch}) {
    return <div className="end-actions">
        <button className="btn-secondary"
                onClick={() => dispatch({type: 'CHANGE_SCREEN', payload: 'start'})}
        >Return Home</button>
        <button className="btn-primary"
                onClick={()=> {
                    dispatch({type: 'CHANGE_SCREEN', payload: 'quiz'})
                    dispatch({type: 'RESET_POINT'})
                }}>
            Play Again</button>
    </div>
}

export default EndActions