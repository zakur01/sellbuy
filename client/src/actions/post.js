import axios from "axios";
import { setAlert } from "./alert";


//все посты 
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/post')
        dispatch({
            type: "GET_POSTS",
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: "POST_ERROR",
            payload: { msg: "ошибка" },
        })
    }
} 

//добавить пост
export const addPost = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post('/api/post', formData, config);
        dispatch ({
            type: "ADD_POST",
            payload: res.data
        })

        dispatch(setAlert("Объявление создано", "success"))
    } catch (err) {
        dispatch({
        type: "POST_ERROR",
        payload: { msg: err.response.statusText, status: err.response.status }
    })
    }
}

//удалить объявление
export const deletePost = id => async dispatch => {
    try {
        await axios.delete(`/api/post/${id}`);

        dispatch ({
            type: "DELETE_POST",
            payload: id 
        })
        
        dispatch(setAlert("Объявление удалено", "success"))
    } catch (err) {
        dispatch({
            type: "POST_ERROR",
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
} 

//отдельное объявление
export const getPost = id => async dispatch => {
    try {
        const res = await axios.get(`/api/post/${id}`)

        dispatch ({
            type: "GET_POST",
            payload: res.data
        })
        
    } catch (err) {
        dispatch({
            type: "POST_ERROR",
            payload: { msg: err.response.statusText, status: 
            err.response.status }
        })
    }
}

//добавление комментария
export const addComment = (postId, formData ) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post(`/api/post/comments/${postId}`, formData, config);
        dispatch ({
            type: "ADD_COMMENT",
            payload: res.data
        })

        dispatch(setAlert("Комментарий добавлен", "success"))
    } catch (err) {
        dispatch({
        type: "POST_ERROR",
        payload: { msg: err.response.statusText, status: err.response.status }
    })
    }
}
    


//удаление комментария
export const deleteComment = (postId, commentId) => async dispatch => {
  
    try {
        await axios.delete(`/api/post/comments/${postId}/${commentId}`);
        dispatch ({
            type: "REMOVE_COMMENT",
            payload: commentId
        })

        dispatch(setAlert("Комментарий удалён", "success"))
    } catch (err) {
        dispatch({
        type: "POST_ERROR",
        payload: { msg: err.response.statusText, status: err.response.status }
    })
    }
}

