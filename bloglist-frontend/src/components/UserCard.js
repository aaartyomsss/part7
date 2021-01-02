import React from 'react'
import { Link } from 'react-router-dom'

const UserCard = ({ name, blogsCreated, id }) => {

    return(
        <tr>
            <td><Link to={`/users/${id}`}>{name}</Link></td>
            <td>{blogsCreated}</td>
        </tr>
    )

}

export default UserCard