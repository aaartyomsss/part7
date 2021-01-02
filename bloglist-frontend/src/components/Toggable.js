import React, { useState } from 'react'
import { Button } from 'antd'
import '../App.css'

const Toggable = (props) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div className='toggable'>
            <div style={hideWhenVisible}>
                <Button 
                    onClick={toggleVisibility} 
                    id={props.id} 
                    type='primary'
                    className='toggable-btn'
                >{props.buttonLabel}</Button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <Button 
                    type='primary' 
                    onClick={toggleVisibility} 
                    className='toggable-btn'
                >Cancel</Button>
            </div>
        </div>
    )
}

export default Toggable