import { useEffect } from 'react'

import './CommentedComments.css'

const CommentedComments = (props) => {
    console.log(props)
    if(props.success){
        window.location.reload();
    }
    const CommentsPosted = () => props.data.comments.slice(0, props.data.comments.length).map(data => {
        if (data !== undefined) {
            const calendar = { year: 'numeric', day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric' };
            const returnPostDate = (date) =>
                `${date.toLocaleDateString("en-US", calendar)}`;

            return (
                <div key={data._id} className="commented-containers">
                    
                    <ul className="commented-ul">
                        <img width="10%" height="10%" src={data.avatar}></img>
                        <li className="commented-li">👍</li><small>{'15 : Liked the post'}</small>
                        <li className="commented-li">👎</li><small>{'10 : Disliked the post'}</small>
                    </ul>
                    <textarea className="commented-text" defaultValue={data.content} ></textarea>
                    <small>{returnPostDate(new Date(data.date))}</small>
                    
                </div>
            )
        } else {
            return null
        }
    })
    useEffect(() => {
        
    },[])
    if (props === undefined) {
        return (
            <div>

            </div>
        )
    } else {
        return (
            <div className="comment-main">
            <CommentsPosted />
            </div>
        );
    }

}

export default CommentedComments;