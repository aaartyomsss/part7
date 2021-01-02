import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

const getAll = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

const getSingleBlog = async (id) => {
    const res = await axios.get(`${baseUrl}/${id}`)
    return res.data
}

const postBlog = async (newBlog, t) => {

    const token = `bearer ${t}`

    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
}

const putBlog = async updatedBlog => {
    const url = `${baseUrl}/${updatedBlog.id}`
    const response = await axios.put(url, updatedBlog)
    return response.data
}

const postComment = async (blogId, comment) => {
    const url = `${baseUrl}/${blogId}/comments`
    const res = await axios.patch(url, comment)
    return res.data
}

const deleteBlog = async (blogId, t) => {
    const url = `${baseUrl}/${blogId}`
    const token = `bearer ${t}`
    const config = {
        headers: { Authorization: token }
    }

    console.log(config)
    try {
        const response = await axios.delete(url, config)
        return response
    } catch (e) {
        return e
    }
}

export default { getAll, postBlog, putBlog, deleteBlog, postComment, getSingleBlog }