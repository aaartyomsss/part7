import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'antd'



const Blog = ({ blog }) => {

    return (
        <Card title={`${blog.title}`}>
            <p>Created by {blog.author}</p>
            <Link to={`/blogs/${blog.id}`}><p>Expand</p></Link>
        </Card>
    )
}

export default Blog