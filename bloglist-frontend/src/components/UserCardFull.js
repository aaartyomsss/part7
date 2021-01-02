import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import userServices from '../services/userServices'
import { Spin } from 'antd'

const UserCardFull = () => {
    
    const id = useParams().id
    const [ user, setUser ] = useState(null)

    useEffect(() => {
        const fetch = async () => {
            const usersList = await userServices.getAll()
            if (usersList) {
                const userToDisplay = usersList.find(user => user.id === id)
                setUser(userToDisplay)
            }
        }
        fetch()
    }, [])

    console.log(user)

    if(user) {
        return (
            <div>
                <h1>{user.name}</h1>
                <h2>Blogs added</h2>
                <ul>
                    {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
                </ul>
            </div>
        )
    } else { 
        return <Spin/>
    }
}

export default UserCardFull