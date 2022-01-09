import {useState, useEffect } from 'react'
import axios from 'axios';

import './PostedPost.css'

let posts = []

const PostedPost = (props) => {

  
  const That = () => posts.slice(0, posts.length).map(data => {
    if (data !== undefined) {

    const calendar = { year: 'numeric',day: 'numeric', month: 'long',hour: 'numeric', minute: 'numeric' };
    const returnPostDate = (date) =>
    `${date.toLocaleDateString("en-US",calendar)}`;
    
      return (
        <div>
            <div className="post__meta">
              <div className="post__tag--container">
                <span className="post__tag">{data.title}</span>
              </div>
              <p className=" post__date">{returnPostDate(new Date(data.date))}</p>
            </div>
            <div className="profile-container">
              <img className="profile-picture" width="55" src={data.avatar} alt={data.author}></img>
              <div>
                <p className="profile-name">{data.author}</p>
              </div>
            </div>
            <div className="post__body">{data.content}</div>
          </div>
      )
    } else {
    }
  })
  posts.forEach(data => {
    console.log(data)
    if (data !== undefined) {
    } else {
    }
  })

  const RecivePost = async () => {
    const response = await axios.get('/api/auth/post')
    const Data = await response.data
    posts = Data
  };

  useEffect(() =>{
    RecivePost()
  },[])
    
    if(posts === undefined){
      // console.log('fucki')
      return (
        <div>

        </div>
      )
    } else {
      // console.log('hi')
      return (
        <article >
          <That />
        </article>
      )
    }
}

export default PostedPost;