import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'
import '../App.css'
import { Divider } from 'antd'

const BlogList = () => {
    const blogs = useSelector(state => state.blogs)
    return (
        <div>
            <h2 className='heading'>Blogs</h2>
            <Divider/>
            {blogs.map((blog, i) => <Blog i={i} key={blog.id} blog={blog}/>)}
        </div>        
    )
}
export default BlogList