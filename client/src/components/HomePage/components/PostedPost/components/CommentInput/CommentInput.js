import * as React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import './CommentInput.css'

const CommentInput = ({pending,setSuccess}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm();
    const createPost = async (comment) => {
        const newComment = {
            content: comment,
            _id: pending
        }
        const api = axios.create({
            baseUrl: 'http://localhost:7000'
        })
        await api.post('/api/auth/postcomment', newComment)
            .then(response => {
                let data = response.data
                if (data.success) {
                    console.log(data.success)
                    setSuccess(data.success)
                }
                if (data.error) return
            })
            .catch(err => {

            })
    }

    return (
        <form
            onSubmit={handleSubmit((data) => {
                createPost(data.comment)
            })}>
            <div className="comment-container">
                <textarea className="comment-area"
                    {...register("comment", {
                        required: "cannot be empty"
                    }
                    )}></textarea>
                <button className="comment-button">Comment</button>
            </div>
        </form>
    );
}

export default CommentInput;