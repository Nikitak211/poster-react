import { useEffect, useState } from 'react'
import axios from 'axios';

import CommentInput from './components/CommentInput/CommentInput'
import CommentedComments from './components/CommentedComments/CommentedComments'
import './PostedPost.css'

let posts = []
let filtered = []

const PostedPost = () => {
  const [success, setSuccess] = useState()
  console.log(success)
  
  const Post = () => filtered.slice(0, posts.length).map(data => {
    if (data !== undefined) {
      const calendar = { year: 'numeric', day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric' };
      const returnPostDate = (date) =>
        `${date.toLocaleDateString("en-US", calendar)}`;

      return (
        <article className="post" key={data._id}>
          <div className="post__meta">
            <div className="post__author">
              <img className="post__author--avatar" width="55" src={data.avatar} alt={data.author}></img>
              <div>
                <p className="post__author--name">{data.author}</p>
              </div>
            </div>
            <div className="post__tag--container">
              <span className="post__tag">{data.title}</span>
            </div>
            <p className=" post__date">{returnPostDate(new Date(data.date))}</p>
          </div>
          <textarea className="post__body" value={data.content} disabled></textarea>
          <CommentInput pending={data._id} setSuccess={setSuccess}/>
          <CommentedComments success={success} data={data}/>
        </article>
      )
    } else {
      return null
    }
  })

  const RecivePost = async () => {
    const response = await axios.get('/api/auth/post')
    const Data = await response.data.post
    posts = Data

    for (let i = posts.length - 1; i >= 0; i--) {
      filtered.push(posts[i])
    }
  };

  useEffect(() => {
    RecivePost()
  }, [])

  if (posts === undefined) {
    return (
      <div>

      </div>
    )
  } else {
    return (
      <Post />
    )
  }
}

export default PostedPost;