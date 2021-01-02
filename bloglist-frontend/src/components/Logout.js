import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/userReducer'
import { Card, Button } from 'antd'
import '../App.css'

const Logout = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const handleLogout = () => {
        window.localStorage.clear()
        dispatch(logout())
    }

    return (
        <Card title={`${user.username} welcome!`} className='logout-card'>
            <Button onClick={handleLogout} type='default'>Logout</Button>
        </Card>
    )
}

export default Logout