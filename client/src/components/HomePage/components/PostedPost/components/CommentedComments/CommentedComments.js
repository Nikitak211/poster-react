import { useEffect, useState, useCallback } from 'react'
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
                getLikes()
                if (data.error) {
                    alert(data.message)
                }
            })
    }

    const getLikes = useCallback(async () => {
        await axios.get(`/api/auth/likeComments/${rootComment._id}`)
            .then(response => response.data)
            .then(data => {
                let ammountOfLikes = data.like.length
                if (ammountOfLikes !== undefined) {
                    setLikes(ammountOfLikes)
                } else {
                    setLikes(0)
                }
            })
    }, [rootComment])

    const disLike = async () => {
        await axios.post('/api/auth/dislikeComments', { comment_id: rootComment._id })
            .then(response => response.data)
            .then(data => {
                getDisLike()
                if (data.error) {
                    alert(data.message)
                }
            })
    }

    const getDisLike = useCallback(async () => {
        await axios.get(`/api/auth/dislikeComments/${rootComment._id}`)
            .then(response => response.data)
            .then(data => {
                let ammountOfDisLikes = data.dislike.length
                if (ammountOfDisLikes !== undefined) {
                    setDisLikes(ammountOfDisLikes)
                } else {
                    setDisLikes(0)
                }

            })

    }, [rootComment])

    const checkStatus = useCallback(async () => {
        if (rootComment.status) {
            setStatus('comments online')
        } else {
            setStatus('comments offline')
        }
        getLikes()
        getDisLike()
    }, [getLikes, getDisLike, rootComment]);

    useEffect(() => {
        checkStatus()
    }, [])
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