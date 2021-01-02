import React, { useEffect, useState } from 'react'
import userServices from '../services/userServices'
import UserCard from './UserCard'

const UserList = () => {

    const [usersList, setUsers] = useState([])

    useEffect(() => {
        const fetch = async () => {
            const users = await userServices.getAll()
            setUsers(users)
        }
        fetch()
    }, [])

    return (
        <table>
            <tbody>
                <tr>
                    <th>Name</th>
                    <th>Blogs created</th>
                </tr>
                {usersList.map(user => <UserCard id={user.id} key={user.id} name={user.name} blogsCreated={user.blogs.length}/>)}
            </tbody>
        </table>
    )
}

export default UserList