import React from 'react'
import { useSelector } from 'react-redux'

const SuccessMessage = () => {

    const notification = useSelector(state => state.notification)

    const style = {
        border: '3px solid black',
        borderRadius: 5,
        fontSize: 24,
        color: notification.success ? 'green' : 'red',
        padding: 10,
        margin: 10,
        display: notification.message === '' ? 'none' : ''

    }

    return (
        <div style={style}>
            {notification.message}
        </div>
    )
}

export default SuccessMessage