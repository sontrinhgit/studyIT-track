import { createContext, useReducer, useState } from 'react'
import { postReducer } from '../reducers/postReducer'

import axios from 'axios'
import { apiUrl } from './constant'

export const PostContext = createContext()

const PostContextProvider = ({ children }) => {
	// State
	const [postState, dispatch] = useReducer(postReducer, {
		post: null,
		posts: [],
		postsLoading: true
	})

	const [showAddPostModal, setShowAddPostModal] = useState(false)
	const [showUpdatePostModal, setShowUpdatePostModal] = useState(false)
	const [showToast, setShowToast] = useState({
		show: false,
		message: '',
		type: null
	})

	// Get all posts
	const getPosts = async () => {
		try {
			const response = await axios.get(`${apiUrl}/posts`)
			if (response.data.success) {
				dispatch({ type: 'POST_LOADED_SUCCESS', payload: response.data.posts })
			}
		} catch (error) {
			dispatch({ type: 'POST_LOADED_FAILED' })
		}
	}

	// Add post
	const addPost = async newPost => {
		try {
			const response = await axios.post(`${apiUrl}/posts`, newPost)
			if (response.data.success) {
				dispatch({ type: 'ADD_POST', payload: response.data.newPost })
				return response.data
			}
		} catch (error) {
			console.log(error)
		}
	}

    //Delete post
    const deletePost = async postId => {
        try {
            const response = await axios.delete(`${apiUrl}/posts/${postId}`)
            if(response.data.success)
            dispatch({
                type: 'DELETE_POST',
                payload: postId
            })
        } catch (error) {
            console.log(error)
        }
    }

    //Find post clicked user is updated post
    const findPost = postId => {
        const post = postState.posts.find(post => post._id === postId)
		dispatch({
			type: 'FIND_POST',
			payload: post
		})
    }


    //update Post
    const updatePost = async updatePost => {
        try {
            const response = await axios.put(`${apiUrl}/posts/${updatePost._id}`, updatePost)
            if(response.data.success) {
                dispatch({
                    type: 'UPDATE_POST',
                    payload: updatePost
                })
                return response.data
            }
        } catch (error) {
            console.log(error)
        }
    }

	// Post context data
	const postContextData = {
		postState,
		getPosts,
		showAddPostModal,
		setShowAddPostModal,
		showUpdatePostModal,
		setShowUpdatePostModal,
		addPost,
		showToast,
		setShowToast,
        deletePost,
        updatePost,
		findPost
	
	}

	return (
		<PostContext.Provider value={postContextData}>
			{children}
		</PostContext.Provider>
	)
}

export default PostContextProvider