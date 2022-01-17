import { useEffect, useState } from 'react'
import * as timeago from 'timeago.js'

import axios from 'axios';

import './CommentedComments.css'

const CommentedComments = ({ rootComment }) => {

    const [status, setStatus] = useState('comments')
    const [likes, setLikes] = useState()
    const [dislikes, setDisLikes] = useState()

    const returnPostDate = (date) => {
        return timeago.format(new Date(date));
    }

    const Like = async () => {
        await axios.post('/api/auth/likeComments', { comment_id: rootComment._id })
            .then(response => response.data)
            .then(data => {
                if (data.error) {
                    alert(data.message)
                }
            })
    }

    const getLikes = async () => {
        await axios.get(`/api/auth/likeComments/${rootComment._id}`)
            .then(response => response.data)
            .then(data => {
                let ammountOfLikes = data.like.length
                getLikes()
                if (ammountOfLikes !== undefined) {
                    setLikes(ammountOfLikes)
                } else {
                    setLikes(0)
                }
            })
    }

    const disLike = async () => {
        await axios.post('/api/auth/dislikeComments', { comment_id: rootComment._id })
            .then(response => response.data)
            .then(data => {
                if (data.error) {
                    alert(data.message)
                }
            })
    }

    const getDisLike = async () => {
        await axios.get(`/api/auth/dislikeComments/${rootComment._id}`)
            .then(response => response.data)
            .then(data => {
                let ammountOfDisLikes = data.dislike.length
                getDisLike()
                if (ammountOfDisLikes !== undefined) {
                    setDisLikes(ammountOfDisLikes)
                } else {
                    setDisLikes(0)
                }

            })

    }

    useEffect(() => {
        let isSubscribed = true;

        if (isSubscribed) {
            getLikes()
            getDisLike()
            if (rootComment.status) {
                setStatus('comments online')
            } else {
                setStatus('comments offline')
            }
        }
        return () => {
            isSubscribed = false
            }
    }, [rootComment, Like, disLike])
    return (
        <div key={rootComment._id} className="commented-containers">
            <ul className="commented-ul">
                <div className={status}>
                    <img width={32.5} alt={rootComment.author} src={rootComment.avatar}></img>
                </div>
                <li onClick={Like} className="commented-li">👍 {0 | likes}</li>
                <li onClick={disLike} className="commented-li">👎 {0 | dislikes}</li>
            </ul>
            <textarea className="commented-text" defaultValue={rootComment.content} disabled ></textarea>
            <small>{returnPostDate(new Date(rootComment.date))}</small>
        </div>
    )
}

export default CommentedComments;