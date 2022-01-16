import * as React from 'react';
import {useEffect} from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';

import './CommentInput.css'

const CommentInput = (props) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm();

    const createPost = async (comment) => {
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
                if(data.success){
                    props.setSuccess(data.success)
                }
                if (data.error) return
            })
            .catch(err => {
            })
    }
    
    useEffect(() => {

    },[createPost,handleSubmit])

    return (
        <form
            onSubmit={handleSubmit((data) => {
                createPost(data.comment)
            })}>
            <div className="comment-container">
            <img src={props.avatar} className="profile-picture-comments"></img>
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