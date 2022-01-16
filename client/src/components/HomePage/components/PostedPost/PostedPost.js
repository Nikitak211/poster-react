import { useEffect, useState } from 'react'
import axios from 'axios';
import * as timeago from 'timeago.js'

import CommentInput from './components/CommentInput/CommentInput'
import CommentedComments from './components/CommentedComments/CommentedComments'
import './PostedPost.css'

const PostedPost = (rootPosts) => {

  let posts = rootPosts.posts
  const [success, setSuccess] = useState()
  const [comment, setComment] = useState([])
  const [status, setStatus] = useState('offline')
  const [clicked, setClicked] = useState(false)

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

  const click = () => {
    if (clicked) {
      setClicked(false)
    } else {
      setClicked(true)
    }
  }
  
  const ShowComments = () => {
    if(rootComments.length == 0) {
      return (
        <div className="show-comments-container">
        </div>
      )
    } else {
    if(clicked) {
      return (
        <div className="post__comments-container">
           {rootComments.map(rootComments => (
            <CommentedComments key={rootComments._id} rootComments={rootComments} />
          ))}
          <button onClick={click} className='show-comments'>-</button>
        </div>
      )
    } else {
      
        return (
          <div className="show-comments-container">
             <small className='show-comments-count'>{rootComments.length + 'Comments'}</small>
            <button onClick={click} className='show-comments'>+</button>
          </div>
        )
      }
    }
  }

  const deletePosts = async () => {
    await axios.post('/api/auth/deletePost', { post_id: posts._id })
      .then(response => response.data)
      .then(data => {
        if (data.success) {
          window.location.reload()
        }
        if (data.error) {
          return null
        }
      })
  }

  const returnPostDate = (date) => {
    return timeago.format(new Date(date));
  }
  
  useEffect(() => {
    if (rootPosts.posts.status) {
      setStatus('post-online')
    } else {
      setStatus('post-offline')
    }

    axios.post('/api/auth/comments', { post_id: posts._id })
      .then(response => response.data.comment)
      .then(data => {
        if (data !== undefined) {
          setComment(data)
        }
      })
  }, [success])

  return (
    <article className="post" key={posts._id}>
      <div className="post-content">
        <div className="post__meta">
          <div className="post__author">
            <img className="post__author--avatar" width="55" src={posts.avatar} alt={posts.author}></img>
            <div className={status}></div>
            <div>
              <p className="post__author--name">{posts.author}</p>
              <p className=" post__date">{returnPostDate(new Date(posts.date))}</p>
            </div>

          </div>
          
        </div>
        <textarea className="post__body" value={posts.content} disabled></textarea>
        <div className="inline-inputs">
        <CommentInput avatar={rootPosts.avatar} setSuccess={setSuccess} pending={posts._id} />
          <p onClick={deletePosts} className="post__delete"></p>
        </div>
        
        <div >
          <ShowComments/>
        </div>

      </div>
    </article>
  )
}

export default PostedPost;