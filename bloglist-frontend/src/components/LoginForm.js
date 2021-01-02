import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import loginService from '../services/login'
import { login } from '../reducers/userReducer'
import { Form, Input, Button } from 'antd'
import '../App.css'

const LoginForm = () => {

    const layout = {
        labelCol: {
            span: 2,
        },
        wrapperCol: {
            span: 20,
        },
    }
    const tailLayout = {
        wrapperCol: {
            offset: 2,
            span: 20,
        },
    }

    const dispatch = useDispatch()

    const handleLogin = async (values) => {
        const username = values.username
        const password = values.password
        console.log('Check functionality', username, password)

        try {
            const user = await loginService.login({
                username, password
            })

            // Saving login to the browser
            window.localStorage.setItem(
                'loggedInUser', JSON.stringify(user)
            )

            const loginString = `${user.username} has loged in!`
            dispatch(setNotification(loginString, true, 1500))
            dispatch(login(user))
        } catch (e) {
            dispatch(setNotification('Wrong username or password', false, 1500))
            console.log(e.message)
        }
    }

    return (
        <Form onFinish={handleLogin} {...layout} className='login-form'>
            <Form.Item
                name='username'
                label='Username'
                rules={[
                    {
                        required: true
                    }
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name='password'
                label='Password'
                rules={[{
                    required: true
                }]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button htmlType="submit" type='primary'>Login</Button>
            </Form.Item>
        </Form>
    )
}

export default LoginForm