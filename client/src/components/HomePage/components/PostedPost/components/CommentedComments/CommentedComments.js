import { useEffect } from 'react'

import './CommentedComments.css'

const CommentedComments = ({ rootComments, success }) => {
    if (success) {
        window.location.reload()
    }

    let data = []
    const calendar = { year: 'numeric', day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric' };
    const returnPostDate = (date) =>
        `${date.toLocaleDateString("en-US", calendar)}`;

    useEffect(() => {
    }, [])
    return (
        <div key={rootComments._id} className="commented-containers">
            <ul className="commented-ul">
                <img width="10%" height="10%" src={rootComments.avatar}></img>
                <li className="commented-li">👍</li><small>{'15 : Liked the post'}</small>
                <li className="commented-li">👎</li><small>{'10 : Disliked the post'}</small>
            </ul>
            <textarea className="commented-text" defaultValue={rootComments.content} ></textarea>
            <small>{returnPostDate(new Date(rootComments.date))}</small>
        </div>
    )
}

export default CommentedComments;