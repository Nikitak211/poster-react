import { useForm } from 'react-hook-form';
import { useEffect } from 'react'
import axios from 'axios';

import './CreatePost.css'

const CreatePost = (props) => {
    const {
        register,
        handleSubmit
    } = useForm();

    async function sendPost(body) {
        await axios.post('/api/auth/post', {
            content: body
        }).then(response => response.data)
            .then(data => {
                if (data.success) {
                    props.setCreatePost(true)
                }
            })
    };
    useEffect(() => {
    }, [])

    return (
        <form className="create_post_arcticle" action="" onSubmit={handleSubmit((data) => {
            sendPost(data.content)
        })}>
            <div className="container-1">
                <div className="formFillArea">
                    <div className="textare-inline-2c">
                        <img alt="" width="40" src={props.avatar} className="profile-picture-post"></img>
                        <textarea placeholder="write your post here..." className="post___body-text"
                            {...register("content", {
                                required: "content is required",
                            }
                            )}></textarea>
                    </div>
                    <div className="btn-c-post-container">
                        <button className="btn_post-c">post</button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default CreatePost;