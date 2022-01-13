import { useForm } from 'react-hook-form';
import { useEffect } from 'react'
import axios from 'axios';

import './CreatePost.css'

const CreatePost = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    async function sendPost(title, body) {

        await axios.post('/api/auth/post', {
            title: title,
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
            sendPost(data.tag, data.content)
        })}>
            <div className="container">
                <div className="formFillArea">
                    <button className="btn_post">post</button>
                    <input type="text" placeholder="Title" className="post__tag"
                        {...register("tag", {
                            required: "tag is required",
                        }
                        )} ></input>
                    <textarea placeholder="write your post here..." className="post___body"
                        {...register("content", {
                            required: "content is required",
                        }
                        )}></textarea>
                </div>
            </div>
        </form>
    );
}

export default CreatePost;