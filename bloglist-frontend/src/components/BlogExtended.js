import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, addComment, initialState } from '../reducers/blogReducer'
import { Divider, Spin, Form, Button, Input  } from 'antd' 
import '../App.css'

const BlogExtended = () => {
    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const id = useParams().id
    const blogs = useSelector(state => state.blogs)
    const blogToDisplay = blogs.find(b => b.id === id)

    useEffect(() => {
        dispatch(initialState())
    }, [])



    const handleLike = async () => {
        const likedBlog = {
            ...blogToDisplay,
            likes: blogToDisplay.likes + 1
        }
        dispatch(likeBlog(likedBlog))
    }

    const postComment = (values) => {
        const c = {
            comment: values.comment
        }
        dispatch(addComment(id, c))
        form.resetFields()
    }
    
    if(!blogToDisplay){
        return <Spin/>
    }

    return (
        <div>
            <h1 className='heading'>{blogToDisplay.title}</h1>
            <Divider/>
            <p>{blogToDisplay.url}</p>
            <p>Likes: {blogToDisplay.likes}</p><button onClick={handleLike}>Like Post</button>
            <p>Created by {blogToDisplay.author}</p>
            <h2 className='heading'>Comments</h2>
            <Divider/>
            <Form onFinish={postComment} form={form}>
                <Form.Item
                    name='comment'
                >
                    <Input placeholder='Enter your comment'/>
                </Form.Item>
                <Form.Item>
                    <Button htmlType='submit' type='primary'>Add Comment</Button>
                </Form.Item>
                
            </Form>
            <ul>
                {blogToDisplay.comments.map((c, i) => <li key={i}>{c}</li>)}
            </ul>

        </div>
    )

}

export default BlogExtended