import './profile.css'

const Profile = (props) => {
    return (
        <div className="profile-container">
            <img src={props.props.profile} className="profile-picture"></img>
            <h3 className="profile-name">{props.props.profileName}</h3>
        </div>
    );
}

export default Profile;