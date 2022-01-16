import { useEffect, useState } from 'react'
import axios from 'axios';

import CommentInput from './components/CommentInput/CommentInput'
import CommentedComments from './components/CommentedComments/CommentedComments'
import './PostedPost.css'

const PostedPost = (rootPosts) => {
  rootPosts = rootPosts.posts
  const [success, setSuccess] = useState()
  const [comment, setComment] = useState([])
  const [status, setStatus] = useState('offline')

  const rootComments = comment.filter(
    (comments) => {
      if (comments.length !== 0) {
        let t1 = new Date()
        let ct = comments.date
        return new Date(ct) < t1
      }
    }
  )

  if (success) {
    window.location.reload()
  } else {

  }

  const deletePosts = async () => {
    await axios.post('/api/auth/deletePost', { post_id: rootPosts._id })
      .then(response => response.data)
      .then(data => {
        if (data.success) {
          window.location.reload()
        }
        if (data.error) {
          alert(data.message)
        }
      })
  }

  const calendar = { year: 'numeric', day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric' };
  const returnPostDate = (date) =>
    `${date.toLocaleDateString("en-US", calendar)}`;

  useEffect(() => {
    if (rootPosts.status) {
      setStatus('post-online')
    } else {
      setStatus('post-offline')
    }

    axios.post('/api/auth/comments', { post_id: rootPosts._id })
      .then(response => response.data.comment)
      .then(data => {
        if (data !== undefined) {
          setComment(data)
        }
      })
  }, [])

  return (
    <article className="post" key={rootPosts._id}>
      <div className="post-content">
        <div className="post__meta">
          <div className="post__author">
            <img className="post__author--avatar" width="55" src={rootPosts.avatar} alt={rootPosts.author}></img>
            <div className={status}></div>
            <div>
              <p className="post__author--name">{rootPosts.author}</p>
            </div>
          </div>
          <div className="post__tag--container">
            <span className="post__tag">{rootPosts.title}</span>
          </div>
          <div className="post__date-delete" ><p className=" post__date">{returnPostDate(new Date(rootPosts.date))}</p><p onClick={deletePosts} className="post__delete"></p></div>
        </div>
        <textarea className="post__body" value={rootPosts.content} disabled></textarea>
        <CommentInput setSuccess={setSuccess} pending={rootPosts._id} />
        <div className="post__comments-container">
          {rootComments.map(rootComments => (
            <CommentedComments key={rootComments._id} rootComments={rootComments} />
          ))}
        </div>

      </div>
    </article>
  )
}

export default PostedPost;