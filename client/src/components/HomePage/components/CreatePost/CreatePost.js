import { useForm } from 'react-hook-form';
import axios from 'axios';

import './CreatePost.css'

const CreatePost = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    async function sendPost(tag, content) {
        const response = await axios.post('/api/auth/post', {
            title: tag,
            content: content
        })
        const Data = await response.data

        if (Data.success) {
            window.location.reload()

        }
    };

    return (
        <form className="create_post_arcticle" action="" onSubmit={handleSubmit((data) => {
            sendPost(data.tag, data.content)
        })}>
            <div className="container">
                    <div className="formFillArea">
                    <button className="btn_post">post</button>
                    <input type="text" className="post__tag"
                        {...register("tag", {
                            required: "tag is required",
                        }
                        )} ></input>
                    <textarea placeholder="write your post here..." className="post__body"
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