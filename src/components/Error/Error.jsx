import './error.style.scss'

function Error({message}) {
    return <div className='screen'>
        <img
            src="/file-error-icon.svg"
            alt="file error icon"
            className="error-icon"
        />
        <p className='error-message'>{message}</p>
    </div>
}

export default Error