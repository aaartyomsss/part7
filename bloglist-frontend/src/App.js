import React, { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggable from './components/Toggable'
import { useDispatch, useSelector } from 'react-redux'
import { initialState } from './reducers/blogReducer'
import BlogList from './components/BlogList'
import { login } from './reducers/userReducer'
import UserList from './components/UserList'
import { Link, Switch, Route } from 'react-router-dom'
import UserCardFull from './components/UserCardFull'
import BlogExtended from './components/BlogExtended'
import { Divider, PageHeader } from 'antd'
import "antd/dist/antd.css"
import './App.css'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initialState())
    }, [dispatch])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedInUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(login(user))
        }
    }, [dispatch])

    return (
        <div>
            <Notification/>
            <PageHeader 
                className='page-header'
                title='Blog App'
                subTitle='Created for full stack web-dev 2020 course'
                extra={[
                    <Link to='/'>Blogs</Link>,
                    <Link to='/users'>Users</Link>
                ]}
            />
            {user === null ?
                <LoginForm /> :
                <Logout />
            }

            {user === null ?
                null :
                <div>
                    <h2 className='heading'>Create new blog</h2>
                    <Divider/>
                    <Toggable buttonLabel='Add new blog' id='addNewBlog'>
                        <BlogForm setBlogs={setBlogs} blogs={blogs} />
                    </Toggable>
                </div>
            }

            <div id='blogs'>
                <Switch>
                    <Route path='/blogs/:id'>
                        <BlogExtended />
                    </Route>

                    <Route path='/users/:id'>
                        <UserCardFull />
                    </Route>

                    <Route path='/users'>
                        <UserList />
                    </Route>

                    <Route path='/'>
                        <BlogList/>
                    </Route>
                    
                </Switch>
            </div>
        </div>
    )
}

export default App
