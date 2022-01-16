import { useForm } from 'react-hook-form';
import { useEffect } from 'react'
import axios from 'axios';

import './CreatePost.css'

const CreatePost = (props) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    async function sendPost(body) {

        await axios.post('/api/auth/post', {
            content: body
        }).then(response => response.data)
            .then(data => {
                if (data.success) {
                    window.location.reload()
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
                    <img src={props.avatar} className="profile-picture-comments"></img>
                    <textarea placeholder="write your post here..." className="post___body-text"
                        {...register("content", {
                            required: "content is required",
                        }
                        )}></textarea>
                    </div>
                    <button className="btn_post-c">post</button>
                </div>
            </div>
        </form>
    );
}

export default CreatePost;