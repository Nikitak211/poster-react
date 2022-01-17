import { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import * as timeago from 'timeago.js'

import CommentInput from './components/CommentInput/CommentInput'
import CommentedComments from './components/CommentedComments/CommentedComments'
import './PostedPost.css'

let row;

const PostedPost = (rootPosts) => {

  let posts = rootPosts.posts

  const [success, setSuccess] = useState()
  const [comment, setComment] = useState([])
  const [status, setStatus] = useState('post__author--avatar')
  const [clicked, setClicked] = useState(false)
  const [showRows, setshowRows] = useState(false)
  const [likes, setLikes] = useState()
  const [dislikes, setDisLikes] = useState()

  const ref = useRef()

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



  const Grow = () => {
    return (
      <div className="post-like-container">
        <a className="post__body a" onClick={Show} >continue reading...</a>
        <ul className="posted-ul">
          <li onClick={Like} className="posted-li">👍 {0 | likes}</li>
          <li onClick={disLike} className="posted-li">👎 {0 | dislikes}</li>
        </ul>
      </div>

    )
  }
  const Minimize = () => {
    return (
      <div className="post-like-container" >
        <a className="post__body a" onClick={Show} >minimize...</a>
        <ul className="posted-ul">
          <li onClick={Like} className="posted-li">👍 {0 | likes}</li>
          <li onClick={disLike} className="posted-li">👎 {0 | dislikes}</li>
        </ul>
      </div>

    )
  }

  const Show = () => {
    if (showRows) {
      setshowRows(false)
    } else {
      setshowRows(true)
    }
  }

  const returnPostDate = (date) => {
    return timeago.format(new Date(date));
  }

  const checkStatus = () => {
    if (rootPosts.posts.status) {
      setStatus('post__author--avatar online')
    } else {
      setStatus('post__author--avatar offline')
    }
  }

  const ShowComments = () => {
    if (rootComments.length !== 0) {
      if (clicked) {
        return (
          <div className="post__comments-container">
            {rootComments.map(rootComment => (
              <CommentedComments key={rootComment._id} rootComments={rootComment} />
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
    } else {
      return (
        <div className="show-comments-container">
        </div>
      )
    }
  }

  const RowsToShow = () => {
    if (showRows) {

      if (posts.content.length > 331) {
        return (
          <div className="post__body-container">
            <textarea style={{ height: Math.round(ref.current.scrollHeight) + "px" }} ref={ref} className="post__body" disabled value={posts.content}></textarea>
            <Minimize />
          </div>
        )
      } else {
        return (
          <div className="post__body-container">
            <textarea style={{ height: Math.round(ref.current.scrollHeight) + "px" }} ref={ref} className="post__body" disabled value={posts.content}></textarea>
            <Minimize />
          </div>
        )
      }

    } else {
      if (posts.content.length > 331) {
        row = posts.content.length / 200
        return (
          <div className="post__body-container">
            <textarea rows={row} ref={ref} className="post__body" disabled value={posts.content}></textarea><Grow />
          </div>
        )
      } else {
        row = posts.content.length / 50
        return (
          <div className="post__body-container">
            <textarea rows={row} ref={ref} className="post__body" disabled value={posts.content}></textarea>
            <div className="post-like-container">
              <li onClick={Like} className="posted-li">👍 {0 | likes}</li>
              <li onClick={disLike} className="posted-li">👎 {0 | dislikes}</li>
            </div>
          </div>
        )
      }


    }
  }

  const Like = async () => {
    await axios.post('/api/auth/likeComments', { comment_id: rootComments._id })
      .then(response => response.data)
      .then(data => {
        if (data.message === "liked comment") {
          getLikes()
        }
        if (data.message === "removed like") {
          getLikes()
        }
        if (data.error) {
          alert(data.message)
        }
      })
  }
  const getLikes = async () => {
    await axios.get(`/api/auth/likeComments/${rootComments._id}`)
      .then(response => response.data)
      .then(data => {
        let ammountOfLikes = data.like.length
        if (ammountOfLikes == undefined) {
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
        if (data.message === "removed dislike") {
          getDisLike()
        }
        if (data.error) {
          alert(data.message)
        }
      })
  }

  const getDisLike = async () => {
    await axios.get(`/api/auth/dislikeComments/${rootComments._id}`)
      .then(response => response.data)
      .then(data => {
        let ammountOfDisLikes = data.dislike.length
        if (ammountOfDisLikes == undefined) {
          setDisLikes(0)
        } else {
          setDisLikes(ammountOfDisLikes)
        }
      })
  }

  useEffect(() => {
    checkStatus()
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
        <div className="post__meta-container">
          <div className="post__meta">
            <div className="post__author">
              <div className={status}>
                <img width={55} src={posts.avatar} alt={posts.author}></img>
              </div>

              <div>
                <p className="post__author--name">{posts.author}</p>
                <p className=" post__date">{returnPostDate(new Date(posts.date))}</p>
              </div>

            </div>
          </div>
        </div>
        <RowsToShow />
        <div className="inline-inputs">
          <CommentInput avatar={rootPosts.avatar} setSuccess={setSuccess} pending={posts._id} />
          <p onClick={deletePosts} className="post__delete"></p>
        </div>
        <div >
          <ShowComments />
        </div>
      </div>
    </article>
  )
}

export default PostedPost;