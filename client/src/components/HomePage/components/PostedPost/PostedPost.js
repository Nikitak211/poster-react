import { useEffect, useState, useRef,useCallback } from 'react'
import axios from 'axios';
import * as timeago from 'timeago.js'

import CommentInput from './components/CommentInput/CommentInput'
import CommentedComments from './components/CommentedComments/CommentedComments'
import './PostedPost.css'

let row;

const PostedPost = (rootPosts) => {
  let posts = rootPosts.posts
  let uid = rootPosts.user_id
  let puid = rootPosts.posts.user_id

  const [success, setSuccess] = useState()
  const [comment, setComment] = useState([])
  const [status, setStatus] = useState('post__author--avatar')
  const [clicked, setClicked] = useState(false)
  const [showRows, setshowRows] = useState(false)
  const [likes, setLikes] = useState()
  const [dislikes, setDisLikes] = useState()
  const [friends, setFriends] = useState(false)
  const [owner, setOwner] = useState(false)

  const ref = useRef()

  const rootComments = comment.filter(
    (comments) => {
      if (comments.length !== 0) {
        let t1 = new Date()
        let ct = comments.date
        return new Date(ct) < t1
      } else { return null }
    }
  )

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
          rootPosts.setDeletePosts(true)
        }
        if (data.error) {
          return null
        }
      })
  }

  const Grow = () => {
    return (
      <div className="post-like-container">
        <button className="post__body a" onClick={Show} >continue reading...</button>
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
        <button className="post__body a" onClick={Show} >minimize...</button>
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

  const checkStatus = useCallback(() => {
    if (rootPosts.posts.status) {
      setStatus('post__author--avatar online')
    } else {
      setStatus('post__author--avatar offline')
    }
  },[rootPosts])

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
    await axios.post('/api/auth/likePost', { post_id: posts._id })
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
  
  const getLikes = useCallback(async () => {
    
    let isSubscribed = true;
    await axios.get(`/api/auth/likePost/${posts._id}`)
      .then(response => response.data)
      .then(data => {
        if (isSubscribed) {
          let ammountOfLikes = data.like.length
          if (ammountOfLikes === undefined) {
            setLikes(0)
          } else {
            setLikes(ammountOfLikes)
          }
        }
      })
    return () => {
      isSubscribed = false
    }
  },[posts._id])

  const disLike = async () => {
    await axios.post('/api/auth/dislikePost', { post_id: posts._id })
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

  const getDisLike =  useCallback(async () => {
    let isSubscribed = true;
    await axios.get(`/api/auth/dislikePost/${posts._id}`)
      .then(response => response.data)
      .then(data => {
        if (isSubscribed) {
          let ammountOfDisLikes = data.dislike.length
          if (ammountOfDisLikes === undefined) {
            setDisLikes(0)
          } else {
            setDisLikes(ammountOfDisLikes)
          }
        }
      })
    return () => {
      isSubscribed = false
    }
  },[posts._id])

  const addFriend = useCallback(async () => {
    await axios.post('/api/auth/friendreq', { uid, puid })
  },[uid, puid])

  const userCheck = useCallback(async () => {
    await axios.get(`api/auth/friendcheck/${uid}&${puid}`)
              .then(response =>{ 
                setOwner(response.data.owner)
                setFriends(response.data.friends)
              })
              .catch(error => {
                console.error('error fetching Data:' + error)
              })
              .finally(() => {
                checkStatus()
                getLikes()
                getDisLike()
              })
  },[uid, puid,checkStatus,getLikes,getDisLike])

  useEffect(() => {
    const post_id = posts._id
    axios.get(`/api/auth/comments/${post_id}`)
      .then(response => response.data.comment)
      .then(data => {
          if (data !== undefined) {
            setComment(data) 
          } else { return null }
      }).catch(error => {
        console.error('error fetching data: '+ error)
      })
      .finally(() => {
        userCheck()
      })
  },[success])

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
                {!friends & !owner ? (
                  <div className="friend-request">
                    <p style={{ cursor: 'pointer' }} onClick={addFriend}>+</p>
                  </div>

                ) : (<div></div>)}
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
          {owner ? (<p onClick={deletePosts} className="post__delete"></p>) : (<></>)}
        </div>
        {rootComments.length !== 0 ?
          <div >
            {clicked ?
              (
                <div className="post__comments-container">
                  {rootComments.map(rootComment => (
                    <CommentedComments key={rootComment._id} rootComment={rootComment} />
                  ))}
                  <div className="show-comments-container-align" >
                    <button onClick={click} className='show-comments'>-</button>
                  </div>
                </div>
              ) :
              (
                <div className="show-comments-container">
                  <small className='show-comments-count'>{rootComments.length + 'Comments'}</small>
                  <div className="show-comments-container-align" >
                    <button onClick={click} className='show-comments'>+</button>
                  </div>
                </div>
              )
            }
          </div>
          :
          <div className="show-comments-container"></div>
        }
      </div>
    </article>
  )
}

export default PostedPost;