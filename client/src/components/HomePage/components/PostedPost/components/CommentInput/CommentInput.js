import * as React from 'react';
import { useEffect ,useCallback} from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';

import './CommentInput.css'

const CommentInput = (props) => {

    const {
        register,
        handleSubmit
    } = useForm();

    const createPost = useCallback( async (comment) => {
        const newComment = {
            content: comment,
            _id: props.pending
        }
        const api = axios.create({
            baseUrl: 'http://localhost:7000'
        })
        await api.post('/api/auth/postcomment', newComment)
            .then(response => {
                let data = response.data
                if (data.success) {
                    props.setSuccess(data.success)
                }
                if (data.error) return
            })
            .catch(err => {
            })
    },[props])

    useEffect(() => {
        let s = true;
        if (s) {
        props.setSuccess(false)
        }
        return () => {s = false}
    }, [createPost, handleSubmit,props])
    
    return (
        <form
            onSubmit={handleSubmit((data) => {
                createPost(data.comment)
            })}>
            <div className="comment-container">
                <img alt={props.pending} className="profile-picture-comments" width="40" src={props.avatar} ></img>
                <div className="input-area">
                    <textarea className="comment-area"
                        {...register("comment", {
                            required: "cannot be empty"
                        }
                        )}></textarea>
                </div>
                <button className="comment-button">Comment</button>
            </div>
        </form>
    );
}

export default CommentInput;