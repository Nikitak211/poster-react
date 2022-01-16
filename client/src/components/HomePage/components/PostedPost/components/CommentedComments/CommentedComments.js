import { useEffect, useState } from 'react'
import axios from 'axios';

import './CommentedComments.css'

const CommentedComments = ({ rootComments }) => {
    const [status, setStatus] = useState('offline')
    const [likes, setLikes] = useState()
    const [dislikes, setDisLikes] = useState()

    const calendar = { year: 'numeric', day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric' };
    const returnPostDate = (date) =>
        `${date.toLocaleDateString("en-US", calendar)}`;


    const Like = async () => {
        await axios.post('/api/auth/likeComments', { comment_id: rootComments._id })
            .then(response => response.data)
            .then(data => {
                if (data.message === "liked comment") {
                    getLikes()
                }
                if (data.message === "removed like"){
                    getLikes()
                }
                if (data.error) {
                    alert(data.message)
                }
            })
    }
    const getLikes = async() => {
        await axios.get(`/api/auth/likeComments/${rootComments._id}`)
            .then(response => response.data)
            .then(data => {
                let ammountOfLikes = data.like.length
                if(ammountOfLikes == undefined){
                    setLikes(0)
                } else {
                    setLikes(ammountOfLikes)
                }
                
            })
    }


    const disLike = async () => {
        await axios.post('/api/auth/dislikeComments', { comment_id: rootComments._id })
            .then(response => response.data)
            .then(data => {
                if (data.message === "disliked comment") {
                    getDisLike()
                }
                if (data.message === "removed dislike"){
                    getDisLike()
                }
                if (data.error) {
                    alert(data.message)
                }
            })
    }
    const getDisLike = async() => {
        await axios.get(`/api/auth/dislikeComments/${rootComments._id}`)
            .then(response => response.data)
            .then(data => {
                let ammountOfDisLikes = data.dislike.length
                if(ammountOfDisLikes == undefined) {
                    setDisLikes(0)
                } else {
                    setDisLikes(ammountOfDisLikes)
                }
                
            })
    }

    useEffect(() => {
        getLikes()
        getDisLike()
        if (rootComments.status) {
            setStatus('comments-online')
        } else {
            setStatus('comments-offline')
        }
    }, [Like,getLikes,disLike,getDisLike])
    return (
        <div key={rootComments._id} className="commented-containers">
            <ul className="commented-ul">
                <img className="img-comment" width="10%" height="10%" src={rootComments.avatar}></img>
                <div className={status}></div>
                <li onClick={Like} className="commented-li">👍</li><small className="comments-likes">{likes}: Liked the post</small>
                <li onClick={disLike} className="commented-li">👎</li><small className="comments-dislikes">{dislikes}: Disliked the post</small>
            </ul>
            <textarea className="commented-text" defaultValue={rootComments.content} ></textarea>
            <small>{returnPostDate(new Date(rootComments.date))}</small>
        </div>
    )
}

export default CommentedComments;