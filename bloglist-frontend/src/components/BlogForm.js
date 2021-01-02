import React, { useState } from 'react'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { Form, Button, Input } from 'antd'
import '../App.css'


const BlogFrom = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const [form] = Form.useForm()

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


    // Posting new blog
    const handlePosting = async (values) => {
        try {
            const newBlog = {
                title: values.title,
                author: values.author,
                url: values.url
            }
            const token = user.token
            const posted = await blogService.postBlog(newBlog, token)
            dispatch(setNotification('New blog was added', true, 1500))
            dispatch(addBlog(posted))
            form.resetFields()
        } catch (e) {
            console.log(e.message)
        }
    }


    return (
        <Form onFinish={handlePosting} className='form' form={form} {...layout}>
            <Form.Item 
                name='title'
                label='Title'
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name='author'
                label='Author'
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name='url'
                label='Url'
            >
                <Input/>
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button htmlType="submit" type='primary'>Create</Button>
            </Form.Item>
        
        </Form>
    )
}

export default BlogFrom