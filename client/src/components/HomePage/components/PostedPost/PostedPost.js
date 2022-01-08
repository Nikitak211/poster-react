import './PostedPost.css'

const PostedPost = (props) => {

  return (
    <article>
      <div className="post__meta">
        <div className="post__tag--container">
          <span className="post__tag"></span>
        </div>
        <p className=" post__date"></p>
      </div>
      <div className="profile-container">
        <img className="profile-picture" width="55" src={props.profile} alt={props.author}></img>
          <div>
            <p className="profile-name">{props.profileName}</p>
          </div>
      </div>
      <div className="post__body"> 
      </div>
    </article>
  );
}

export default PostedPost;