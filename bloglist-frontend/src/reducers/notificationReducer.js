
const notificationReducer = (state = { message: '', success: '' }, action) => {
    switch (action.type) {
    case 'NOTIFY':
        return {
            ...state,
            message: action.message,
            success: action.success
        }
    case 'HIDE':
        return {
            ...state,
            message: ''
        }
    default:
        return state
    }
}

let interval = null
export const setNotification = (message, success, time) => {
    return async dispatch => {
        dispatch({
            type: 'NOTIFY',
            message,
            success
        })
        clearTimeout(interval)
        interval = setTimeout(() => {
            dispatch({
                type: 'HIDE'
            })
        }, time)
    }
}

export default notificationReducer