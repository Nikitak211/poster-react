import { useState, useEffect } from 'react'
import axios from 'axios';

import './PostedPost.css'

let posts = []
let filtered = []

const PostedPost = () => {

  const Post = () => filtered.slice(0, posts.length).map(data => {
    if (data !== undefined) {

      const calendar = { year: 'numeric', day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric' };
      const returnPostDate = (date) =>
        `${date.toLocaleDateString("en-US", calendar)}`;

      return (
        <article className="post" key={data._id}>
            <div className="post__meta">
              <div className="post__tag--container">
                <span className="post__tag">{data.title}</span>
              </div>
              <p className=" post__date">{returnPostDate(new Date(data.date))}</p>
            </div>
            <div className="post__author">
              <img className="post__author--avatar" width="55" src={data.avatar} alt={data.author}></img>
              <div>
                <p className="post__author--name">{data.author}</p>
              </div>
            </div>
            <div className="post__body">{data.content}</div>
        </article>
      )
    } else {
    }
  })
  posts.forEach(data => {
    if (data !== undefined) {
    } else {
    }
  })

  const RecivePost = async () => {
    const response = await axios.get('/api/auth/post')
    const Data = await response.data
    posts = Data
    posts.forEach(posters => {
      filtered.unshift(posters)
    })
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